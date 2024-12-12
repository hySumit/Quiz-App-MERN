const mongoose = require('mongoose');
require('dotenv').config()

const database = async()=>{
    mongoose.connect(process.env.MONGO_URL)
}

module.exports = database;