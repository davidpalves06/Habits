const express = require("express")
require('dotenv').config();
const db = require("./db/conn")
const cors = require("cors")
const app = express()
const bodyparser = require('body-parser')
const Person = require("./models/Person")
const PersonRouter = require("./routes/PersonRoutes")
const LoginRouter = require("./routes/LoginRoutes")
const StreakJob = require("./jobs/checkStreakJob")

app.use(bodyparser.json())

app.use(cors())

app.use('/users',PersonRouter);

app.use("/auth",LoginRouter);

//start scheduler to check streaks
StreakJob.start();

app.listen(4000);