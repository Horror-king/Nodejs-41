const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;
const nasaApiKey = 'v1arS6s4LQTbJuHUbVH8sPvyBnjxKqth2Bht7Y0H'; // Replace with your actual NASA API key

app.get('/randomspace', async (req, res) => {
  try {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod`, {
      params: { api_key: nasaApiKey }
    });

    if (response.status !== 200) {
      return res.status(response.status).json({ error: response.statusText });
    }

    return res.json(response.data);
  } catch (err) {
    const errorMessage = err.response?.data?.msg || err.message || 'Unknown error';
    console.error('Error fetching data from NASA API:', errorMessage);
    return res.status(500).json({
      error: 'An error occurred: ' + errorMessage
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
