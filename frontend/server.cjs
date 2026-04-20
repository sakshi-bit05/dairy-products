const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for mobile access
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

// Serve static files from dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all routes - serve index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Aditya Dairy website hosted successfully!`);
  console.log(`📱 Mobile accessible at: http://0.0.0.0:${PORT}`);
  console.log(`🌐 Local network access: http://localhost:${PORT}`);
  console.log(`💡 For mobile testing, use your phone's browser and navigate to: http://[your-local-ip]:${PORT}`);
});
