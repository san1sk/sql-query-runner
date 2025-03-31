import styled from 'styled-components';
import { FaHistory, FaTrash, FaCode, FaStar, FaRegStar } from 'react-icons/fa';

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  
  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-weight: 600;
  }
`;

const HistoryList = styled.div`
  overflow-y: auto;
  flex-grow: 1;
`;

const HistorySection = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h4`
  margin: 0 0 12px 0;
  font-size: 12px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.secondary};
  font-weight: 600;
`;

const HistoryItem = styled.div`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid ${({ isFavorite, theme }) => isFavorite ? theme.primary : theme.border};
  margin-bottom: 10px;
  background-color: ${({ isFavorite, theme }) => isFavorite ? `${theme.primary}10` : theme.background};
  
  &:hover {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
  }
`;

const QueryText = styled.div`
  font-family: monospace;
  font-size: 13px;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 6px;
  background-color: ${({ theme }) => theme.tableHeader};
  border-radius: 3px;
`;

const HistoryMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: ${({ theme }) => theme.secondary};
`;

const HistoryActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  padding: 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const EmptyHistory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  text-align: center;
  color: ${({ theme }) => theme.secondary};
  
  svg {
    font-size: 24px;
    margin-bottom: 16px;
  }
`;

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const QueryHistory = ({ 
  history, 
  onSelectQuery, 
  onDeleteQuery, 
  favorites = [], 
  onToggleFavorite,
  isFavorite 
}) => {
  if (history.length === 0) {
    return (
      <HistoryContainer>
        <HistoryHeader>
          <h3><FaHistory /> Query History</h3>
        </HistoryHeader>
        <EmptyHistory>
          <FaHistory />
          <p>No queries executed yet.<br />Your history will appear here.</p>
        </EmptyHistory>
      </HistoryContainer>
    );
  }

  return (
    <HistoryContainer>
      <HistoryHeader>
        <h3><FaHistory /> Query History</h3>
      </HistoryHeader>
      <HistoryList>
        {/* Show favorites first */}
        {favorites.length > 0 && (
          <HistorySection>
            <SectionTitle>Favorites</SectionTitle>
            {favorites.map((item) => (
              <HistoryItem key={`fav-${item.timestamp}`} isFavorite>
                <QueryText>{item.query.substring(0, 120)}{item.query.length > 120 ? '...' : ''}</QueryText>
                <HistoryMeta>
                  <HistoryActions>
                    <ActionButton 
                      title="Remove from favorites"
                      onClick={() => onToggleFavorite(item.query)}
                    >
                      <FaStar />
                    </ActionButton>
                    <ActionButton 
                      title="Use this query" 
                      onClick={() => onSelectQuery(item.query)}
                    >
                      <FaCode /> Use
                    </ActionButton>
                  </HistoryActions>
                </HistoryMeta>
              </HistoryItem>
            ))}
          </HistorySection>
        )}

        <HistorySection>
          <SectionTitle>Recent</SectionTitle>
          {history.map((item) => (
            <HistoryItem key={item.timestamp} isFavorite={isFavorite(item.query)}>
              <QueryText>{item.query.substring(0, 120)}{item.query.length > 120 ? '...' : ''}</QueryText>
              <HistoryMeta>
                <span>{formatTimestamp(item.timestamp)}</span>
                <span className="execution-count">{item.executionCount}x</span>
                <HistoryActions>
                  <ActionButton 
                    title={isFavorite(item.query) ? "Remove from favorites" : "Add to favorites"}
                    onClick={() => onToggleFavorite(item.query)}
                  >
                    {isFavorite(item.query) ? <FaStar /> : <FaRegStar />}
                  </ActionButton>
                  <ActionButton 
                    title="Use this query" 
                    onClick={() => onSelectQuery(item.query)}
                  >
                    <FaCode /> Use
                  </ActionButton>
                  <ActionButton 
                    title="Remove from history"
                    onClick={() => onDeleteQuery(item.timestamp)}
                  >
                    <FaTrash />
                  </ActionButton>
                </HistoryActions>
              </HistoryMeta>
            </HistoryItem>
          ))}
        </HistorySection>
      </HistoryList>
    </HistoryContainer>
  );
};

export default QueryHistory;
