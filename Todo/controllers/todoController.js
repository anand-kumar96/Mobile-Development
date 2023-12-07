const todoModel = require("../models/todoModel");
const { findTodo } = require("../services/todoServices");
const { updateTodoData } = require("../services/todoServices");
const { findAndDeleteTodo } = require("../services/todoServices");
const { createNewTodo } = require("../services/todoServices");

exports.createTodo = async(req,res,next)=>{
const {userId,title,description}= req.body;
try{
if(title.length<0 || description.length<0){
    throw new Error("please enter a valid title/description");
}
await createNewTodo(userId,title,description);
res.json({status:"success",message:"todo created successfully"})
}catch(err){
    throw err;
}
};

exports.deleteTodo = async(req,res,next)=>{
    const todoId = req.params.id;
    try{
     const todo = await findAndDeleteTodo(todoId);
     if(!todo){
        throw new Error("No todo found")
     }
        res.json({status:"success",message:"todo deleted"})
     
    }catch(err){
        throw err;
    }
}
exports.updateTodo = async(req,res,next)=>{
    const todoId = req.params.id;
    let {title,description} = req.body;
    try{
     const todo = await findTodo(todoId);
    //  console.log(todo)
     if(!todo){
        throw new Error("no todo found!!")
     }
     if(!title){
        title=todo.title;
     }
     if(!description) description=todo.description;
     await updateTodoData(todo.userId,title,description)
     res.json({status:"success",message:"todo updated"})
    }catch(err){
        throw err;
    }
}
exports.getAllTodo = async(req,res,next)=>{
    try{
        const allTodo = await todoModel.find();
        res.json({status:"success",length:allTodo.length, data:allTodo});
    }catch(err){
        throw err;
    }
}
exports.getTodo = async(req,res,next)=>{
    try{
        const userId = req.params.id;
        const todo = await todoModel.find({userId}).select("-userId");
        res.json({status:"success", data:todo});
    }catch(err){
        throw err;
    }
}