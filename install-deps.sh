#!/bin/bash

echo "Installing missing dependencies..."

# Install the missing packages
npm install styled-components react-icons react-table @monaco-editor/react @faker-js/faker

echo "Dependencies installed successfully!"
echo "You can now start the development server with 'npm run dev'"
