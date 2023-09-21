import { Request, Response } from "express";
import Category from "../models/Category"
import Ad from "../models/Ad";
import { UserType } from "../models/User";


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

export const addAction = async(req:Request,res:Response) =>{
    let {title, price, priceNegotiable, description, cat: category} = req.body;
    const user = req.user as UserType;
    

    if(!title || !category){
        return res.status(400).json({error:"Titulo e/ou categoria não foram fornecidos"});
    }
    if(price){
        price = price.replace('.','').replace(',','.').replace('R$','');
        price=parseFloat(price)
    }else{
        price=0
    }
    const newAd = new Ad();
    newAd.status =true;
    newAd.idUser = user._id;
    newAd.state= user.state;
    newAd.dateCreated = new Date();
    newAd.title = title;
    newAd.category= category;
    newAd.price = price;
    newAd.priceNegotiable = priceNegotiable(priceNegotiable==='true') ? true : false;
    newAd.description = description;
    newAd.views=0

    //if(req.files  && req.files.img){

    //}

    const info = await newAd.save();
    res.json({id:info._id})

}

export const getList = async()=>{

}

export const getItem = async()=>{

}

export const editAction = async()=>{
    
}