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

module.exports = {
    userLogin,
    addSubUser
}