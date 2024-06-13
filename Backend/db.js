const m = require('mongoose')
const URL = "mongodb://localhost:27017/FoodDelivery";

const connectToMongo = ()=>{
    m.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = m.connection;
    db.on('error',(err)=>{
        console.log('connection error',err);
    })
    db.once('open',()=>{
        console.log('connected to mongo');
    })
}
module.exports = connectToMongo;