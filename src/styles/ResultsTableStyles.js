import styled from 'styled-components';

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
  height: 90%; /* Fill the parent container */

  .table-scroll-container {
    overflow: auto;
    height: calc(100% - 110px); /* Subtract header and pagination heights */
  }

  .loading-indicator,
  .empty-state,
  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 32px;
    text-align: center;
    color: ${({ theme }) => theme.secondary};

    svg {
      font-size: 32px;
      margin-bottom: 16px;
    }
    
    .error-message {
      color: ${({ theme }) => theme.error};
      font-weight: 500;
    }
  }
`;

export const Table = styled.table`
  /* Fixed width for the table */
  width: 100%;
  min-width: 1200px;
  border-collapse: collapse;
  font-size: 14px;
  table-layout: fixed;

  th, td {
    padding: 8px 16px;  // Reduced from 12px to 8px
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 150px;
  }

  thead {
    position: sticky;
    top: 0;
    z-index: 20;
    background-color: ${({ theme }) => theme.tableHeader};
    box-shadow: 0 1px 3px ${({ theme }) => theme.shadow};
  }

  th {
    background-color: ${({ theme }) => theme.tableHeader};
    font-weight: 600;
    user-select: none;
  }

  thead tr:first-child th {
    padding: 8px 16px;
    border-bottom: none; /* Remove border between header rows */
  }

  .filter-row th {
    padding: 8px 16px;
    font-weight: normal;
    border-top: none;
  }

  /* Remove any existing sticky positioning from individual rows */
  thead tr:first-child th,
  thead tr.filter-row th {
    position: static;
  }

  tr:nth-child(even) {
    background-color: ${({ theme }) => theme.tableRowAlt};
  }

  tr:hover {
    background-color: ${({ theme }) => theme.border}40;
  }

  .filter-row th,
  .filter-row {
    th {
      padding: 6px 16px;
      font-weight: normal;
      border-top: none;
    }
    .column-filter {
      input {
        width: 95%;
        padding: 6px 12px;
        font-size: 13px;
        border-radius: 4px;
        border: 1px solid ${({ theme }) => theme.border};
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.text};
        
        &:focus {
          outline: none;
          border-color: ${({ theme }) => theme.primary};
          box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}30;
        }

        &::placeholder {
          color: ${({ theme }) => theme.secondary}90;
        }
      }
    }
  }

  td {
    padding: 6px 16px;  // Reduced from 12px to 6px
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    white-space: pre-wrap; /* Changed from nowrap to pre-wrap */
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
    max-height: 80px;   // Reduced from 100px to 80px
    line-height: 1.2;   // Reduced from 1.4 to 1.2
    
    /* Add ellipsis for long content */
    span {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    /* Show full content on hover only when tooltips are enabled */
    &:hover span {
      white-space: ${({ tooltipsEnabled }) => tooltipsEnabled ? 'pre-wrap' : 'nowrap'};
      overflow: ${({ tooltipsEnabled }) => tooltipsEnabled ? 'visible' : 'hidden'};
      position: ${({ tooltipsEnabled }) => tooltipsEnabled ? 'relative' : 'static'};
      z-index: ${({ tooltipsEnabled }) => tooltipsEnabled ? '1' : 'auto'};
      background: ${({ tooltipsEnabled, theme }) => tooltipsEnabled ? theme.background : 'transparent'};
      box-shadow: ${({ tooltipsEnabled, theme }) => tooltipsEnabled ? `0 2px 8px ${theme.shadow}` : 'none'};
      padding: ${({ tooltipsEnabled }) => tooltipsEnabled ? '8px' : '0'};
      border-radius: ${({ tooltipsEnabled }) => tooltipsEnabled ? '4px' : '0'};
      border: ${({ tooltipsEnabled, theme }) => tooltipsEnabled ? `1px solid ${theme.border}` : 'none'};
    }

    /* Style for boolean Yes/No values */
    .boolean-yes {
      color: ${({ theme }) => theme.success};
      font-weight: 500;
    }
    
    .boolean-no {
      color: ${({ theme }) => theme.error};
    }
  }
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.tableHeader};

  > div {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

export const ResultsInfo = styled.div`
  h3 {
    margin: 0;
    font-weight: 600;
  }

  div {
    font-size: 12px;
    color: ${({ theme }) => theme.secondary};
    margin-top: 0px;
    display: flex;
    align-items: center;
    gap: 8px;

    span:nth-child(2) {
      color: ${({ theme }) => theme.border};
    }
  }
`;

export const PaginationControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.tableHeader};
  
  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  button {
    background-color: ${({ theme }) => theme.background};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
    color: ${({ theme }) => theme.text}; /* Ensure text color follows theme */
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.buttonText};
      border-color: ${({ theme }) => theme.primary};
    }
  }

  span {
    color: ${({ theme }) => theme.text}; /* Ensure pagination text follows theme */
  }

  select {
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.border};
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }
`;

export const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondary}dd;
  }
`;

export const StyledInput = styled.input`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 13px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  
  /* Ensure focus styling is distinct */
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}30;
    caret-color: ${({ theme }) => theme.primary}; /* Explicitly set cursor color */
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.secondary}90;
  }
`;

export const FilterContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .search-icon {
    position: absolute;
    left: 12px;
    color: ${({ theme }) => theme.secondary};
    font-size: 14px;
  }
  
  input {
    padding-left: 36px;
    width: 220px;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    
    &::placeholder {
      color: ${({ theme }) => theme.secondary}90;
    }
  }
`;

export const TooltipToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: auto;
  height: 36px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ active, theme }) => active ? theme.primary : theme.background};
  color: ${({ active, theme }) => active ? theme.buttonText : theme.text};
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0 12px;
  font-size: 13px;

  &:hover {
    background-color: ${({ active, theme }) => active ? theme.primaryHover : theme.border};
  }

  svg {
    font-size: 18px;
  }

  span {
    margin-left: 4px;
  }
`;
