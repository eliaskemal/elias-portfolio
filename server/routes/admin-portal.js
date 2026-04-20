const express = require('express');
const router = express.Router();
const { mockDB } = require('../mock-database');

// Admin portal HTML page
router.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Portal - Elias Portfolio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f5;
            color: #333;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px 0;
            text-align: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.1em;
            opacity: 0.9;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        
        .stat-card {
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            text-align: center;
            transition: transform 0.3s ease;
        }
        
        .stat-card:hover {
            transform: translateY(-5px);
        }
        
        .stat-number {
            font-size: 2.5em;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
        }
        
        .stat-label {
            font-size: 1.1em;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .section {
            background: white;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .section h2 {
            color: #333;
            margin-bottom: 20px;
            font-size: 1.8em;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
        }
        
        .messages-grid {
            display: grid;
            gap: 20px;
        }
        
        .message-card {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            border-radius: 8px;
            transition: all 0.3s ease;
        }
        
        .message-card:hover {
            background: #e9ecef;
            transform: translateX(5px);
        }
        
        .message-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .message-name {
            font-weight: bold;
            font-size: 1.2em;
            color: #333;
        }
        
        .message-date {
            color: #666;
            font-size: 0.9em;
        }
        
        .message-email {
            color: #667eea;
            margin-bottom: 10px;
        }
        
        .message-subject {
            font-weight: 600;
            margin-bottom: 10px;
            color: #444;
        }
        
        .message-content {
            line-height: 1.6;
            color: #555;
        }
        
        .no-messages {
            text-align: center;
            padding: 40px;
            color: #666;
            font-style: italic;
        }
        
        .refresh-btn {
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1em;
            margin-bottom: 20px;
            transition: background 0.3s ease;
        }
        
        .refresh-btn:hover {
            background: #5a6fd8;
        }
        
        .loading {
            text-align: center;
            padding: 40px;
            color: #666;
        }
        
        .error {
            background: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid #f5c6cb;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Admin Portal</h1>
        <p>Elias Portfolio - Contact Messages Management</p>
    </div>
    
    <div class="container">
        <button class="refresh-btn" onclick="loadData()">Refresh Data</button>
        
        <div id="error-message" class="error" style="display: none;"></div>
        
        <div class="stats-grid" id="stats-grid">
            <div class="stat-card">
                <div class="stat-number" id="contacts-count">-</div>
                <div class="stat-label">Total Contacts</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="projects-count">-</div>
                <div class="stat-label">Projects</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="skills-count">-</div>
                <div class="stat-label">Skills</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="analytics-count">-</div>
                <div class="stat-label">Analytics</div>
            </div>
        </div>
        
        <div class="section">
            <h2>Recent Contact Messages</h2>
            <div id="messages-container" class="messages-grid">
                <div class="loading">Loading messages...</div>
            </div>
        </div>
    </div>

    <script>
        async function loadData() {
            try {
                // Load stats
                const statsResponse = await fetch('/api/admin/stats');
                const statsData = await statsResponse.json();
                
                if (statsData.success) {
                    document.getElementById('contacts-count').textContent = statsData.data.contacts;
                    document.getElementById('projects-count').textContent = statsData.data.projects;
                    document.getElementById('skills-count').textContent = statsData.data.skills;
                    document.getElementById('analytics-count').textContent = statsData.data.analytics;
                }
                
                // Load messages
                const messagesResponse = await fetch('/api/contact');
                const messagesData = await messagesResponse.json();
                
                const messagesContainer = document.getElementById('messages-container');
                
                if (messagesData.success && messagesData.data.length > 0) {
                    messagesContainer.innerHTML = messagesData.data.map(message => \`
                        <div class="message-card">
                            <div class="message-header">
                                <div class="message-name">\${message.name}</div>
                                <div class="message-date">\${new Date(message.created_at).toLocaleDateString()}</div>
                            </div>
                            <div class="message-email">\${message.email}</div>
                            \${message.subject ? \`<div class="message-subject">\${message.subject}</div>\` : ''}
                            <div class="message-content">\${message.message}</div>
                        </div>
                    \`).join('');
                } else {
                    messagesContainer.innerHTML = '<div class="no-messages">No messages yet</div>';
                }
                
                // Hide error message
                document.getElementById('error-message').style.display = 'none';
                
            } catch (error) {
                console.error('Error loading data:', error);
                document.getElementById('error-message').textContent = 'Error loading data: ' + error.message;
                document.getElementById('error-message').style.display = 'block';
            }
        }
        
        // Load data when page loads
        loadData();
        
        // Auto-refresh every 30 seconds
        setInterval(loadData, 30000);
    </script>
</body>
</html>
  `);
});

module.exports = router;
