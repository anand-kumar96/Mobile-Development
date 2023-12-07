const mongoose = require("mongoose")
const colors = require('colors')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
colors.enable();
//data base connection
const db_url = process.env.DATABASE_URL;
const db =mongoose.connect(db_url).then(()=>{
    console.log('Db connection successfully'.yellow.inverse)
}).catch((err)=>{
    throw err;
})
module.exports = db;
