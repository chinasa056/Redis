require("dotenv").config()
exports.settings = {
    port: process.env.PORT,
    open_weather_key: process.env.OPEN_WEATHER_API_KEY,
    // mongodb: process.env.MONGODB_URI,
    // paystack_secret: process.env.PAYSTACK_SECRET_KEY,
    // duration: process.env.TRANSACTION_KEY_DURATION,
    redis: {
        client_username: process.env.REDIS_CLIENT_USERNAME,
        client_password: process.env.REDIS_CLIENT_PASSWORD,
        cient_host: process.env.REDIS_CLIENT_HOST,
        client_port: process.env.REDIS_CLIENT_PORT
    }
};
