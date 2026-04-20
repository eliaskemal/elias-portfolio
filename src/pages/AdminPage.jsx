import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPage.css";

const AdminPage = () => {
  const [stats, setStats] = useState({
    contacts: 0,
    projects: 0,
    skills: 0,
    analytics: 0,
  });
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    loadData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      console.log("Starting to load data...");
      setLoading(true);
      setError("");

      // Load stats
      console.log("Fetching stats from:", `${API_URL}/api/admin/stats`);
      const statsResponse = await axios.get(`${API_URL}/api/admin/stats`);
      console.log("Stats response:", statsResponse.data);
      if (statsResponse.data.success) {
        setStats(statsResponse.data.data);
      }

      // Load messages from admin endpoint instead of contact endpoint
      console.log(
        "Fetching messages from:",
        `${API_URL}/api/admin/tables/contacts`,
      );
      const messagesResponse = await axios.get(
        `${API_URL}/api/admin/tables/contacts`,
      );
      console.log("Messages response:", messagesResponse.data);
      if (messagesResponse.data.success) {
        console.log("Setting messages:", messagesResponse.data.data || []);
        setMessages(messagesResponse.data.data || []);
      } else {
        console.log("Messages fetch failed:", messagesResponse.data);
      }
    } catch (err) {
      console.error("Detailed error:", err);
      if (err.response) {
        // The request was made and the server responded with a status code
        setError(
          `Server error: ${err.response.status} - ${err.response.statusText}`,
        );
      } else if (err.request) {
        // The request was made but no response was received
        setError(
          "Network error: Cannot connect to backend server. Please make sure the server is running on port 10000.",
        );
      } else {
        // Something happened in setting up the request
        setError("Error loading data: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && messages.length === 0) {
    return (
      <div className="admin-page">
        <div className="loading">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Portal</h1>
        <p>Elias Portfolio - Contact Messages Management</p>
      </div>

      <div className="admin-container">
        <button className="refresh-btn" onClick={loadData}>
          Refresh Data
        </button>

        {error && <div className="error-message">{error}</div>}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.contacts}</div>
            <div className="stat-label">Total Contacts</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.projects}</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.skills}</div>
            <div className="stat-label">Skills</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.analytics}</div>
            <div className="stat-label">Analytics</div>
          </div>
        </div>

        <div className="messages-section">
          <h2>Recent Contact Messages</h2>
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

export default AdminPage;
