const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fetchWeather(apiKey, latitude, longitude) {
    try {
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(
                `Weather API request failed with status ${response.status}`
            );
        }

        const weatherData = await response.json();

        const currentWeather = {
            city: weatherData.location.name,
            readingTimeAndDate: new Date(),
            celsiusTemperature: weatherData.current.temp_c,
            condition: weatherData.current.condition.text,
            conditionIcon: weatherData.current.condition.icon,
        };

        if (
            currentWeather.city &&
            currentWeather.readingTimeAndDate &&
            currentWeather.celsiusTemperature &&
            currentWeather.condition &&
            currentWeather.conditionIcon
        ) {
            const createdWeather = await prisma.weather.create({
                data: {
                    city: currentWeather.city,
                    dateandtime: new Date(),
                    celsiustemperature: currentWeather.celsiusTemperature,
                    condition: currentWeather.condition,
                    conditionicon: currentWeather.conditionIcon,
                },
            });

            console.log('Weather created:', createdWeather);
        } else {
            throw new Error('Invalid currentWeather object');
        }

        return currentWeather;
    } catch (error) {
        console.error('Error fetching weather:', error.message);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = {
    fetchWeather,
};
