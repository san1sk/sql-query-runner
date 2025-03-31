import styled from 'styled-components';

export const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export const HistoryHeader = styled.div`
  padding: 0 0 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  margin-bottom: 16px;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
  }
`;

export const HistoryList = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  
  /* Ensure scrolling works properly */
  max-height: calc(100vh - 150px);
  padding-right: 8px; /* Space for scrollbar */
`;

export const HistoryItem = styled.div`
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 8px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.elevation2};
    transform: translateY(-1px);
  }
  
  .query {
    font-family: monospace;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.primary};
  }
  
  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    color: ${({ theme }) => theme.secondary};

    .execution-count {
      padding: 2px 6px;
      background: ${({ theme }) => theme.primary}20;
      border-radius: 12px;
      color: ${({ theme }) => theme.primary};
      font-weight: 500;
    }
  }
`;
