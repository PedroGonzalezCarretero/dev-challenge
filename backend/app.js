const express = require('express');
const app = express();
const cors = require('cors');

const { Pool } = require('pg');

// Import routes
const homeRoute = require('./src/routes/home.route');
const weatherRoute = require('./src/routes/weather.route');

const historyRoute = require('./src/routes/history.route');

const allowedOrigins = '*';

app.use(
    cors({
        origin: allowedOrigins,
    })
);
// Use routes
app.use('/weather', weatherRoute);
app.use('/', homeRoute);
app.use('/history', historyRoute);

// Start the server
const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = {
    app,
};
