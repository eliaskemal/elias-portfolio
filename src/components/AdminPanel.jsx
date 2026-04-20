import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/contact`);
      setMessages(response.data.data || []);
    } catch (err) {
      setError('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/contact/${id}`);
      fetchMessages(); // Refresh messages
    } catch (err) {
      setError('Failed to delete message');
    }
  };

  if (loading) return <div className="admin-panel">Loading messages...</div>;
  if (error) return <div className="admin-panel error">{error}</div>;

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Contact Messages</h1>
        <button onClick={fetchMessages} className="refresh-btn">Refresh</button>
      </div>
      
      {messages.length === 0 ? (
        <div className="no-messages">No messages yet</div>
      ) : (
        <div className="messages-grid">
          {messages.map((message) => (
            <div key={message.id} className="message-card">
              <div className="message-header">
                <h3>{message.name}</h3>
                <span className="message-date">
                  {new Date(message.created_at).toLocaleDateString()}
                </span>
              </div>
              
              <div className="message-info">
                <p><strong>Email:</strong> {message.email}</p>
                {message.subject && <p><strong>Subject:</strong> {message.subject}</p>}
              </div>
              
              <div className="message-content">
                <p>{message.message}</p>
              </div>
              
              <div className="message-actions">
                <button 
                  onClick={() => deleteMessage(message.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
