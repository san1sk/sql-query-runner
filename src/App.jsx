import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import QueryEditor from './components/QueryEditor';
import ResultsTable from './components/ResultsTable';
import QuerySelector from './components/QuerySelector';
import QueryHistory from './components/QueryHistory';
import { fetchQueryResults } from './services/queryService';
import { presetQueries } from './data/presetQueries';
import { lightTheme, darkTheme, GlobalStyles } from './themes';
import { MainContainer, EditorResultsContainer, SidePanel } from './styles/AppStyles';

function App() {
  const [theme, setTheme] = useState('dark');
  const [query, setQuery] = useState(presetQueries[0].query);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [queryHistory, setQueryHistory] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteQueries');
    return saved ? JSON.parse(saved) : [];
  });

  // Load saved theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handlePresetSelect = (index) => {
    setSelectedPreset(index);
    setQuery(presetQueries[index].query);
  };

  const executeQuery = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    
    try {
      const result = await fetchQueryResults(query);
      
      setResults(result.data);
      setExecutionTime(result.executionTime);
      setRowCount(result.rowCount);
      
      // Update history with duplicate handling
      setQueryHistory(prev => {
        const timestamp = new Date().toISOString();
        const existingQueryIndex = prev.findIndex(item => item.query === query);
        
        if (existingQueryIndex !== -1) {
          // Update existing query timestamp and move to top
          const updatedHistory = [...prev];
          updatedHistory.splice(existingQueryIndex, 1);
          return [
            {
              query,
              timestamp,
              resultCount: result.rowCount,
              executionCount: prev[existingQueryIndex].executionCount + 1
            },
            ...updatedHistory
          ];
        }
        
        // Add new query
        return [
          {
            query,
            timestamp,
            resultCount: result.rowCount,
            executionCount: 1
          },
          ...prev
        ];
      });
    } catch (error) {
      console.error('Error executing query:', error);
      setResults([{ error: "Error executing query: " + error.message }]);
    } finally {
      setLoading(false);
    }
  };

  const handleHistorySelect = (historicalQuery) => {
    setQuery(historicalQuery);
  };

  const deleteFromHistory = (timestamp) => {
    setQueryHistory(prev => prev.filter(item => item.timestamp !== timestamp));
  };

  const toggleFavorite = (query) => {
    setFavorites(prev => {
      const newFavorites = prev.some(fav => fav.query === query)
        ? prev.filter(fav => fav.query !== query)
        : [...prev, { query, timestamp: new Date().toISOString() }];
      
      localStorage.setItem('favoriteQueries', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (query) => {
    return favorites.some(fav => fav.query === query);
  };

  // Run the first query on initial load
  useEffect(() => {
    executeQuery();
  }, []);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <MainContainer>
        <Header 
          toggleTheme={toggleTheme} 
          isDarkMode={theme === 'dark'} 
        />
        
        <EditorResultsContainer>
          <div className="editor-section">
            <QuerySelector
              presetQueries={presetQueries}
              selectedPreset={selectedPreset}
              onSelect={handlePresetSelect}
            />
            <QueryEditor
              query={query}
              setQuery={setQuery}
              executeQuery={executeQuery}
              loading={loading}
            />
          </div>
          
          <div className="results-section">
            <ResultsTable
              results={results}
              loading={loading}
              executionTime={executionTime}
              rowCount={rowCount}
            />
          </div>
        </EditorResultsContainer>
        
        <SidePanel>
          <QueryHistory 
            history={queryHistory}
            onSelectQuery={handleHistorySelect}
            onDeleteQuery={deleteFromHistory}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        </SidePanel>
      </MainContainer>
    </ThemeProvider>
  );
}

export default App;
