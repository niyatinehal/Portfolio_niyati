const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const router = express.Router();

let access_token = '';
let refresh_token = '';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

// Step 1: Redirect to Spotify Login
router.get('/login', (req, res) => {
  const scope = 'user-read-playback-state user-modify-playback-state user-read-currently-playing user-top-read user-follow-read streaming';
  const authURL = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id,
      scope,
      redirect_uri,
    });
  res.redirect(authURL);
});

// Step 2: Callback from Spotify
router.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token',
      querystring.stringify({
        code,
        redirect_uri,
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    access_token = response.data.access_token;
    refresh_token = response.data.refresh_token;
    res.send("Spotify integration successful. You can now access /spotify/data.");
  } catch (err) {
    res.status(400).send("Error during Spotify auth: " + err.message);
  }
});

// Step 3: Get Spotify Data
router.get('/data', async (req, res) => {
  if (!access_token) return res.status(401).send('Not authenticated with Spotify');

  try {
    const [topTracks, nowPlaying, followedArtists] = await Promise.all([
      axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10', {
        headers: { Authorization: `Bearer ${access_token}` }
      }),
      axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: { Authorization: `Bearer ${access_token}` }
      }),
      axios.get('https://api.spotify.com/v1/me/following?type=artist', {
        headers: { Authorization: `Bearer ${access_token}` }
      })
    ]);

    res.json({
      top_tracks: topTracks.data.items.map(track => ({
        name: track.name,
        artists: track.artists.map(a => a.name),
        uri: track.uri
      })),
      now_playing: nowPlaying.data?.item ? {
        name: nowPlaying.data.item.name,
        artists: nowPlaying.data.item.artists.map(a => a.name),
      } : "Nothing is playing",
      followed_artists: followedArtists.data.artists.items.map(artist => artist.name)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Step 4: Start/Stop Playback
router.post('/play', async (req, res) => {
  const { uri } = req.query;
  try {
    await axios.put('https://api.spotify.com/v1/me/player/play', { uris: [uri] }, {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    res.send('Playback started.');
  } catch (err) {
    res.status(500).send('Error playing song: ' + err.message);
  }
});

router.post('/pause', async (req, res) => {
  try {
    await axios.put('https://api.spotify.com/v1/me/player/pause', {}, {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    res.send('Playback paused.');
  } catch (err) {
    res.status(500).send('Error pausing song: ' + err.message);
  }
});

module.exports = router;
