const express = require("express");
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const todoRoutes = require('./routes/todoRoutes')
const app = express();
app.use(bodyParser.json());
app.use('/',userRoutes);
app.use('/',todoRoutes);
module.exports=app;