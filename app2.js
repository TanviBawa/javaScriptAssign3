// Import the Express module
const express = require('express');

// Import the built-in 'fs' module to read files
const fs = require('fs');

// Create an Express application
const app = express();

// Define the port
const PORT = 3000;

// Route to display JSON data (e.g., http://localhost:3000/cars)
app.get('/cars', (req, res) => {
  // Read the JSON file from the 'data' folder
  fs.readFile('./data/data.json', 'utf8', (err, data) => {
    if (err) {
      // Send error message if file can't be read
      res.status(500).send('Error reading JSON file');
    } else {
      // Send the raw JSON content to the browser
      res.send(data);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
