
import { checkSchema} from "express-validator";



export const UserValidator ={
    editAction: checkSchema({
        
        name:{
           
            trim:true,
            isLength:{
                options:{min:2}
            },
            errorMessage: 'Nome  precisa ter pelo menos 2 caracteres'
        },
        email:{
            optional: true,
            isEmail:true,
            normalizeEmail:true,
            errorMessage:'E-mail invalido'
        },
        password:{
            optional: true,
            isLength:{
                options:{min:2}
            },
            errorMessage:'Senha precisa ter pelo menos 2 caracteres'
        },
        state:{
            optional: true,
            notEmpty:true,
            errorMessage:'Estado não preenchido'
        }
        
    })
}