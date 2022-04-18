const db = require('../db');

const isUnique = async(query,params) =>{
    const check = await db.query(query, params)
    if (check.rows[0].count == '1') {
        return false
    }
    return true
}

module.exports={
    isUnique
}