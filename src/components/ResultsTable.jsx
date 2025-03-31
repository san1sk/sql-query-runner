import { useState, useMemo, useEffect, useRef } from 'react';
import { useTable, useSortBy, usePagination, useFilters, useGlobalFilter } from 'react-table';
import { FaSort, FaSortUp, FaSortDown, FaFileDownload, FaSpinner, FaSearch, FaInfoCircle } from 'react-icons/fa';
import { 
  TableContainer, 
  Table, 
  TableHeader, 
  PaginationControls, 
  ResultsInfo, 
  ExportButton, 
  StyledInput,
  FilterContainer,
  TooltipToggle  // Add this import
} from '../styles/ResultsTableStyles';

const ResultsTable = ({ results, loading, executionTime, rowCount }) => {
  const [filterInput, setFilterInput] = useState('');
  const [columnFilters, setColumnFilters] = useState({});
  const [tooltipsEnabled, setTooltipsEnabled] = useState(false);
  const activeFilterRef = useRef(null);
  const activeFilterId = useRef(null);
  
  // Clean the results to ensure no HTML content and format boolean values
  const cleanedResults = useMemo(() => {
    if (!results || results.length === 0) return [];
    
    // If the first result contains an error property, return as is (it's an error message)
    if (results[0] && results[0].error) return results;
    
    // Clean values to ensure no HTML snippets and format booleans
    return results.map(row => {
      const cleanRow = {};
      Object.entries(row).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          cleanRow[key] = '';
        } else if (typeof value === 'string' && (
            value.includes('<!doctype html>') || 
            value.includes('<html') || 
            value.includes('<body')
          )) {
          cleanRow[key] = '[HTML content removed]';
        } else if (typeof value === 'boolean') {
          // Convert boolean values to readable strings
          cleanRow[key] = value ? 'Yes' : 'No';
        } else {
          cleanRow[key] = value;
        }
      });
      return cleanRow;
    });
  }, [results]);
  
  const data = useMemo(() => cleanedResults, [cleanedResults]);

  // Enhanced formatCellValue function for better object handling
  const formatCellValue = (value) => {
    if (value === null || value === undefined) {
      return '';
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return value.join(', ');
      }
      // Format nested object as a readable string
      return Object.entries(value)
        .map(([k, v]) => {
          // Handle nested objects recursively
          if (typeof v === 'object' && v !== null) {
            return `${k}: ${formatCellValue(v)}`;
          }
          return `${k}: ${v}`;
        })
        .join(', ');
    }
    return String(value);
  };

  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // Check if there's an error message
    if (data[0] && data[0].error) {
      return [{
        Header: 'Error',
        accessor: 'error'
      }];
    }
    
    return Object.keys(data[0]).map(key => ({
      Header: key,
      accessor: key,
      // Custom cell renderer for boolean values
      Cell: ({ value }) => {
        // Use formatCellValue for all cell rendering
        const formattedValue = formatCellValue(value);
        if (formattedValue === 'Yes' || formattedValue === 'No') {
          return <span className={formattedValue === 'Yes' ? 'boolean-yes' : 'boolean-no'}>
            {formattedValue}
          </span>;
        }
        // Add title attribute for tooltip on complex objects
        return <span title={formattedValue}>{formattedValue}</span>;
      },
      Filter: ({ column }) => {
        return (
          <StyledInput
            id={`filter-${key}`}
            value={columnFilters[key] || ''}
            onChange={e => {
              const newFilters = { ...columnFilters };
              if (e.target.value) {
                newFilters[key] = e.target.value;
              } else {
                delete newFilters[key];
              }
              setColumnFilters(newFilters);
              column.setFilter(e.target.value);
              
              // Track which filter is being edited
              activeFilterId.current = `filter-${key}`;
              activeFilterRef.current = e.target;
            }}
            onFocus={e => {
              // Track which filter has focus
              activeFilterId.current = `filter-${key}`;
              activeFilterRef.current = e.target;
            }}
            placeholder={`Filter...`}
          />
        );
      }
    }));
  }, [data, columnFilters]);

  // Filter function for global filter
  const defaultFilterFunction = (rows, id, filterValue) => {
    return rows.filter(row => {
      const rowValue = row.values[id];
      return rowValue !== undefined && 
             rowValue !== null && 
             String(rowValue).toLowerCase().includes(String(filterValue).toLowerCase());
    });
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    { 
      columns, 
      data,
      initialState: { pageSize: 15 },
      autoResetFilters: false,
      filterTypes: {
        text: defaultFilterFunction,
      },
      defaultColumn: {
        Filter: () => null,
      }
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Update global filter when input changes
  useEffect(() => {
    setGlobalFilter(filterInput);
  }, [filterInput, setGlobalFilter]);

  // Restore focus after re-render if a filter was being edited
  useEffect(() => {
    if (activeFilterRef.current && activeFilterId.current) {
      // Use a small timeout to ensure the DOM has updated
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(activeFilterId.current);
        if (element) {
          element.focus();
          
          // Restore cursor position to the end of the text
          if (element.value.length) {
            element.selectionStart = element.selectionEnd = element.value.length;
          }
        }
      }, 0);
      
      return () => clearTimeout(timeoutId);
    }
  }, [columnFilters, filterInput]);

  const exportData = format => {
    let content = '';
    let filename = `query-results-${new Date().toISOString().slice(0, 10)}`;
    
    if (format === 'csv') {
      // Create CSV content
      const headers = columns.map(column => column.Header).join(',');
      const rows = data.map(row => 
        columns.map(column => `"${row[column.accessor]}"`).join(',')
      ).join('\n');
      content = `${headers}\n${rows}`;
      filename += '.csv';
      downloadFile(content, filename, 'text/csv');
    } else if (format === 'json') {
      content = JSON.stringify(data, null, 2);
      filename += '.json';
      downloadFile(content, filename, 'application/json');
    }
  };

  const downloadFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  if (loading) {
    return (
      <TableContainer>
        <div className="loading-indicator">
          <FaSpinner className="spinner" />
          <p>Executing query...</p>
        </div>
      </TableContainer>
    );
  }

  // Handle error display
  if (data.length === 1 && data[0].error) {
    return (
      <TableContainer>
        <div className="error-state">
          <p className="error-message">{data[0].error}</p>
        </div>
      </TableContainer>
    );
  }

  if (data.length === 0) {
    return (
      <TableContainer>
        <div className="empty-state">
          <p>No results to display. Try running a query.</p>
        </div>
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <TableHeader>
        <ResultsInfo>
          <h3>Query Results</h3>
          <div>
            <span>{rowCount} rows</span>
            <span>•</span>
            <span>Executed in {executionTime}ms</span>
          </div>
        </ResultsInfo>
        <div>
          <FilterContainer>
            <FaSearch className="search-icon" />
            <StyledInput
              id="global-filter"
              className="global-filter"
              value={filterInput}
              onChange={e => {
                setFilterInput(e.target.value);
                // Track global filter as active
                activeFilterId.current = "global-filter";
                activeFilterRef.current = e.target;
              }}
              onFocus={e => {
                activeFilterId.current = "global-filter";
                activeFilterRef.current = e.target;
              }}
              placeholder="Search all columns..."
            />
          </FilterContainer>
          <TooltipToggle
            active={tooltipsEnabled}
            onClick={() => setTooltipsEnabled(!tooltipsEnabled)}
            title={`${tooltipsEnabled ? 'Disable' : 'Enable'} tooltips`}
          >
            <FaInfoCircle />
            <span>{tooltipsEnabled ? 'Hide Details' : 'Show Details'}</span>
          </TooltipToggle>
          <ExportButton onClick={() => exportData('csv')}>
            <FaFileDownload /> CSV
          </ExportButton>
          <ExportButton onClick={() => exportData('json')}>
            <FaFileDownload /> JSON
          </ExportButton>
        </div>
      </TableHeader>
      
      <div className="table-scroll-container">
        <Table tooltipsEnabled={tooltipsEnabled} {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th 
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                      column.isSorted
                        ? column.isSortedDesc
                          ? 'sorted-desc'
                          : 'sorted-asc'
                        : ''
                    }
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FaSortDown />
                        ) : (
                          <FaSortUp />
                        )
                      ) : (
                        <FaSort />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
            {/* Add filter row */}
            <tr className="filter-row">
              {headerGroups[0].headers.map(column => (
                <th key={`filter-${column.id}`}>
                  <div className="column-filter">
                    {column.canFilter && column.render('Filter')}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td key={cell.column.id} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      
      <PaginationControls>
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>
        </div>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[15, 25, 50, 100].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </PaginationControls>
    </TableContainer>
  );
};

export default ResultsTable;
