const Person = require("../models/Person")
const bcrypt = require("bcrypt")

module.exports = class PersonController {
    static async addPerson(req,res) {
        const {name,email,password} = req.body
        if (!name || !email || !bio || !password) {
            res.status(421).send("Pedido mal formado!")
            return 
        }
        const person = new Person({name,email,password,habits:[]});
        const saved = await person.save();

        res.status(200).json(saved);
    }

    static async getAllPerson(req,res) {
        const people = await Person.find();

        res.status(200).json(people);
    }

    static async deletePerson(req,res) {
        const person = await Person.findById(req.params.id)

        const deleted = await person.delete();

        res.status(200).json(deleted);
    }
    
    static async updatePerson(req,res) {
        const {name,email,bio} = req.body
        const person = await Person.findById(req.params.id)
        
        if (name) person.name = name
        if (email) person.email = email
        if (bio) person.bio = bio

        const updated = await person.save()

        res.status(200).json(updated)
    }

    static async addHabit(req,res) {
        const person = await Person.findById(req.params.id)

        const habit = {
            habitName: req.body.habit,
            habitStreak:0,
            done:false,
            score:"=",
            position: person.habits.length
        };
        person.habits.push(habit)

        const updated = await person.save();

        res.status(201).json(updated.habits)
    }

    static async getPersonHabit(req,res) {
        const person = await Person.findById(req.params.id)

        res.status(200).json(person.habits);
    }

    static async deletePersonHabit(req,res) {
        const position = req.params.position
        const person = await Person.findById(req.params.id)
    
        person.habits = person.habits.filter((elem) => { return elem.position != position});
        person.habits.forEach((elem) => {
            if (elem.position > position) elem.position--;
        })

        const deleted = await person.save()
    
        res.status(200).json(deleted.habits);
    }
    
    static async changeHabit (req,res) {
        const position = req.params.position
        const person = await Person.findById(req.params.id)
        const {done,score} = req.body
        
        if (done != null) person.habits[position].done = done
        if (score) person.habits[position].score = score
        
        person.markModified("habits")
        try {
            const updated = await person.save();
            res.status(200).json(updated.habits[position]);
        }
        catch (err) {
            console.log(err)
        }
    }

    static async changeHabits (req,res) {
        const person = await Person.findById(req.params.id)
        const {habits} = req.body
        console.log(habits)
        person.habits = habits
        
        try {
            const updated = await person.save();
            res.status(200).json(updated);
        }
        catch (err) {
            console.log(err)
        }
    }

    static async changePassword(req,res) {
        const person = await Person.findById(req.params.id)
        const {oldPassword,newPassword,confirmPassword} = req.body

        if (newPassword !== confirmPassword) {
            res.status(420).json({message:"As palavras-passe não são iguais"})
            return
        }

        if (!bcrypt.compareSync(oldPassword,person.password)) {
            res.status(420).json({message:"A palavra antiga não corresponde à dada!"})
            return
        }

        const encrypted = bcrypt.hashSync(newPassword,12);

        person.password = encrypted;

        const updatedPassword = await person.save()

        res.status(200).json(updatedPassword)
    }
}