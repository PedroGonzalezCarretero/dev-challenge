const weatherService = require('../services/weather.service');

async function getWeather(req, res, next) {
    try {
        const { latitude, longitude } = req.query;

        const apiKey = process.env.WEATHER_API_KEY;

        const weatherData = await weatherService.fetchWeather(
            apiKey,
            latitude,
            longitude
        );

        res.json(weatherData);
    } catch (err) {
        console.error(`Error in getWeather: ${err.message}`);

        next(err);
    }
}

module.exports = {
    getWeather,
};
