const express  = require('express');
const env  = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path')
const authRoutes = require('./routes/auth');
const adminAuthRoutes = require('./routes/admin/auth');
const initialDataRoutes = require('./routes/admin/initialData');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

//environment vriables
env.config();
const app = express();
const PORT = process.env.PORT

//db connection
const dbURL = "mongodb+srv://root:admin@cluster0.ofnpv.mongodb.net/ecommerce?retryWrites=true&w=majority";
 mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>console.log("Database connected successfully"));


//middleware
app.use(cors());
app.use('/public',express.static(path.join(__dirname,'uploads')));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


//routes
app.use('/api',authRoutes)
app.use('/api',adminAuthRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',cartRoutes)
app.use('/api',initialDataRoutes)





app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))