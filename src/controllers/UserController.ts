import State from "../models/State"
import { Request,Response } from "express"


export const getStates = async (req:Request,res:Response)=>{
    let states = await State.find();
    res.json({states})
}

export const info =async (req:Request,res:Response)=>{

}

export const editAction = async (req:Request,res:Response)=>{

}

