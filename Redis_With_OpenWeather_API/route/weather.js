const router = require("express").Router();
const { getWeather } = require("../controller/weather");
const validateWeatherQuery = require("../middlewares/validation");

router.get("/weather",validateWeatherQuery, getWeather);

module.exports = router;
