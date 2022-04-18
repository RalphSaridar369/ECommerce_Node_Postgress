const messages = require('../helpers/Messages');
const { isUnique } = require('../helpers/checkUnique');
const db = require('../db');
const { formValidator } = require('../helpers/Validators');

const getAllCategories = async (req, res) => {
    try {
        const categories = await db.query('SELECT * FROM "Category"');
        res.status(200).json({
            status: messages[200],
            data: categories.rows
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            status: messages[500]
        })
    }
}

const getCategory = async (req, res) => {
    try {
        const result = await db.query('SELECT "name" FROM "Category" WHERE "id" = $1', [
            req.params.id
        ])
        res.status(200).json({
            status: messages[200],
            data: result.rows[0]
        })
    }
    catch (error) {
        console.log(err)
        res.status(500).json({
            status: messages[500]
        })
    }
}

const createCategory = async (req, res) => {

    const checkForm = await formValidator('category', req.body);
    if (checkForm.length > 0) {
        res.status(400).json({
            status: messages[400],
            error: checkForm
        })
    }
    else {

        //checking if categoy exists
        if (!await isUnique('SELECT COUNT("name") FROM "Category" WHERE "name" = $1', [req.body.name])) {
            res.status(403).json({
                status: messages[403],
                message: "Category already exists"
            })
        }

        else {
            try {
                await db.query('INSERT INTO "Category" ("name") VALUES ($1)', [
                    req.body.name
                ])
                res.status(200).json({
                    status: messages[200],
                    message: "Category created successfully"
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

const updateCategory = async (req, res) => {

    const checkForm = await formValidator('category', req.body);
    if (checkForm.length > 0) {
        res.status(400).json({
            status: messages[400],
            error: checkForm
        })
    }
    else {

        //checking if categoy exists
        if (!await isUnique('SELECT COUNT("name") FROM "Category" WHERE "name" = $1', [req.body.name])) {
            res.status(403).json({
                status: messages[403],
                message: "Category already exists"
            })
        }

        else {
            try {
                await db.query('UPDATE "Category" SET "name" =$1 WHERE "id"=$2', [
                    req.body.name,
                    req.params.id
                ])
                res.status(200).json({
                    status: messages[200],
                    message: "Category updated successfully"
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

const deleteCategory = async (req, res) => {
    try {
        await db.query('DELETE FROM "Category" WHERE "id" = $1', [
            req.params.id
        ])
        res.status(200).json({
            status: messages[200],
            message: "Category was deleted successfully"
        })
    } catch (error) {
        console.log(err)
        res.status(500).json({
            status: messages[500]
        })
    }
}

module.exports = {
    getAllCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}