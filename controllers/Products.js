const { isUnique } = require('../helpers/checkUnique');
const db = require('../db');
const { formValidator } = require('../helpers/Validators');
const messages = require('../helpers/Messages');


const createProduct = async (req, res) => {

    const checkForm = await formValidator('product', req.body);
    if (checkForm.length > 0) {
        res.status(400).json({
            status: messages[400],
            error: checkForm
        })
    }
    else {
        let checkingIfCategoryExist = await db.query('SELECT * FROM "Category" WHERE id = $1', [
            req.body.categoryId
        ])
        let checkingIfSubcategoryExist = await db.query('SELECT * FROM "Subcategory" WHERE "id" = $1 AND "categoryId"=$2', [
            req.body.subcategoryId,
            req.body.categoryId,
        ])
        if (checkingIfCategoryExist.rowCount < 1) {
            res.status(400).json({
                status: messages[400],
                error: 'Category doesn\'t exist'
            })
        }

        else if (checkingIfSubcategoryExist.rowCount < 1) {
            res.status(400).json({
                status: messages[400],
                error: 'Subcategory doesn\'t exist'
            })
        }

        else {
            try {

                await db.query('INSERT INTO "Products"("name","description","price","categoryId","subcategoryId") VALUES($1,$2,$3,$4,$5)', [
                    req.body.name,
                    req.body.description,
                    req.body.price,
                    req.body.categoryId,
                    req.body.subcategoryId,
                ])
                res.status(200).json({
                    status: messages[200],
                    message: 'product created successfully'
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

const updateProduct = async (req, res) => {

    const checkForm = await formValidator('product', req.body);
    if (checkForm.length > 0) {
        res.status(400).json({
            status: messages[400],
            error: checkForm
        })
    }
    else {

        let checkingIfCategoryExist = await db.query('SELECT * FROM "Category" WHERE id = $1', [
            req.body.categoryId
        ])
        let checkingIfSubcategoryExist = await db.query('SELECT * FROM "Subcategory" WHERE "id" = $1 AND "categoryId"=$2', [
            req.body.subcategoryId,
            req.body.categoryId,
        ])
        if (checkingIfCategoryExist.rowCount < 1) {
            res.status(400).json({
                status: messages[400],
                error: 'Category doesn\'t exist'
            })
        }

        else if (checkingIfSubcategoryExist.rowCount < 1) {
            res.status(400).json({
                status: messages[400],
                error: 'Subcategory doesn\'t exist'
            })
        }

        else {
            try {
                await db.query('UPDATE "Products" SET "name" = $1, "description" = $2 ,"price" = $3, "categoryId" = $4, "subcategoryId" = $5 WHERE "id" = $6', [
                    req.body.name,
                    req.body.description,
                    req.body.price,
                    req.body.categoryId,
                    req.body.subcategoryId,
                    req.params.id
                ])
                res.status(200).json({
                    status: messages[200],
                    message: 'product updated successfully'
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

const getAllProducts = async (req, res) => {
    try {
        let result
        if(req.params){
            if(req.params.catid){
                result = await db.query('SELECT * FROM "Products" WHERE categoryId = $1',[
                    req.params.catid
                ])
            }
            else if(req.params.subcatid && req.params.catid){
                result = await db.query('SELECT * FROM "Products" WHERE  categoryId = $1 AND subcategory = $2' ,[
                    req.params.catid,
                    req.params.subcatid
                ])
            }
        }
        else{
            result = await db.query('SELECT * FROM "Products"')
        }
        res.status(200).json({
            status: messages[200],
            data: result.rows
        })
    } catch (error) {

        console.log(error)
        res.status(500).json({
            status: messages[500]
        })
    }
}

const getProduct = async (req, res) => {
    try {
        let result = await db.query('SELECT * FROM "Products" WHERE "id"=$1',[
            req.params.id
        ])
        res.status(200).json({
            status: messages[200],
            data: result.rows[0]
        })
    } catch (error) {

        console.log(error)
        res.status(500).json({
            status: messages[500]
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        let result = await db.query('DELETE FROM "Products" WHERE "id"=$1',[
            req.params.id
        ])
        res.status(200).json({
            status: messages[200],
            message: 'Product was deleted successfully'
        })
    } catch (error) {

        console.log(error)
        res.status(500).json({
            status: messages[500]
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getAllProducts,
    getProduct,
    deleteProduct
}