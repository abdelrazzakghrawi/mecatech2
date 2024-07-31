const express = require('express');
const app = express();

app.get('/api/search', (req, res) => {
  res.send('Hello World from search-ser');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Search service running on port ${PORT}`));
