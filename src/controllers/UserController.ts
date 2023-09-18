import State from "../models/State"
import User, { UserType } from "../models/User";
import Category from "../models/Category";
import Ad from "../models/Ad";
import { Request,Response } from "express"
import {validationResult,matchedData} from 'express-validator';



export const getStates = async (req:Request,res:Response)=>{
    let states = await State.find();
    res.json({states})
}

export const info =async (req:Request,res:Response)=>{
    const user:any = req.user;

    if(user !== undefined) {
        const state = await State.findById(user.state);
        const ads = await Ad.find({idUser: user._id.toString()});
        if(state && ads){
            let adList =[]
            
            for(let i in ads){
                const cat = await Category.findById(ads[i].category)
               
                adList.push({
                    id:ads[i]._id,
                    status:ads[i].status,
                    images:ads[i].images,
                    dateCreated:ads[i].dateCreated,
                    title:ads[i].title,
                    price:ads[i].price,
                    priceNegotiable:ads[i].priceNegotiable,
                    description:ads[i].description,
                    views:ads[i].views,
                    category: cat?.slug
                })
            }

            res.json({
                name:user.name,
                email:user.email,
                state:state.name,
                ads:adList,
                
                
            })
        }
    }
}

export const editAction = async (req:Request,res:Response)=>{
    const erros  = validationResult(req)
  
    if(!erros.isEmpty()){
        res.json(erros);
        return;
    }
    const data = matchedData(req);
    const user:any = req.user;

    let updates:Partial<UserType>={};

    if(data.name){
        updates.name = data.name;
    }

    if(data.email){
        const emailCheck = await User.findOne({ email:data.email})
        if(emailCheck){
            res.json({error:"E-mail ja existe!"})
        }

    }

    if(user){
        await User.findOneAndUpdate({token:user.token},{$set:updates})
        
    }
    
    
    res.json({})
}

