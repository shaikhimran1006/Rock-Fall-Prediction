const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle client-side routing - send all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

const port = process.env.PORT || 10000;
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Frontend server running on port ${port}`);
  console.log(`🌍 Available at: http://localhost:${port}`);
});