const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fetchWeatherHistory() {
    try {
        const weatherHistory = await prisma.weather.findMany({
            take: 5,
            orderBy: { dateandtime: 'desc' },
        });

        return weatherHistory;
    } catch (error) {
        console.error('Error fetching weather history:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = {
    fetchWeatherHistory,
};
