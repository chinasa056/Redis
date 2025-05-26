require("dotenv").config();
require("./utils/redis")
const express = require("express");
const { settings } = require("./settings/application");
const PORT = settings.port;

const app = express()
app.use(express.json())

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    
})

