const historyService = require('../services/history.service');

async function getWeatherHistory(req, res, next) {
    try {
        const weatherHistory = await historyService.fetchWeatherHistory();
        res.json(weatherHistory);
    } catch (error) {
        console.error('Error in getWeatherHistory:', error);
        next(error);
    }
}

module.exports = {
    getWeatherHistory,
};
