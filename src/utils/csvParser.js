import Papa from 'papaparse';

export const parseCSV = async (filePath) => {
  try {
    console.log('Fetching CSV from:', filePath);
    
    const response = await fetch(filePath);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV file: ${response.status} ${response.statusText}`);
    }
    
    const text = await response.text();
    
    // Check if response contains HTML instead of CSV data
    if (text.trim().toLowerCase().startsWith('<!doctype html>') || 
        text.includes('<html') || 
        text.includes('<body')) {
      console.error('Received HTML instead of CSV:', text.substring(0, 200) + '...');
      throw new Error('Received HTML instead of CSV data. The file path might be incorrect or the server is returning an HTML error page.');
    }
    
    return new Promise((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          if (results.errors && results.errors.length > 0) {
            console.warn('CSV parsing had errors:', results.errors);
          }
          console.log(`Successfully parsed CSV with ${results.data.length} rows`);
          resolve(results.data);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error parsing CSV:', error);
    throw error;
  }
};
