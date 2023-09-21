import { Schema, model, connection, Model } from "mongoose";

type AdType = {
    idUser:string,
    state:string,
    category:string,
    images:Object[],
    dateCreated:Date,
    title:String,
    price:number,
    priceNegotiable:boolean,
    description:string,
    status:boolean,
    views:number

    
  
}

const schema = new Schema<AdType>({
    idUser:{ type:String, required:true},
    state:{ type:String, required:true},
    category:{ type:String, required:true},
    images:{ type:[Object], required:true},
    dateCreated:{ type:Date, required:true},
    title:{ type:String, required:true},
    price:{ type:Number, required:true},
    priceNegotiable:{ type:Boolean, required:true},
    description:{ type:String, required:false},
    status:{ type:Boolean, required:true},
    views:{ type:Number, required:true}
   
    
})

const modelName:string = 'Ad';

export default (connection && connection.models[modelName]) ?
    connection.models[modelName] as Model<AdType>
:
    model<AdType>(modelName,schema)