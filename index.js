const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

// Route to fetch weather data
app.get('/weather', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  const apiKey = process.env.WEATHERSTACK_API_KEY;
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;

    if (weatherData.error) {
      return res.status(400).json({ error: weatherData.error.info });
    }

    res.json({
      location: weatherData.location.name,
      temperature: weatherData.current.temperature,
      weather_descriptions: weatherData.current.weather_descriptions,
      wind_speed: weatherData.current.wind_speed,
      humidity: weatherData.current.humidity,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the weather data' });
  }
});

app.listen(port, () => {
  console.log(`Weather service listening at http://localhost:${port}`);
});
