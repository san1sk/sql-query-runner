import React, { useState } from 'react';

const CSVDataFilter = ({ onFilterChange, fields }) => {
  const [filterValues, setFilterValues] = useState({});

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filterValues, [field]: value };
    
    // Remove empty filters
    if (!value) {
      delete newFilters[field];
    }
    
    setFilterValues(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="csv-filter-container">
      <h3>Filter Data</h3>
      <div className="filter-fields">
        {fields.map(field => (
          <div key={field} className="filter-field">
            <label htmlFor={`filter-${field}`}>{field}:</label>
            <input
              id={`filter-${field}`}
              type="text"
              value={filterValues[field] || ''}
              onChange={(e) => handleFilterChange(field, e.target.value)}
              placeholder={`Filter by ${field}...`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CSVDataFilter;
