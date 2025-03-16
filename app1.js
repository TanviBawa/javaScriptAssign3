// Import the Express module
const express = require('express');

// Create an Express application
const app = express();

// Define a port number where the server will listen
const PORT = 3000;

// Define a route for the home page ('/') that sends HTML with group names
app.get('/', (req, res) => {
  // Sending a simple HTML response with group names
  res.send(`
    <h1>Welcome to Our Group!</h1>
    <p>Group Members:</p>
    <ul>
      <li>Tanvi Bawa (200562669)</li>
      <li>Harnoorpreet Kaur (200572177)</li>
      <li>Diksha Diksha (200566472)</li>
    </ul>
  `);
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
