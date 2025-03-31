import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  position: relative; /* Ensure proper positioning context */
`;

export const EditorResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  padding: 20px;
  gap: 20px;
  height: calc(100vh - 70px); /* Account for header height */
  /* Add margin/padding to prevent overlap with side panel */
  margin-right: 280px; /* Match the width of the side panel */

  .editor-section {
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.elevation1};
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px ${({ theme }) => theme.shadow};
    /* Add a subtle border */
    border: 1px solid ${({ theme }) => theme.border};
    outline: none;
    /* Reduced height */
    height: 300px;
    min-height: 300px;
    max-height: 300px;
  }

  .results-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.elevation1};
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px ${({ theme }) => theme.shadow};
    /* Fixed height for results table - increased to account for the smaller editor */
    flex-grow: 0;
    height: calc(100vh - 450px); /* Increased from 550px to give more space to results */
  }
  
  /* Media query to adjust layout when side panel is hidden */
  @media (max-width: 1200px) {
    margin-right: 0;
  }
`;

export const SidePanel = styled.div`
  width: 280px;
  background-color: ${({ theme }) => theme.elevation1};
  border-left: 1px solid ${({ theme }) => theme.border};
  padding: 20px;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 70px; /* Account for header height */
  bottom: 0;
  z-index: 5;
  /* Add box shadow for visual separation */
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 1200px) {
    display: none;
  }
`;
