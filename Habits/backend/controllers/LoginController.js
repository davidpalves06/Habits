const Person = require('../models/Person')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

module.exports = class LoginController {
    static async login(req,res) {
        const {email,password} = req.body;

        if (!email || !password) {
            res.status(400).json({
                message:"Pedido mal formado!"
            });
            return
        }

        const user = await Person.findOne({email:email}).lean()
        if (user) {
            if (!bcrypt.compareSync(password,user.password)) {
                res.status(401).json({
                    message:"Password não corresponde à do usuário!"
                })
                return
            }
            const token = jwt.sign({
                id : user._id,
                email
            },process.env.TOKEN_KEY,
            {
                expiresIn:"2h"
            });
            user.token = token;
            res.status(200).json({uid:user._id,token:user.token,name:user.name});
        }
        else {
            res.status(404).json({message:"Email não existente!"})
        }

        return
    }

    static async signup(req,res) {
        const {name,email,password,confirmpassword} = req.body;

        if (!name || !email || !password || !confirmpassword) {
            res.status(400).send("Pedido mal formado!");
            return
        }

        if (password !== confirmpassword) {
            res.status(400).json({
                message:"Passwords Incompativeis"
            });
            return
        }

        const person = await Person.findOne({email:email})

        if (person) {
            res.status(400).json({
                message:"Email já ocupado!"
            });
            return
        }

        const salt = 12
        const encrypted = await bcrypt.hash(password,salt);
        const newPerson = new Person({name,email,password:encrypted,habits:[]})

        const savedPerson = await newPerson.save();
        res.status(201).json({
            message:"User criado"
        });
    }
}