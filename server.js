//The primary role of server.js is to act as a backend proxy for the weather-related functionality. 
// It bridges the gap between the frontend and the Environment Canada XML Weather API. 
// This server simplifies API integration and ensures security by hiding the API URLs from the frontend.

// In brief, server.js ensures users can view weather forecasts for Canadian cities by proxying 
// and processing requests to the Environment Canada API.

// Import required modules
const express = require('express'); // Framework to create the server
const fetch = require('node-fetch'); // Module to make HTTP requests
const cors = require('cors'); // Module to enable Cross-Origin Resource Sharing (CORS)

const app = express(); // Initialize an Express application
const PORT = 3000; // Define the port where the server will listen

// Enable CORS for all incoming requests
app.use(cors());

// Define an endpoint to fetch the site list (proxy)
app.get('/api/sitelist', async (req, res) => {
    const weatherAPI = 'https://dd.weather.gc.ca/citypage_weather/xml/siteList.xml'; // URL for the Environment Canada weather site list
    try {
        // Fetch the raw XML data from the weather API
        const response = await fetch(weatherAPI);
        const xmlData = await response.text(); // Parse the response as raw text (XML format)
        res.send(xmlData); // Send the raw XML data back to the client
    } catch (error) {
        // Log any error that occurs and send a 500 response with an error message
        console.error('Error fetching siteList:', error);
        res.status(500).send('Error fetching siteList');
    }
});

// Define an endpoint to fetch weather data for a specific location
app.get('/api/weather', async (req, res) => {
    const url = req.query.url; // Expect the `url` parameter in the query string
    if (!url) {
        // If no URL is provided, return a 400 error response
        return res.status(400).send('Missing weather URL parameter');
    }
    try {
        // Fetch the weather data from the provided URL
        const response = await fetch(url);
        const xmlData = await response.text(); // Parse the response as raw text (XML format)
        res.send(xmlData); // Send the raw XML data back to the client
    } catch (error) {
        // Log any error that occurs and send a 500 response with an error message
        console.error('Error fetching weather data:', error);
        res.status(500).send('Error fetching weather data');
    }
});

// Start the Express server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`); // Log the URL where the server is running
});

