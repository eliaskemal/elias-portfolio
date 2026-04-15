import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DatabaseViewer = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [customQuery, setCustomQuery] = useState('');
  const [queryResult, setQueryResult] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';

  useEffect(() => {
    fetchTables();
  }, []);

  useEffect(() => {
    if (selectedTable) {
      fetchTableData(selectedTable, page, search);
    }
  }, [selectedTable, page, search]);

  const fetchTables = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/admin/tables`);
      setTables(response.data.data);
    } catch (err) {
      setError('Failed to fetch tables');
    } finally {
      setLoading(false);
    }
  };

  const fetchTableData = async (tableName, pageNum = 1, searchQuery = '') => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/api/admin/tables/${tableName}?page=${pageNum}&limit=20&search=${searchQuery}`
      );
      setTableData(response.data.data);
    } catch (err) {
      setError('Failed to fetch table data');
    } finally {
      setLoading(false);
    }
  };

  const executeQuery = async () => {
    if (!customQuery.trim()) return;
    
    try {
      setLoading(true);
      setError('');
      const response = await axios.post(`${API_URL}/api/admin/query`, {
        sql: customQuery
      });
      setQueryResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Query execution failed');
    } finally {
      setLoading(false);
    }
  };

  const renderTable = (data) => {
    if (!data || !data.rows || data.rows.length === 0) {
      return <p className="text-gray-500">No data found</p>;
    }

    const columns = data.columns || Object.keys(data.rows[0]);

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th key={col.column_name || col} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  {col.column_name || col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.rows.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.column_name || col} className="px-4 py-2 text-sm text-gray-900 border-b">
                    {row[col.column_name || col] !== null ? String(row[col.column_name || col]) : 'NULL'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Database Viewer</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Tables Overview */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Database Tables</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tables.map((table) => (
              <div
                key={table.table_name}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedTable === table.table_name
                    ? 'bg-blue-50 border-blue-500'
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => {
                  setSelectedTable(table.table_name);
                  setPage(1);
                  setSearch('');
                }}
              >
                <h3 className="font-medium text-gray-900">{table.table_name}</h3>
                <p className="text-sm text-gray-500">{table.row_count} rows</p>
                <p className="text-xs text-gray-400">{table.column_count} columns</p>
              </div>
            ))}
          </div>
        </div>

        {/* Table Data */}
        {selectedTable && tableData && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Table: {selectedTable}</h2>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-500">
                  {tableData.pagination.total} total rows
                </span>
              </div>
            </div>

            {renderTable(tableData)}

            {/* Pagination */}
            {tableData.pagination.pages > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1">
                  Page {page} of {tableData.pagination.pages}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === tableData.pagination.pages}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        {/* Custom Query */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Custom SQL Query</h2>
          <div className="space-y-4">
            <textarea
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder="Enter SQL query (SELECT only)..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
            <button
              onClick={executeQuery}
              disabled={loading || !customQuery.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Executing...' : 'Execute Query'}
            </button>
          </div>

          {queryResult && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Query Results ({queryResult.rowCount} rows)</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      {queryResult.rows.length > 0 && Object.keys(queryResult.rows[0]).map((key) => (
                        <th key={key} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {queryResult.rows.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        {Object.values(row).map((value, cellIndex) => (
                          <td key={cellIndex} className="px-4 py-2 text-sm text-gray-900 border-b">
                            {value !== null ? String(value) : 'NULL'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatabaseViewer;
