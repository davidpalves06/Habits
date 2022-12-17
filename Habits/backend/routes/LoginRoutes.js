const express = require("express")
const Router = express.Router()
const LoginController = require("../controllers/LoginController");

Router.post("/login",LoginController.login)
Router.post("/signup",LoginController.signup)

module.exports = Router