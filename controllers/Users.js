const { SendEmail } = require("../helpers/SendEmail");
const messages = require('../helpers/Messages');
const { formValidator } = require("../helpers/Validators");
const db = require('../db');
const { isUnique } = require("../helpers/checkUnique");
const { hashString } = require("../helpers/hashString");

const userLogin = async (req, res) => {
  const result = "This is the query here"
  console.log("User Login Functionality");
  let { user_id, email } = req.body;

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

const userSignup = async (req, res) => {
  const checkForm = await formValidator('signup', req.body);
  if (checkForm.length > 0) {
    res.status(400).json({
      status: messages[400],
      error: checkForm
    })
  }
  else {
    //checking if email exists
    if(!await isUnique('SELECT COUNT("email") FROM "Users" WHERE "email" = $1', [req.body.email])){
      res.status(403).json({
        status:messages[403],
        message:"Email already exists"
      })
    }
    else{
      let password = hashString(req.body.password);
      console.log("password: ",password)
      try {
        await db.query('INSERT INTO "Users" ("email", "password", "userType") VALUES ($1, $2, $3)', [
          req.body.email,
          req.body.password,
          req.body.userType
        ]);
        res.status(200).json({
          status:messages[200],
        })
      }
      catch (error) {
        console.log(error)
        res.status(500).json({
          status: messages[500]
        })
      }
    }
  }
}

const userForgotPassword = (req, res) => {
  let { email } = req.body
  try {
    res.status(200).json({
      status: messages[200],
      message: `email sent to ${email}`,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: messages[500]
    })
  }

}

const userUploadImage = (req, res) => {
  console.log(req.file)
}

module.exports = {
  userLogin,
  userForgotPassword,
  userUploadImage,
  userSignup
}