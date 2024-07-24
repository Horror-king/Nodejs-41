const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Your NASA API key
const apiKey = 'v1arS6s4LQTbJuHUbVH8sPvyBnjxKqth2Bht7Y0H';

app.get('/random-image', async (req, res) => {
    try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
        const data = response.data;
        const result = {
            title: data.title,
            date: data.date,
            explanation: data.explanation,
            imageUrl: data.url,
            mediaType: data.media_type
        };
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
