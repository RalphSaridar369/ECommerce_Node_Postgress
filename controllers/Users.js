const messages = require('../helpers/Messages');
const db = require('../db');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const randomstring = require('randomstring')
const { SendEmail } = require("../helpers/SendEmail");
const { formValidator } = require("../helpers/Validators");
const { isUnique } = require("../helpers/checkUnique");

const userLogin = async (req, res) => {

  const checkForm = await formValidator('login', req.body);
  if (checkForm.length > 0) {
    res.status(400).json({
      status: messages[400],
      error: checkForm
    })
  }
  else {
    const userQuery = await db.query('SELECT * FROM "Users" WHERE "email" = $1', [
      req.body.email
    ])
    if (userQuery.rowCount < 1) {
      res.status(403).json({
        status: messages[403],
        message: "Email doesn't exist",
      })
    }
    else {
      let {id,email,userType} = userQuery.rows[0];
      bcrypt.compare(req.body.password, userQuery.rows[0].password, function (err, result) {
        if (!result) {
          res.status(403).json({
            status: messages[403],
            message: "Incorrect password",
          })
        }
        else {

          const token = jwt.sign(
            { id,email,userType },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );

          userQuery.rows[0].token = token;
          delete userQuery.rows[0].password;

          res.status(201).json({
            status:messages[200],
            data:userQuery.rows[0]
          });
        }
      });
    }
  }
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
    if (!await isUnique('SELECT COUNT("email") FROM "Users" WHERE "email" = $1', [req.body.email])) {
      res.status(403).json({
        status: messages[403],
        message: "Email already exists"
      })
    }
    else {
      try {
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(req.body.password, salt, async function (err, hash) {
            await db.query('INSERT INTO "Users" ("email", "password", "userType") VALUES ($1, $2, $3)', [
              req.body.email,
              hash,
              req.body.userType
            ]);
            res.status(200).json({
              status: messages[200],
            })
          });
        });
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

const userForgotPassword = async(req, res) => {
  
  const checkForm = await formValidator('forgotPost', req.body);
  if (checkForm.length > 0) {
    res.status(400).json({
      status: messages[400],
      error: checkForm
    })
  }
  else{
    
    const userQuery = await db.query('SELECT * FROM "Users" WHERE "email" = $1', [
      req.body.email
    ])
    if (userQuery.rowCount < 1) {
      res.status(403).json({
        status: messages[403],
        message: "Email doesn't exist",
      })
    }
    else{
      let { email } = req.body
      
      let code = randomstring.generate(6);
      await db.query('UPDATE "Users" set "token"=$1 WHERE "email"=$2 ',[
        code,
        email
      ])
      SendEmail('te66949@gmail.com',email,"reset password", `Use the following code to reset your password: ${code}`)
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
  }

}

const userVerifyForgotPassword = async(req,res) =>{
  
  const checkForm = await formValidator('verifyForgot', req.body);
  if (checkForm.length > 0) {
    res.status(400).json({
      status: messages[400],
      error: checkForm
    })
  }
  else{
    
    const userQuery = await db.query('SELECT * FROM "Users" WHERE "email" = $1', [
      req.body.email
    ])
    if (userQuery.rowCount < 1) {
      res.status(403).json({
        status: messages[403],
        error: "Email doesn't exist",
      })
    }
    else{
      let fetchedCode = await db.query('SELECT "token" FROM "Users" WHERE "email" = $1',[
        req.body.email
      ])
      console.log(fetchedCode)
      fetchedCode = fetchedCode.rows[0].token

      if(fetchedCode == req.body.code){
        await db.query('UPDATE "Users" set "token"=$1 WHERE "email"=$2 ',[
          null,
          req.body.email
        ])
        res.status(200).json({
          status:messages[200],
        })
      }
      else{
        res.status(403).json({
          status:messages[403],
          error:"Incorrect code"
        })
      }
    }
  }
} 

const userChangePassword = async(req, res) => {
  
  const checkForm = await formValidator('resetPass', req.body);
  if (checkForm.length > 0) {
    res.status(400).json({
      status: messages[400],
      error: checkForm
    })
  }
  else{
    const userQuery = await db.query('SELECT * FROM "Users" WHERE "email" = $1', [
      req.body.email
    ])
    if (userQuery.rowCount < 1) {
      res.status(403).json({
        status: messages[403],
        error: "Email doesn't exist",
      })
    }
    else{
      try {
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(req.body.password, salt, async function (err, hash) {
            await db.query('UPDATE "Users" set "password"= $1 WHERE "email" = $2', [
              hash,
              req.body.email
            ]);
            res.status(200).json({
              status: messages[200],
            })
          });
        });
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

module.exports = {
  userLogin,
  userForgotPassword,
  userChangePassword,
  userSignup,
  userVerifyForgotPassword
}