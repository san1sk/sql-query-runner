import React, { useState, useEffect } from 'react';
import csvDataService from '../services/csvDataService';

const CSVDataDisplay = ({ fileName, filters = {}, columns = [] }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await csvDataService.queryData(fileName, filters);
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to load CSV data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fileName, JSON.stringify(filters)]);

  if (loading) return <div>Loading data...</div>;
  if (error) return <div className="error">{error}</div>;
  if (data.length === 0) return <div>No data found</div>;

  // If no columns specified, use all columns from first data item
  const displayColumns = columns.length > 0 ? columns : Object.keys(data[0]);

  return (
    <div className="csv-data-container">
      <table className="csv-table">
        <thead>
          <tr>
            {displayColumns.map(column => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {displayColumns.map(column => (
                <td key={`${index}-${column}`}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CSVDataDisplay;
