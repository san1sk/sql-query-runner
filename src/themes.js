import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#F8F9FA',
  text: '#212529',
  primary: '#0D6EFD',
  secondary: '#6C757D',
  background: '#FFFFFF',
  border: '#DEE2E6',
  shadow: 'rgba(0, 0, 0, 0.1)',
  tableHeader: '#E9ECEF',
  tableRow: '#FFFFFF',
  tableRowAlt: '#F8F9FA',
  buttonText: '#FFFFFF',
  success: '#198754',
  error: '#DC3545',
  warning: '#FFC107',
};

export const darkTheme = {
  body: '#212529',
  text: '#F8F9FA',
  primary: '#0D6EFD',
  secondary: '#6C757D',
  background: '#343A40',
  border: '#495057',
  shadow: 'rgba(0, 0, 0, 0.5)',
  tableHeader: '#343A40',
  tableRow: '#343A40',
  tableRowAlt: '#2B3035',
  buttonText: '#FFFFFF',
  success: '#20C997',
  error: '#DC3545',
  warning: '#FFC107',
};

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Inter', 'Segoe UI', 'Roboto', sans-serif;
    transition: all 0.3s ease;
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  /* Set CSS variables for theme colors to use in regular CSS */
  :root {
    --color-primary: ${({ theme }) => theme.primary};
    --color-secondary: ${({ theme }) => theme.secondary};
    --color-background: ${({ theme }) => theme.background};
    --color-text: ${({ theme }) => theme.text};
    --color-border: ${({ theme }) => theme.border};
    --color-elevation1: ${({ theme }) => theme.elevation1};
    --color-elevation2: ${({ theme }) => theme.elevation2};
    --color-tableHeader: ${({ theme }) => theme.tableHeader};
    --color-tableRowAlt: ${({ theme }) => theme.tableRowAlt};
    
    /* Set a data-theme attribute to use in CSS selectors */
    data-theme: ${({ theme }) => theme === lightTheme ? 'light' : 'dark'};
  }

  .spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
