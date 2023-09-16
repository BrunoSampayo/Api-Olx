import passport from "passport";
import dotenv from 'dotenv';
import {Strategy as JWTStrategy, ExtractJwt, StrategyOptions} from 'passport-jwt';
import { Response, Request,NextFunction} from 'express';
import jwt from 'jsonwebtoken';

import User from "../models/User";

dotenv.config();

const notAuthorizedJson = {status:401, message:"Não autorizado"}
const options:StrategyOptions ={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}


passport.use(new JWTStrategy(options,async (payload,done) => {
    const user = await User.findOne({hash_password:payload.password});
    if(user){
        return done(null,user);

    }else{
        return done(notAuthorizedJson,false);
    }
}));

export const generateToken = (data:object)=>{
    return jwt.sign(data,process.env.JWT_SECRET as string)
}

export const privateRoute = (req:Request, res:Response,next:NextFunction) => {
    passport.authenticate('jwt',(err:Error,user:any)=>{
        req.user=user;
        return user? next(): next(notAuthorizedJson)
    }) (req,res,next);
}




export default passport