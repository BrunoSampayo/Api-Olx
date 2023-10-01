
import {unlink} from 'fs/promises'
import { Request, Response } from "express";
import Category from "../models/Category"
import Ad, { AdType } from "../models/Ad";
import User, { UserType } from "../models/User";
import sharp from "sharp";
import State, { StateType } from '../models/State';
import { isValidObjectId } from 'mongoose';
import { Console } from 'console';

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
        
        let filesPath =[]
        for(let i in files) {
            const file = files[i] ;
           
            await sharp(file.path).resize(500).toFormat('jpeg').toFile(`./public/media/${file.filename}.jpg`);
            await unlink(file.path)
            filesPath.push(file.filename+'.jpg');
            
        }
        
        return filesPath
        
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
   let filters:any = {status:true};
   let total = 0;

   if(q){
       filters.title = new RegExp(q as string,'i');
    }

   if(cat){
        const c = await Category.findOne({slug:cat}).exec();
        if(c){
            filters.category = c._id.toString();
        }
    }
    if(state){
        let _state = state as string
        const s = await State.findOne({name:_state.toUpperCase()}).exec();
        if(s){
            filters.state = s._id.toString();
        }
    }
   
    const adsTotal = await Ad.find(filters).exec();
    total = adsTotal.length
   const adsData:AdType[] = await Ad.find(filters)
   .sort({dateCreated:(sort==='desc'?-1:1)})
   .skip(parseInt(offset as string))
   .limit(parseInt(limit as string))
   .exec();
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
    res.json({ads, total})
}

export const getItem = async(req:Request,res:Response)=>{
    let {id, other=null} = req.query;

    if(!id){
        res.json({error:'Sem produto'});
        return;
    }
    if(isValidObjectId(id)){
            const ad = await Ad.findById(id);
        if(!ad){
            res.json({error:'Produto não encontrado'});
            return;
        }
        ad.views++;
        await ad.save();

        let images = [];
        for (let i in ad.images){
            images.push(`${process.env.BASE}/media/${ad.images[i].url}`);
        }

        let category = await Category.findById(ad.category).exec();
        let userInfo = await User.findById(ad.idUser) as UserType;
        let stateInfo = await State.findById(ad.state).exec() as StateType;

        let others=[];
        if(other){  
            const otherData = await Ad.find({status:true, idUser:ad.idUser}).exec()
            for(let i in otherData) {
                if(otherData[i]._id.toString() != ad._id.toString()) {
                    let image = `${process.env.BASE}/media/default.jpg`;

                    let defaultImage = otherData[i].images.find(e=>e.default);
                    if(defaultImage){
                        image = `${process.env.BASE}/media/${defaultImage.url}`;
                    }
                    others.push({
                        id:otherData[i]._id,
                        title:otherData[i].title,
                        price:otherData[i].price,
                        priceNegotiable:otherData[i].priceNegotiable,
                        image
                    })
                }
            }
        }
        res.json({
            id:ad._id,
            title:ad.title,
            price:ad.price,
            priceNegotiable:ad.priceNegotiable,
            description:ad.description,
            dateCreated:ad.dateCreated,
            views:ad.views,
            image:images,
            category,
            userInfo:{
                name:userInfo.name,
                email:userInfo.email,
                
            },
            stateName:stateInfo.name,
            others

            
        })
    }else{
        res.json({error:'Id inválido'});
        return
    }
}

export const editAction = async(req:Request,res:Response)=>{
    const user = req.user as UserType;
    
    let {id} =req.params;
    console.log(id)
    let {title,status,price,priceneg,desc,cat}= req.body;
    if(!isValidObjectId(id)){
        res.json({error:'Id inválido'});
        return;
    }

    const ad = await Ad.findById(id).exec();

    if(!ad){
        res.json({error:'Anúncio inexistente'})
        return;
    }
    if(user._id.toString() !==ad.idUser){
        res.json({error:"Anuncio nao pertence a este usuario"})
        return
    }

    let updates:Partial<AdType> ={};

    if(title){
        updates.title= title
    }
    if(price){
        price = price.replace('.','').replace(',','.').replace('R$','');
        price=parseFloat(price)
        updates.price=price;
    }
    if(priceneg){
        updates.priceNegotiable=priceneg;
    }
    if(status){
        updates.status=status;
    }
    if(desc){
        updates.description=desc;
    }
    if(cat){
        const category = await Category.findOne({slug:cat}).exec();
        if(!category){
            res.json({error:"Categoria inexistente"});
            return;
        }
        updates.category = category._id.toString();
    }

    

    if(req.files as  Express.Multer.File[] ){
        updates.images=ad.images
        
        let url= await  uploadFile(req.files)
        console.log(url)
        if(url){
                if(url.length > 1){
                    for(let i = 0; i < url.length; i++){
                       updates.images.push({url:url[i],default:false})
                       
                        
                    }
                }else{
                   // One file Upload
                    updates.images.push({url:url[0],default:false})
                } 
        }
    }
    
    
    await Ad.findByIdAndUpdate(id,{$set: updates})

    res.json({error:''})

}