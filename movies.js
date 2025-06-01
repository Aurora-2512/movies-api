const fs = require('fs');
const csv = require('csv-parser');
const express = require('express');
const router = express.Router();

let movies = [];

// Load CSV on startup
fs.createReadStream('movies.csv')
  .pipe(csv())
  .on('data', (data) => movies.push(data))
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

// Route: Get all movies
router.get('/movies', (req, res) => {
  res.json(movies);
});

// Route: Search by genre
router.get('/movies/genre/:genre', (req, res) => {
  const genre = req.params.genre.toLowerCase().trim();
  const results = movies.filter(movie =>
    movie.genre.toLowerCase().trim().includes(genre)
  );
  if (results.length === 0) {
    return res.status(404).json({ message: 'No movies found for this genre' });
  }
  res.json(results);
});

// Route: Search by title
router.get('/movies/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();
  const results = movies.filter(movie =>
    movie.title.toLowerCase().includes(title)
  );
  if (results.length === 0) {
    return res.status(404).json({ message: 'No movies found with that title' });
  }
  res.json(results);
});

// Route: Search by year
router.get('/movies/year/:year', (req, res) => {
  const year = req.params.year;
  const results = movies.filter(movie => movie.year === year);
  if (results.length === 0) {
    return res.status(404).json({ message: 'No movies found from that year' });
  }
  res.json(results);
});

// Route: Search by mood (if applicable)
router.get('/movies/mood/:mood', (req, res) => {
  const mood = req.params.mood.toLowerCase();
  const results = movies.filter(movie =>
    movie.mood && movie.mood.toLowerCase().includes(mood)
  );
  if (results.length === 0) {
    return res.status(404).json({ message: 'No movies found for that mood' });
  }
  res.json(results);
});

module.exports = router;
