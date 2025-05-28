require("dotenv").config();
const axios = require("axios");
const { settings } = require("./settings/application");
const redis = require("./utils/redis");
const API_key = settings.open_weather_key

const cityEndpoint = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_key}`;

const getWeather = async (city, err) => {

    let cachedEnty = await redis.get(`weather:${city}`)

    if(cachedEnty) {
        cachedEnty = JSON.parse(cachedEnty)
        return {...cachedEnty, 'source': 'cache'}
    };

    let apiResponse = await axios.get(cityEndpoint(city));
    redis.set(`weather:${city}`, JSON.stringify(apiResponse.data), 'EX', 3600);

    return { ...apiResponse.data, 'source': 'API' };
};

const city = "seattle";
(async () => {
    try {
        const t1 = new Date().getTime()
        const weather = await getWeather(city);
        const t2 = new Date().getTime()
        weather.responseTime = `${t2 - t1}ms`
        console.log(weather);
        process.exit()
    } catch (err) {
        console.error("Error fetching weather:", err.message);
    }
})();


// process.exit()

