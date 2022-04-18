const { SendEmail } = require("../helpers/SendEmail");
const messages = require('../helpers/Messages');

const userLogin = async(req,res)=>{
    const result = "This is the query here"
    console.log("User Login Functionality");
    let {user_id,email} = req.body;

    const token = jwt.sign(
        { user_id: user_id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

    result.token = token;
    
    res.status(201).json(result);
}

const addSubUser = async(req,res)=>{
    console.log("User Add Sub User")
}

const userForgotPassword =(req,res)=>{
  let {email} = req.body
  try {
    SendEmail('te66949@gmail.com',email,'test mail','test');
    res.status(200).json({
      status:messages[200],
      message:`email sent to ${email}`,
    })  
  } catch (error) {
    res.status(500).json({
      status:messages[500]
    })
  }
  
}

module.exports = {
    userLogin,
    addSubUser,
    userForgotPassword
}