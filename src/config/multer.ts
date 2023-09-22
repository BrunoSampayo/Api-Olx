import multer from "multer";
import { v4 as uuidv4 } from 'uuid';


const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'./tmp/images')
    },
    filename(req, file, callback) {
        callback(null, uuidv4())
    }, 
    
});

const uploadConfig = multer({
   storage: multerStorage,
   fileFilter:(req,file,cb) =>{

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||file.mimetype === 'image/jpg'){
        cb(null, true)
    }else{
        cb(new Error('Invalid file type'))
    }
   }
})

export default uploadConfig;