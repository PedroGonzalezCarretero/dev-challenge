const weatherService = require('../services/weather.service');

async function getWeather(req, res, next) {
    try {
        const { latitude, longitude } = req.query;

        const apiKey = '1222c4fcd1154ddebdf131039232305';

        const key = process.env.WEATHER_API_KEY;

        console.log(key);

        // Fetch weather information from weather API using weatherService
        const weatherData = await weatherService.fetchWeather(
            apiKey,
            latitude,
            longitude
        );

        // Store weather information in the database using weatherService or other relevant service

        // Return the weather data as a response
        res.json(weatherData);
    } catch (err) {
        console.error(`Error in getWeather: ${err.message}`);

        next(err);
    }
}

module.exports = {
    getWeather,
};
