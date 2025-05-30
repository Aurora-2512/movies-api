const express = require('express');
const moviesRouter = require('./movies');

const app = express();
const PORT = 3000;

app.use('/api', moviesRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
