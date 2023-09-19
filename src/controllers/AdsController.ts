import { Request, Response } from "express";
import Category from "../models/Category"

export const getCategories = async(req:Request,res:Response)=>{
    const cats = await Category.find().lean();

    let categories = [];

    for(let i in cats) {
        categories.push({
            ...cats[i],
            img:`${process.env.BASE}/assets/images/${cats[i].slug}.png`
        });
    }

    res.json({categories})

}

export const addAction = async() =>{

}

export const getList = async()=>{

}

export const getItem = async()=>{

}

export const editAction = async()=>{
    
}