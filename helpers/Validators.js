const yup = require('yup');

let schemaTypes = {
    restaurant:yup.object().shape({
        price_range:yup.number().min(1).max(5),
        location:yup.string().required(),
        name:yup.string().required(),
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