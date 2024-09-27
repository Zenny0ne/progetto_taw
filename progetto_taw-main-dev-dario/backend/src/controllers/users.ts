import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import user from "../models/user";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req,res, next) =>{
    try{
        const user = await UserModel.findById(req.session.userId).select("+email").exec();
        res.status(200).json(user);
    }catch(error){
        next(error);
    }
}

interface SignUpBody {
    username?: string,
    email?: string,
    password: string,
    address?: string,
    role?: string,
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req,res,next) =>{
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;
    const address = req.body.address;

    try {
        if (!username || !email || !passwordRaw || !address) {
            throw createHttpError(400, "All fields are required");
        }

        const existingUsername = await UserModel.findOne({ username }).exec();
        if (existingUsername) {
            throw createHttpError(409, "Username already exists");
        }

        const existingEmail = await UserModel.findOne({ email }).exec();
        if (existingEmail) {
            throw createHttpError(409, "Email already exists");
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed,
            address: address,
            role: "student",
        });

        req.session.userId = newUser._id;

        res.status(201).json({ message: "User created", user: newUser });

    } catch (error) {
        console.error('Error creating user:', error); // Log the error
        next(error);
    }
}

interface LoginBody{
    email?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) =>{
    const { email, password } = req.body;

    try {
        // Check if both username and password are provided
        if (!email || !password) {
            throw createHttpError(400, "Username and password are required");
        }

        // Find the user by username and select password and email
        const user = await UserModel.findOne({ email }).select("+password +username").exec();
         
        console.log(user)
        // If the user does not exist, return an error
        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If the password does not match, return an error
        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        // Store the user ID in the session
        req.session.userId = user._id;

        // Respond with user information (excluding password)
        
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
        });

    } catch (error) {
        next(error); // Pass any error to the next middleware
    }
};

export const logout: RequestHandler = (req, res, next) =>{
    req.session.destroy(error =>{
        if(error){
            next(error);
        }else{
            res.sendStatus(200);
        }
    })
};