import {validationResult,matchedData} from 'express-validator';
import { Response, Request } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import User from '../models/User';
import State from '../models/State';
import { generateToken } from '../config/passport';
import CryptoJS from 'crypto-js';


///Login method
export const signIn = async(req:Request,res:Response)=>{
    //error verification
    const erros  = validationResult(req)
    if(!erros.isEmpty()){
        res.json(erros);
        return;
    }
    const {email,password} = matchedData(req);
    
    //get user from email and after compare password
    const user = await User.findOne({email});
    if(!user){
        res.status(401).json({error:'E-mail e/ou senha errados!'});
        return;
    }
    const isMatch = await bcrypt.compare(password,user.hash_password);

    if(!isMatch){
        res.status(401).json({error:'E-mail e/ou senha errados!'});
        return;
    }
    const TokenData = (email+"$"+password)
    const TokenHash = CryptoJS.AES.encrypt(TokenData,process.env.CRYPTO_SECRET as string).toString()
    
    const token = generateToken({TokenHash});

    user.token = token;
    await user.save();
    
    res.status(200).json({token, email});



}

export const signUp = async(req:Request,res:Response)=>{
    const erros = validationResult(req);
    if(!erros.isEmpty()){
        res.json({error:erros})
        return;
    }
    const data = matchedData(req)
    
    //email verification
    const user = await User.findOne({
        email:data.email
    });
    if(user){
        res.json({
            error: {email:{msg: 'E-mail já cadastrado'}}
        })
        return
    }

    //state verification
    if(mongoose.Types.ObjectId.isValid(data.state)){

    
        const stateItem = await State.findById(data.state)
        if(!stateItem){
            res.json({
                error: {email:{msg: 'Estado não existe'}}
            })
            return
        }
    }else{
        res.json({
            error: {email:{msg: 'Codigo de estado invalido'}}
        }) 
        return
    }
    const salt = bcrypt.genSaltSync(10)
    
    const passwordHash = bcrypt.hashSync(data.password,salt)


    const TokenData = (data.email+"$"+data.password)
    const TokenHash = CryptoJS.AES.encrypt(TokenData,process.env.CRYPTO_SECRET as string).toString()
    const token = generateToken({TokenHash}); 
   
    const newUser = new User ({
        name:data.name,
        email:data.email,
        hash_password:passwordHash,
        token,
        state:data.state
    });
    await newUser.save();

    res.status(201).json({token})
    

}