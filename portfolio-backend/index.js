const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const spotifyRoutes = require('./routes/spotify');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use('/spotify', spotifyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
