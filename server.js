require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//importing routes
const UserRoute = require('./routes/Users');
const CategoryRoute = require('./routes/Categories');
const SubcategoryRoute = require('./routes/Subcategories');
const ProductRoute = require('./routes/Products');


const app = express();


//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

//using routes
app.use('/user',UserRoute);
app.use('/category',CategoryRoute);
app.use('/subcategory',SubcategoryRoute);
app.use('/product',ProductRoute);

const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});