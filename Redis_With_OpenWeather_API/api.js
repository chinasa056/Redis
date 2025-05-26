require("dotenv").config();
const axios = require("axios");
const { settings } = require("./settings/application");
const API_key = settings.open_weather_key

const cityEndpoint = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_key}`;

const getWeather = async (city, err) => {
    let apiResponse = await axios.get(cityEndpoint(city));

    return { ...apiResponse.data, 'source': 'API' }
};

const city = "Oakland";

(async () => {
    try {
        const t1 = new Date().getTime()
        const weather = await getWeather(city);
        const t2 = new Date().getTime()
        weather.responseTime = `${t1 - t2}ms`
        console.log(weather);
    } catch (err) {
        console.error("Error fetching weather:", err.message);
    }
})();

