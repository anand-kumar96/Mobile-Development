const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    //store user id
userId:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required: [true, 'Todo must belong to a user']
},
title:{
    type:String,
    required:true,
},
description:{
    type:String,
    required:true
}
})
const todoModel  = mongoose.model('todo',todoSchema);
module.exports = todoModel;