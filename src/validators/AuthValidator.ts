import { checkSchema} from "express-validator";



export const Validator ={
    signUp: checkSchema({
        name:{
            trim:true,
            isLength:{
                options:{min:2}
            },
            errorMessage: 'Nome  precisa ter pelo menos 2 caracteres'
        },
        email:{
            isEmail:true,
            normalizeEmail:true,
            errorMessage:'E-mail invalido'
        },
        password:{
            isLength:{
                options:{min:2}
            },
            errorMessage:'Senha precisa ter pelo menos 2 caracteres'
        },
        state:{
            notEmpty:true,
            errorMessage:'Estado não preenchido'
        }
        
    }),
    signIn:checkSchema({
        email:{
            isEmail:true,
            normalizeEmail:true,
            errorMessage:'E-mail invalido'
        },
        password:{
            isLength:{
                options:{min:2}
            },
            errorMessage:'Senha precisa ter pelo menos 2 caracteres'
        }
        
    })
}