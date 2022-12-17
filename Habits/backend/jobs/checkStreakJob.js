const cron = require("node-cron")
const Person = require("../models/Person")

const job = cron.schedule("0 0 0 * * *",async () => {
    console.log("Job a correr!")
    const allPerson = await Person.find();
    allPerson.forEach((person) => {
        person.habits.forEach((habit) => {
            if (habit.done) {
                habit.habitStreak +=1;
                habit.done = false
            }
            else {
                habit.habitStreak = 0;
            }
        })
        person.markModified("habits")
        person.save();
    })
    console.log("Job terminado!")
},{
    scheduled:false
})


module.exports = job

