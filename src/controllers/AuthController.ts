import {validationResult,matchedData} from 'express-validator';
import { Response, Request } from 'express';

export const signIn = ()=>{

}

export const signUp = (req:Request,res:Response)=>{
    const erros = validationResult(req);
    if(!erros.isEmpty()){
        res.json({error:erros})
    }
}