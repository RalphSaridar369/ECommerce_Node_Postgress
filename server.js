require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//importing routes
const UserRoute = require('./routes/Users');
const CategoryRoute = require('./routes/Categories');
const SubcategoryRoute = require('./routes/Subcategories');


const app = express();


//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

//using routes
app.use('/user',UserRoute);
app.use('/category',CategoryRoute);
app.use('/subcategory',SubcategoryRoute);

const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});