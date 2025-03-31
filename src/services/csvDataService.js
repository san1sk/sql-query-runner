import { parseCSV } from '../utils/csvParser';

class CSVDataService {
  constructor() {
    this.cachedData = {};
    this.basePath = '/csv'; // In public folder this is the correct path
  }

  async getAvailableFiles() {
    try {
      // These are the CSV files we expect to be available
      const files = [
        'orders.csv',
        'order_details.csv',
        'categories.csv',
        'customers.csv',
        'products.csv',
        'employees.csv',
        'suppliers.csv',
        'shippers.csv',
        'regions.csv',
        'employee_territories.csv'
      ];
      
      // Filter to only include files that actually exist
      const availableFiles = [];
      
      for (const file of files) {
        try {
          // Use the correct public path
          const response = await fetch(`${this.basePath}/${file}`, { method: 'HEAD' });
          if (response.ok) {
            availableFiles.push(file);
            console.log(`Found CSV file: ${file}`);
          }
        } catch (err) {
          console.warn(`File ${file} not available:`, err.message);
        }
      }
      
      return availableFiles;
    } catch (error) {
      console.error('Error fetching available CSV files:', error);
      return [];
    }
  }

  async getCSVData(fileName) {
    // Return cached data if available
    if (this.cachedData[fileName]) {
      return this.cachedData[fileName];
    }
    
    try {
      // Use the public folder path directly - this is the correct path for static assets
      const filePath = `${this.basePath}/${fileName}`;
      console.log(`Fetching CSV data from: ${filePath}`);
      
      const data = await parseCSV(filePath);
      
      // Cache the data for future use
      this.cachedData[fileName] = data;
      return data;
    } catch (error) {
      console.error(`Error loading CSV file ${fileName}:`, error);
      throw new Error(`Failed to load CSV file: ${fileName}. ${error.message}`);
    }
  }

  async queryData(fileName, filters = {}) {
    const data = await this.getCSVData(fileName);
    
    return data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        return item[key] && String(item[key]).toLowerCase().includes(String(value).toLowerCase());
      });
    });
  }
}

export default new CSVDataService();
