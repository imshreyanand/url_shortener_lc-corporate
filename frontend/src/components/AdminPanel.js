import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/urls');
      setUrls(response.data);
    } catch (error) {
      setError('Failed to fetch URLs');
      console.error('Error fetching URLs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString();
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-panel">
        <h1>Admin Panel</h1>
        <p>Manage all shortened URLs</p>

        {urls.length === 0 ? (
          <p className="no-urls">No URLs found</p>
        ) : (
          <div className="urls-table-container">
            <table className="urls-table">
              <thead>
                <tr>
                  <th>Original URL</th>
                  <th>Short Code</th>
                  <th>Short URL</th>
                  <th>Clicks</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {urls.map((url) => (
                  <tr key={url._id}>
                    <td className="original-url">
                      <a 
                        href={url.originalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        title={url.originalUrl}
                      >
                        {url.originalUrl.length > 50 
                          ? url.originalUrl.substring(0, 50) + '...' 
                          : url.originalUrl}
                      </a>
                    </td>
                    <td className="short-code">{url.shortCode}</td>
                    <td className="short-url">
                      <a 
                        href={`http://localhost:3000/${url.shortCode}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        localhost:3000/{url.shortCode}
                      </a>
                    </td>
                    <td className="clicks">{url.clicks}</td>
                    <td className="created">{formatDate(url.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="stats">
          <h3>Statistics</h3>
          <p>Total URLs: {urls.length}</p>
          <p>Total Clicks: {urls.reduce((total, url) => total + url.clicks, 0)}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;