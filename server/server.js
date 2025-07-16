require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch'); // If using node v18+, you can use built-in fetch

const app = express();
const PORT = process.env.PORT || 3000;

const apiKey = process.env.API_KEY;  // Your API key from .env

const path = require('path');
app.use(express.static(path.join(__dirname, '..')));

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl)
    ]);

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    res.json({ current: currentData, forecast: forecastData });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
