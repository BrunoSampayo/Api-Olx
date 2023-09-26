import {unlink} from 'fs/promises'
import { Request, Response } from "express";
import Category from "../models/Category"
import Ad, { AdType } from "../models/Ad";
import { UserType } from "../models/User";
import sharp from "sharp";


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

 const uploadFile = async (file: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[]; } | undefined)=>{
    if(file){
        const files= file as Express.Multer.File[]
        console.log(files)
        let filesPath =[]
        for(let i in files) {
            const file = files[i] ;
           
            await sharp(file.path).resize(500).toFormat('jpeg').toFile(`./public/media/${file.filename}.jpg`);
            await unlink(file.path)
            filesPath.push(file.filename+'.jpg');
            
        }
        
        return filesPath+'.jpg'
        
    }else{
        new Error("Upload file error")
    }
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
    newAd.priceNegotiable = priceNegotiable==='true' ? true : false;
    newAd.description = description;
    newAd.views=0
    
    if(req.files as  Express.Multer.File[] ){
       let url= await  uploadFile(req.files)

       if(url){
            if(url.length > 1){
                for(let i = 0; i < url.length; i++){
                    i ===0 ? newAd.images.push({url:url[i],default:true}) : newAd.images.push({url:url[i],default:false})
                     
                }
            }else{
                //One file Upload
                newAd.images.push({url:url[0],default:true})
            } 
       }
    }

    const info = await newAd.save();
    
    res.json({id:info._id})

}

export const getList = async(req:Request,res:Response)=>{
   let {sort='asc',offset=0,limit=8,q,cat,state} =  req.query;

   const adsData:AdType[] = await Ad.find({status:true}).exec();
   let ads = [];
   for(let i in adsData) {
        let image;

        let defaulImage = adsData[i].images.find(image => image.default);
        if(defaulImage){
            image = `${process.env.BASE}/media/${defaulImage.url}`;
        }else{
            image = `${process.env.BASE}/media/default.jpg`;
        }



        ads.push({
            id:adsData[i]._id,
            title:adsData[i].title,
            price:adsData[i].price,
            priceNegotiable:adsData[i].priceNegotiable,
            image
            
        });
    }
    res.json({ads})
}

export const getItem = async(req:Request,res:Response)=>{

}

export const editAction = async(req:Request,res:Response)=>{
    
}