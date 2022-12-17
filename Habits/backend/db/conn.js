const mongoose = require("mongoose")

async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Conectou ao mongoDB')
}

main().catch((err) => console.log(err))

module.exports = mongoose