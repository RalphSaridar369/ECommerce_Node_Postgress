const yup = require('yup');

let schemaTypes = {
    signup:yup.object().shape({
        userType:yup.number().min(1).max(3),
        password:yup.string().min(8).required(),
        email:yup.string().email().required(),
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