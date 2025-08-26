import React, { useState } from 'react';
import axios from 'axios';

function UrlShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!longUrl) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/shorten', {
        originalUrl: longUrl
      });

      setShortUrl(response.data.shortUrl);
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || 'Something went wrong');
      setShortUrl('');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('Short URL copied to clipboard!');
  };

  return (
    <div className="url-shortener-container">
      <div className="url-shortener">
        <h1>URL Shortener</h1>
        <p>Enter a long URL to get a shortened version</p>

        <form onSubmit={handleSubmit} className="url-form">
          <div className="input-group">
            <input
              type="text"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Enter your long URL here..."
              className="url-input"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="submit-btn"
            >
              {loading ? 'Shortening...' : 'Shorten URL'}
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {shortUrl && (
          <div className="result-container">
            <h3>Your shortened URL:</h3>
            <div className="result-box">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="result-input"
              />
              <button onClick={copyToClipboard} className="copy-btn">
                Copy
              </button>
            </div>
            <p className="result-text">
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                {shortUrl}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UrlShortener;