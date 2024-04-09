import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/functions.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";


export const toGetAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
    
        res.json({
            success: true,
            users
        });
    } catch (error) {
        next(error); 
    }
};


export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
    
        if (user) return next(new ErrorHandler("User Already Exist" , 400));
        
    
        const hashedpassword = await bcrypt.hash(password, 10);
    
        user = await User.create({
            name,
            email,
            password: hashedpassword 
        });
    
        sendCookie(user , res, "Registered Successfully" , 201);
    } catch (error) {
        // next(error);
    }
};

export const login = async (req, res, next) => {

    try {
        const {email, password } = req.body;

        let user = await User.findOne({ email }).select("+password");

        if (!user) return next(new ErrorHandler("User Does Not Exist , Register First !" , 400));

        const isMatched = await bcrypt.compare(password, user.password)

        if (!isMatched) return next(new ErrorHandler("Invalid Email or Password" , 404));

        sendCookie(user, res, `Login Successfully ! Welcome back ${user.name}`, 200);
    } catch (error) {
        next(error);
    }

};


export const GetMyDetails = (req, res) => {
    
    res.json({
        success: true,
        user : req.user,
    })
};



export const deleteUser = async (req, res, next) => {
    try {
        await User.deleteOne(req.user);
        res.status(200).cookie("token", "", {expires: new Date(Date.now())}).json({
            success: true,
            message : "User Deleted"
        })
    } catch (error) {
       next(error);
    }
};

export const logout = (req, res) => {
    

    res.status(200).cookie("token", "", {expires: new Date(Date.now())}).json({
        success: true,
        message:"User Logout"
    })
};
