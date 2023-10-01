import { connect,disconnect } from "mongoose";
import dotenv from 'dotenv';


dotenv.config();

export const mongoConnect = async ()=>{
    try{
        console.log('Conectando ao MongoDB')
        await connect(process.env.MONGO_URL as string);
        console.log("MongoDB conectado com sucesso");
        console.log(`Servidor rodando em ${process.env.BASE}`)

    }catch(error){
        console.log("Erro conexão MongoDB",error)
    }
}

