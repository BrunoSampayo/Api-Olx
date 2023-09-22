import express, {ErrorRequestHandler, Request,Response} from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors'
import { mongoConnect } from './database/mongo';
import router from './routes/api';
import passport from 'passport';


dotenv.config();

mongoConnect()
const server = express();

server.use(cors())

server.use(express.static(path.join(__dirname,'../public')));
server.use(express.urlencoded({extended:true}));

server.use(passport.initialize());


server.use(router)

//404 error
server.use((req:Request,res:Response)=>{
    res.status(404)
    res.json({error:'EndPoint nao encontrado'})
});


//Case Erro, error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if(err.status){
        res.status(err.status)
    }else{
        res.status(400)//Bad Request
    }
    if(err.message){
        res.json({error:err.message})
    }else{
        res.json({error:"Ocorreu algum erro"})
    }
    
   
}
server.use(errorHandler);


server.listen(process.env.PORT)