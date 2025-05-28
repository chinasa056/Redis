require("dotenv").config();
require("./utils/redis")
const express = require("express");
const { settings } = require("./settings/application");
const weatherRoutes = require("./route/weather");
const PORT = settings.port;

const app = express()
app.use(express.json())
app.use("/api", weatherRoutes); // e.g., /api/weather?city=oakland

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    
})
