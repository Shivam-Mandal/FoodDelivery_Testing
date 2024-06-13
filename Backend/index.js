//db connection
const connectToMongo = require('./db');
connectToMongo();

const express = require('express');

//app config
const app = express();
const port  = 3000;

const cors = require('cors') 

//middleware
app.use(express.json());
app.use(cors())

app.get('/',(req,res)=>{
    res.send('hello world');
    console.log('hello world');
})
//available routes (api endpoint)
// app.use('/menu',require('./routes/menu'))
app.use('/images',express.static('uploads'))
app.use('/api/food',require('./routes/foodRoute'))
app.use('/api/user',require('./routes/userRoute'))
app.use('/api/cart',require('./routes/cartRoute'))
app.use('/api/order',require('./routes/orderRoute'))
app.use('/api/mail',require('./routes/mailRoutes'))

app.listen(port,()=>{
    console.log(`app listining on port ${port}`);
})
