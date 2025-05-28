const axios = require("axios");
const redis = require("../utils/redis");
const { settings } = require("../settings/application");

const API_key = settings.open_weather_key;

const cityEndpoint = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_key}`;

const getWeather = async (req, res) => {
    const { city } = req.query;

    try {
        const t1 = Date.now();

        let cachedEntry = await redis.get(`weather:${city}`);

        if (cachedEntry) {
            const parsedData = JSON.parse(cachedEntry);
            const t2 = Date.now();
            return res.json({...parsedData, source: "cache",responseTime: `${t2 - t1}ms`});
        }

        const apiResponse = await axios.get(cityEndpoint(city));
        await redis.set(`weather:${city}`,JSON.stringify(apiResponse.data),"EX",3600);

        const t2 = Date.now();

        res.json({...apiResponse.data,source: "API",responseTime: `${t2 - t1}ms`,});
    } catch (err) {
        console.error("Weather fetch error:", err.message);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
};

module.exports = { getWeather };
