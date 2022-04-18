const messages = require('../helpers/Messages');
const db = require('../db');

const getAllCategories = async(req,res) =>{
    try{
        const categories = await db.query('SELECT * FROM "Category"');
        res.status(200).json({
            status: messages[200],
            data:categories.rows
          })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
          status: messages[500]
        })
    }
}

module.exports = {
    getAllCategories
}