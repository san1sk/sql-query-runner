# SQL Query Editor

A modern, feature-rich SQL query editor built with React that allows users to interact with mock data using SQL-like queries.

## Key Features

### Query Interface
- Modern code editor with SQL syntax highlighting
- Keyboard shortcuts (Cmd/Ctrl + Enter to execute)
- Query presets for common operations
- Support for basic SQL operations (SELECT, FROM, WHERE)

### Results Visualization
- Interactive data table with sorting capabilities
- Column-based and global search filtering
- Pagination with adjustable page sizes
- Export functionality (CSV and JSON formats)
- Tooltip system for viewing long content
- Error handling and loading states

### Query History
- Track executed queries with timestamps
- Display execution count for repeated queries
- Favorite queries for quick access
- Delete unwanted queries from history

### Mock Data Generator
- Built-in mock data generation for:
  - Customers
  - Products
  - Orders
  - Sales data
  - Generic data

### UI/UX Features
- Light/Dark theme support
- Responsive layout with side panel
- Persistent storage for:
  - Theme preference
  - Favorite queries
- Modern styling with styled-components

## Technical Stack

### Core Technologies
- React + Vite
- Styled Components for styling
- Monaco Editor for SQL editing
- React Table for data visualization
- Faker.js for mock data generation

### Key Components
- QueryEditor: Monaco-based SQL editor
- ResultsTable: Interactive data grid
- QueryHistory: History management
- QuerySelector: Preset query selection
- Mock Data Generator: Fake data service

### State Management
- React hooks for local state
- LocalStorage for persistence
- Custom service layer for query execution

### Styling
- Themeable components
- CSS-in-JS with styled-components
- Responsive design principles
- Custom icon integration

## Project Structure

```
src/
├── components/         # React components
├── styles/            # Styled components
├── services/          # Business logic
├── utils/            # Helper functions
├── data/             # Static data
└── themes.js         # Theme definitions
