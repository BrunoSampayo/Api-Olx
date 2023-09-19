import passport from "passport";
import dotenv from 'dotenv';

import {Strategy as JWTStrategy, ExtractJwt, StrategyOptions} from 'passport-jwt';
import { Response, Request,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';



import User, { UserType } from "../models/User";

dotenv.config();

const notAuthorizedJson = {status:401, message:"Não autorizado"}
//Options from passport, receive the token from auth header Bearer
const options:StrategyOptions ={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}

//payload receive 
passport.use(new JWTStrategy(options,async (payload,done) => {
    let DataPayload = payload.TokenHash
    try {
        DataPayload = CryptoJS.AES.decrypt(payload.TokenHash, process.env.CRYPTO_SECRET as string).toString(CryptoJS.enc.Utf8);
        console.log({ DataPayload });
      } catch (error) {
        console.error('Erro ao descriptografar:', error);
      }
     let data = DataPayload.split('$')
     
    const user = await User.findOne({email:data[0]})
    
    if(user){
        return done(null,user);
    }
    return done(notAuthorizedJson,false);
    
}));

export const generateToken = (data:object)=>{
    return jwt.sign(data,process.env.JWT_SECRET as string)
}

//if receive user next from auth passed route
//if not go to errorhandler
export const privateRoute = (req:Request, res:Response,next:NextFunction) => {
    passport.authenticate('jwt',(err:Error,user:UserType)=>{
        
        req.user=user;
        return user? next(): next(notAuthorizedJson);
    }) (req,res,next);
}




export default passport