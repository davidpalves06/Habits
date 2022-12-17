const express = require("express")
const Router = express.Router()
const verifyToken = require("../middleware/verifyToken")
const checkUser = require("../middleware/checkForUser")

const PersonController = require("../controllers/PersonController");

Router.use(verifyToken)

//User
Router.post('/',PersonController.addPerson);
Router.get("/",PersonController.getAllPerson);
Router.delete('/:id',checkUser,PersonController.deletePerson)
Router.put("/:id",checkUser,PersonController.updatePerson)


//Habitos
Router.post('/:id/habits',checkUser,PersonController.addHabit)
Router.put('/:id/habits',checkUser,PersonController.changeHabits)
Router.get('/:id/habits',checkUser,PersonController.getPersonHabit)
Router.delete("/:id/habits/:position",checkUser,PersonController.deletePersonHabit)
Router.put("/:id/habits/:position",checkUser,PersonController.changeHabit)

//Password
Router.put('/:id/password',checkUser,PersonController.changePassword)

module.exports = Router