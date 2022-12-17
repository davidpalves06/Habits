const mongoose = require("../db/conn")
const {Schema, SchemaTypes} = require("mongoose")

const PersonSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    habits: [Object]
})

const Person = mongoose.model('Person',PersonSchema);

module.exports = Person