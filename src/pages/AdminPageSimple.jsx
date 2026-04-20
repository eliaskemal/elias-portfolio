import React, { useState, useEffect } from "react";
import "./AdminPage.css";

const AdminPageSimple = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [debug, setDebug] = useState("");

  useEffect(() => {
    loadSimpleData();
  }, []);

  const loadSimpleData = async () => {
    try {
      setLoading(true);
      setError("");
      setDebug("Starting fetch...");

      // Simple fetch without axios
      const response = await fetch('http://localhost:5000/api/admin/tables/contacts');
      setDebug(`Response status: ${response.status}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setDebug(`Data received: ${JSON.stringify(data).substring(0, 200)}...`);
      
      if (data.success) {
        setMessages(data.data || []);
        setDebug(`Success! Found ${data.data ? data.data.length : 0} messages`);
      } else {
        setError(`API Error: ${data.message || 'Unknown error'}`);
        setDebug(`API failed: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      setDebug(`Full error: ${err.toString()}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading">
          Loading admin dashboard...
          <div style={{fontSize: '12px', marginTop: '10px'}}>{debug}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Portal (Simple Version)</h1>
        <p>Debug version to test connectivity</p>
      </div>

      <div className="admin-container">
        <button className="refresh-btn" onClick={loadSimpleData}>
          Refresh Data
        </button>

        {error && <div className="error-message">{error}</div>}
        
        <div style={{background: '#f0f0f0', padding: '10px', margin: '10px 0', fontSize: '12px'}}>
          <strong>Debug Info:</strong> {debug}
        </div>

        <div className="messages-section">
          <h2>Contact Messages</h2>
          <p>Found {messages.length} messages</p>
          
          {messages.length === 0 ? (
            <div className="no-messages">No messages yet</div>
          ) : (
            <div className="messages-grid">
              {messages.map((message) => (
                <div key={message.id || message._id} className="message-card">
                  <div className="message-header">
                    <div className="message-name">{message.name}</div>
                    <div className="message-date">
                      {message.created_at || message.createdAt
                        ? new Date(message.created_at || message.createdAt).toLocaleDateString()
                        : "No date"}
                    </div>
                  </div>
                  <div className="message-email">{message.email}</div>
                  {message.subject && (
                    <div className="message-subject">{message.subject}</div>
                  )}
                  <div className="message-content">{message.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPageSimple;
