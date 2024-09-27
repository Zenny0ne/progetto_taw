import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requiredAuth: RequestHandler = (req, res, next) =>{
    if(req.session.userId){
        next();
        res.send('Utente loggato')
    }else{
        res.send('Utente non loggato')
    }
};