const { SendEmail } = require("../helpers/SendEmail");
const messages = require('../helpers/Messages');
const { formValidator } = require("../helpers/Validators");
const db = require('../db');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
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
    let {id,email,userType} = userQuery.rows[0];
    if (userQuery.rowCount < 1) {
      res.status(403).json({
        status: messages[403],
        message: "Email doesn't exist",
      })
    }
    else {
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