import styled from 'styled-components';

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px; /* Fixed total container height */
  width: 100%;
  position: relative;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.background};
  flex-grow: 0;
`;

export const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 8px;
  background-color: ${({ theme }) => theme.tableHeader};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: relative; /* Change from sticky to relative */
  height: 50px; /* Fixed header height */
  flex-shrink: 0; /* Prevent header from shrinking */

  h3 {
    margin: 0;
    font-weight: 600;
  }
`;

export const EditorToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.tableHeader};
  /* Change from border-bottom to a subtle bottom shadow if needed */
  border-bottom: none;
  /* Optional: add a subtle shadow instead of border */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  
  h3 {
    margin: 0;
    font-weight: 600;
    font-size: 16px;
  }
`;

export const RunButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
  
  &[title] {
    cursor: pointer;
  }

  /* Custom tooltip styling with delay */
  &:hover::before {
    content: attr(title);
    position: absolute;
    bottom: -30px;
    right: 0;
    padding: 5px 10px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.elevation2};
    color: ${({ theme }) => theme.text};
    font-size: 12px;
    white-space: nowrap;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease-in-out;
    transition-delay: 2s;
  }

  &:hover:not(:disabled)::before {
    opacity: 1;
    visibility: visible;
  }

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabled};
    cursor: not-allowed;
  }

  svg {
    animation: ${props => props.loading ? 'spin 1s linear infinite' : 'none'};
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const EditorWrapper = styled.div`
  position: relative;
  height: calc(100% - 50px); /* Remaining height after header */
  overflow: hidden;
  flex-grow: 1;

  .monaco-editor {
    height: 100% !important; /* Take full height of wrapper */
    width: 100% !important;
  }
  /* Remove any borders */
  border: none;
  outline: none;
`;
