import React, { useState, useEffect } from 'react';
import CSVDataDisplay from '../components/CSVDataDisplay';
import CSVDataFilter from '../components/CSVDataFilter';
import csvDataService from '../services/csvDataService';

const CSVExplorer = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const [availableFiles, setAvailableFiles] = useState([]);
  const [filters, setFilters] = useState({});
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCSVFiles = async () => {
      setLoading(true);
      try {
        const files = await csvDataService.getAvailableFiles();
        setAvailableFiles(files);
        
        // Auto-select the first file if available
        if (files.length > 0 && !selectedFile) {
          handleFileSelect(files[0]);
        }
      } catch (err) {
        console.error('Error fetching CSV files:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCSVFiles();
  }, []);

  const handleFileSelect = async (fileName) => {
    setSelectedFile(fileName);
    
    if (fileName) {
      try {
        // Get a sample of data to extract fields
        const data = await csvDataService.getCSVData(fileName);
        if (data.length > 0) {
          setFields(Object.keys(data[0]));
        }
        setFilters({});
      } catch (err) {
        console.error('Error loading file:', err);
      }
    }
  };

  const handleFileChange = (e) => {
    const fileName = e.target.value;
    handleFileSelect(fileName);
  };

  return (
    <div className="csv-explorer-container">
      <h2>CSV Data Explorer</h2>
      
      <div className="file-selector">
        <label htmlFor="csv-file-select">Select a CSV file:</label>
        <select 
          id="csv-file-select"
          value={selectedFile}
          onChange={handleFileChange}
          disabled={loading}
        >
          <option value="">-- Select a file --</option>
          {availableFiles.map(file => (
            <option key={file} value={file}>{file}</option>
          ))}
        </select>
        {loading && <span className="loading-indicator">Loading files...</span>}
        {!loading && availableFiles.length === 0 && 
          <div className="error-message">No CSV files found in the /csv directory.</div>
        }
      </div>
      
      {selectedFile && (
        <>
          <CSVDataFilter 
            fields={fields} 
            onFilterChange={newFilters => setFilters(newFilters)} 
          />
          
          <CSVDataDisplay 
            fileName={selectedFile}
            filters={filters}
          />
        </>
      )}
    </div>
  );
};

export default CSVExplorer;
