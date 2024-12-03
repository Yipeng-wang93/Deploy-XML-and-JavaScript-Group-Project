//The primary role of server-attractions.js is to handle location-based services such as fetching nearby attractions 
// using the Google Maps APIs. This server processes requests from the frontend, retrieves data from external APIs, 
// and sends back structured JSON data.

//In brief, server-attractions.js provides users with details about nearby attractions using the Google Maps API suite.

const express = require('express'); // Import Express framework
const cors = require('cors'); // Import CORS to enable cross-origin resource sharing
const fetch = require('node-fetch'); // Import node-fetch for making HTTP requests

const app = express(); // Create an Express application
const PORT = 4000; // Define the port on which the server will run

// Enable CORS to allow requests from different origins
app.use(cors());

// API endpoint to fetch attractions and map data
app.get('/api/attractions', async (req, res) => {
    const { location } = req.query; // Extract the `location` parameter from the query string

    // Check if the location parameter is provided
    if (!location) {
        return res.status(400).send({ error: 'Location is required' }); // Return an error if the location is missing
    }

    try {
        // Google Maps API keys for geocoding and places
        const geocodingApiKey = 'AIzaSyBd51RebPS8Rjf_fcHO3FyDSSEa6AF9vMY';
        const placesApiKey = 'AIzaSyBd51RebPS8Rjf_fcHO3FyDSSEa6AF9vMY';

        // Step 1: Geocode the location to get its coordinates (latitude and longitude)
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${geocodingApiKey}`;
        const geocodingResponse = await fetch(geocodingUrl); // Make a request to the Geocoding API
        const geocodingData = await geocodingResponse.json(); // Parse the response as JSON

        // Check if the Geocoding API request was successful
        if (geocodingData.status !== 'OK') {
            return res.status(400).send({ error: `Failed to geocode location: ${geocodingData.status}` }); // Return an error if geocoding fails
        }

        const { lat, lng } = geocodingData.results[0].geometry.location; // Extract latitude and longitude from the response

        // Step 2: Use the Places API to find attractions near the location
        const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=tourist_attraction&key=${placesApiKey}`;
        const placesResponse = await fetch(placesUrl); // Make a request to the Places API
        const placesData = await placesResponse.json(); // Parse the response as JSON

        // Check if the Places API request was successful
        if (placesData.status !== 'OK') {
            return res.status(400).send({ error: `Failed to fetch attractions: ${placesData.status}` }); // Return an error if the Places API fails
        }

        // Format the attractions data to include only relevant information
        const attractions = placesData.results.map((place) => ({
            name: place.name, // Name of the attraction
            type: place.types[0], // Primary type/category of the attraction
            rating: place.rating || 'N/A', // Rating (if available), otherwise 'N/A'
            address: place.vicinity || 'N/A', // Address (if available), otherwise 'N/A'
        }));

        // Return the formatted attractions data as a JSON response
        res.status(200).send({ attractions });
    } catch (error) {
        console.error('Error fetching attraction data:', error); // Log the error for debugging
        res.status(500).send({ error: 'Failed to fetch attraction data.' }); // Return a generic error message
    }
});

// Start the Express server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Attractions server running on http://localhost:${PORT}`); // Log a message when the server starts
});



