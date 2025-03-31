// A simplified service that works with JSON data directly

// Define the available JSON datasources
const JSON_SOURCES = {
  products: 'json/products.json',  
  orders: 'json/orders.json',      
  customers: 'json/customers.json'
};

// Cache to store loaded JSON data
const dataCache = {};

// Load JSON data from a file
const loadJsonData = async (source) => {
  if (dataCache[source]) {
    return dataCache[source];
  }
  
  try {
    // Use window.location.pathname to get the base URL
    const baseUrl = window.location.pathname.includes('sql-query-runner') 
      ? '/sql-query-runner/' 
      : '/';
    
    const response = await fetch(`${baseUrl}${JSON_SOURCES[source]}`);
    if (!response.ok) {
      throw new Error(`Failed to load data from ${source}`);
    }
    
    const data = await response.json();
    dataCache[source] = data;
    return data;
  } catch (error) {
    console.error(`Error loading ${source} data:`, error);
    throw error;
  }
};

// Parse SQL-like query
const parseQuery = (query) => {
  // Simple regex to extract datasource and conditions
  const sourceMatch = query.match(/FROM\s+(\w+)/i);
  const whereMatch = query.match(/WHERE\s+(.+?)(?:;|$)/i);
  
  if (!sourceMatch) {
    throw new Error('Query must include a FROM clause');
  }
  
  return {
    source: sourceMatch[1].toLowerCase(),
    conditions: whereMatch ? whereMatch[1] : null
  };
};

// Simple condition parser
const evaluateCondition = (item, condition) => {
  if (!condition) return true;
  
  // Handle different comparison operators: =, >, <
  const operatorMatch = condition.match(/(\w+(?:\.\w+)*)\s*(=|>|<)\s*(.+?)(?:;|$)/i);
  if (operatorMatch) {
    const [, field, operator, valueStr] = operatorMatch;
    // Clean the value (remove quotes, etc.)
    const value = valueStr.trim().replace(/^['"]|['"]$/g, '').trim();
    
    // Get the actual value from the item using the field path
    let itemValue = item;
    const fieldParts = field.split('.');
    for (const part of fieldParts) {
      if (itemValue === undefined || itemValue === null) return false;
      itemValue = itemValue[part];
    }

    // Handle different value types
    let compareValue = value;
    if (value.toLowerCase() === 'true') compareValue = true;
    else if (value.toLowerCase() === 'false') compareValue = false;
    else if (!isNaN(value)) compareValue = Number(value);

    switch (operator) {
      case '=':
        return String(itemValue).toLowerCase() === String(compareValue).toLowerCase();
      case '>':
        return Number(itemValue) > Number(compareValue);
      case '<':
        return Number(itemValue) < Number(compareValue);
      default:
        return false;
    }
  }
  
  return true;
};

// Execute a query and return results
export const fetchQueryResults = async (query) => {
  try {
    const startTime = performance.now();
    const { source, conditions } = parseQuery(query);
    
    if (!JSON_SOURCES[source]) {
      return [{ error: `Unknown data source: ${source}. Available sources are: ${Object.keys(JSON_SOURCES).join(', ')}` }];
    }
    
    const data = await loadJsonData(source);
    
    // Filter data based on conditions
    const results = conditions 
      ? data.filter(item => evaluateCondition(item, conditions))
      : data;
    
    const executionTime = Math.round(performance.now() - startTime);
    
    // Return the results and metadata
    return {
      data: results,
      executionTime,
      rowCount: results.length
    };
  } catch (error) {
    console.error('Query execution error:', error);
    return {
      data: [{ error: error.message }],
      executionTime: 0,
      rowCount: 0
    };
  }
};
