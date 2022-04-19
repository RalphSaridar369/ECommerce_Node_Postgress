const messages = require('../helpers/Messages');
const { isUnique } = require('../helpers/checkUnique');
const db = require('../db');
const { formValidator } = require('../helpers/Validators');

const getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await db.query('SELECT * FROM "Subcategory"');
        res.status(200).json({
            status: messages[200],
            data: subcategories.rows
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            status: messages[500]
        })
    }
}

const getSubcategory = async (req, res) => {
    try {
        const result = await db.query('SELECT "name" FROM "Subcategory" WHERE "id" = $1', [
            req.params.id
        ])
        res.status(200).json({
            status: messages[200],
            data: result.rows[0]
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            status: messages[500]
        })
    }
}

const getSubcategoriesByCategory = async (req, res) => {
    try {
        const result = await db.query('SELECT "name" FROM "Subcategory" WHERE "categoryId" = $1', [
            req.params.id
        ])
        res.status(200).json({
            status: messages[200],
            data: result.rows
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            status: messages[500]
        })
    }
}

const createSubcategory = async (req, res) => {

    const checkForm = await formValidator('subcategory', req.body);
    if (checkForm.length > 0) {
        res.status(400).json({
            status: messages[400],
            error: checkForm
        })
    }
    else {

        //checking if categoy exists
        if (!await isUnique('SELECT COUNT("name") FROM "Subcategory" WHERE "name" = $1', [req.body.name])) {
            res.status(403).json({
                status: messages[403],
                message: "Subcategory already exists"
            })
        }
        else if(await isUnique('SELECT COUNT("name") FROM "Category" WHERE "id"=$1 ',[req.body.catid])){
            res.status(403).json({
                status: messages[403],
                message: "Category doesnt exist"
            })
        }

        else {
            try {
                await db.query('INSERT INTO "Subcategory" ("name","categoryId") VALUES ($1,$2)', [
                    req.body.name,
                    req.body.catid
                ])
                res.status(200).json({
                    status: messages[200],
                    message: "Subcategory created successfully"
                })
            }
            catch (err) {
                console.log(err)
                res.status(500).json({
                    status: messages[500]
                })
            }
        }

    }
}

const updateSubcategory = async (req, res) => {

    const checkForm = await formValidator('subcategory', req.body);
    if (checkForm.length > 0) {
        res.status(400).json({
            status: messages[400],
            error: checkForm
        })
    }
    else {

        //checking if categoy exists
        if (!await isUnique('SELECT COUNT("name") FROM "Subcategory" WHERE "name" = $1', [req.body.name])) {
            res.status(403).json({
                status: messages[403],
                message: "Subcategory already exists"
            })
        }

        else if(await isUnique('SELECT COUNT("name") FROM "Category" WHERE "id"=$1 ',[req.body.catid])){
            res.status(403).json({
                status: messages[403],
                message: "Category doesnt exist"
            })
        }

        else {
            try {
                await db.query('UPDATE "Subcategory" SET "categoryId"=$2, "name" =$1  WHERE "id"=$3', [
                    req.body.name,
                    req.body.catid,
                    req.params.id
                ])
                res.status(200).json({
                    status: messages[200],
                    message: "Subcategory updated successfully"
                })
            }
            catch (err) {
                console.log(err)
                res.status(500).json({
                    status: messages[500]
                })
            }
        }

    }
}

const deleteSubcategory = async (req, res) => {
    try {
        await db.query('DELETE FROM "Subcategory" WHERE "id" = $1', [
            req.params.id
        ])
        res.status(200).json({
            status: messages[200],
            message: "Subcategory was deleted successfully"
        })
    } catch (error) {
        console.log(err)
        res.status(500).json({
            status: messages[500]
        })
    }
}

module.exports = {
    getAllSubcategories,
    createSubcategory,
    getSubcategory,
    updateSubcategory,
    deleteSubcategory,
    getSubcategoriesByCategory
}