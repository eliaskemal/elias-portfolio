import React, { useState, useEffect } from "react";
import "./AdminPage.css";

const AdminPageTest = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("Testing basic API call...");

      // Simple fetch test
      const response = await fetch(
        "http://localhost:10000/api/admin/tables/contacts",
      );
      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Data:", data);

      if (data.success) {
        setMessages(data.data || []);
      } else {
        setError("API returned error: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Full error:", err);
      setError("Error loading data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Portal (Test Version)</h1>
        <p>Simple test version to debug issues</p>
      </div>

      <div className="admin-container">
        <button className="refresh-btn" onClick={loadMessages}>
          Refresh Data
        </button>

        {error && <div className="error-message">{error}</div>}

        <div className="messages-section">
          <h2>Debug Info</h2>
          <p>Messages found: {messages.length}</p>
          <p>Server URL: http://localhost:10000</p>

          {messages.length > 0 && (
            <div>
              <h3>First Message (Debug):</h3>
              <pre>{JSON.stringify(messages[0], null, 2)}</pre>
            </div>
          )}

          <h2>Contact Messages</h2>
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
                        ? new Date(
                            message.created_at || message.createdAt,
                          ).toLocaleDateString()
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

export default AdminPageTest;
