// Import Express
const express = require('express');
// Import fs module to work with the file system
const fs = require('fs');

// Create Express app
const app = express();

// Define port
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// === READ (GET) ===
// We'll include GET for completeness (tested in browser)
app.get('/cars', (req, res) => {
  fs.readFile('./data/data.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

// === CREATE (POST) ===
app.post('/cars', (req, res) => {
  const newCar = req.body;

  fs.readFile('./data/data.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');

    let cars = JSON.parse(data);
    cars.push(newCar);

    fs.writeFile('./data/data.json', JSON.stringify(cars, null, 2), err => {
      if (err) return res.status(500).send('Error writing file');
      res.send('Car added successfully!');
    });
  });
});

// === UPDATE (PUT) ===
app.put('/cars/:id', (req, res) => {
  const carId = parseInt(req.params.id);
  const updatedCar = req.body;

  fs.readFile('./data/data.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');

    let cars = JSON.parse(data);
    let index = cars.findIndex(car => car.id === carId);

    if (index !== -1) {
      cars[index] = { id: carId, ...updatedCar };

      fs.writeFile('./data/data.json', JSON.stringify(cars, null, 2), err => {
        if (err) return res.status(500).send('Error writing file');
        res.send('Car updated successfully!');
      });
    } else {
      res.status(404).send('Car not found');
    }
  });
});

// === DELETE ===
app.delete('/cars/:id', (req, res) => {
  const carId = parseInt(req.params.id);

  fs.readFile('./data/data.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');

    let cars = JSON.parse(data);
    let filteredCars = cars.filter(car => car.id !== carId);

    fs.writeFile('./data/data.json', JSON.stringify(filteredCars, null, 2), err => {
      if (err) return res.status(500).send('Error writing file');
      res.send('Car deleted successfully!');
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
