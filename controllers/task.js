import ErrorHandler from "../middlewares/errorMiddleware.js";
import {Task} from "../models/task.js"
export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        await Task.create({ title, description, user: req.user });
    
        res.status(201).json({
            success: true,
            message: "Task added !"
        });     
    } catch (error) {
        next(error);
    }
}

export const allTask = async (req, res, next) => {
    try {
        
        const task = await Task.find({ user: req.user._id });

        res.status(200).json({
            success: true, 
            task
        })      
    } catch (error) {
        next(error);
    }
}
export const updateTask = async (req, res, next) => {

    try {
        const task = await Task.findById(req.params.id);

        if (!task) return next(new ErrorHandler("Task Not Found" , 404));
    
        task.completed = !task.completed;
        await task.save();
    
    
        res.status(200).json({
            success: true, 
            message : "Updated !"   
        })
    } catch (error) {
        next(error);
    }
}
export const deleteTask = async (req, res, next) => {
    
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
    
        if (!task) return next(new ErrorHandler("Task Not Found" , 404));
    
        await task.deleteOne();
    
    
        res.status(200).json({
            success: true, 
            message: "Deleted !"
        })
    } catch (error) {
        next(error);
    }
}

