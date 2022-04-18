const yup = require('yup');

let schemaTypes = {
    signup:yup.object().shape({
        userType:yup.number().min(1).max(3),
        password:yup.string().min(8).required(),
        email:yup.string().email().required(),
    }),

    login:yup.object().shape({
        password:yup.string().min(8).required(),
        email:yup.string().email().required(),
    }),

    forgotPost:yup.object().shape({
        email:yup.string().email().required()
    }),

    verifyForgot:yup.object().shape({
        code:yup.string().required(),
        email:yup.string().email().required()
    }),

    resetPass:yup.object().shape({
        password:yup.string().required(),
        email:yup.string().email().required()
    })
}

const formValidator = async(type,data) =>{
    
    const validationResult =  await schemaTypes[type]
    .validate(data,{abortEarly:'false'})
    .catch((err)=>{
        return err
    })
    let error = (validationResult+"").split(": ")[1]
    if(error){
        return error
    }
    return ""
}

module.exports ={
    formValidator
}