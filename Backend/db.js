// const mongoose = require('mongoose');
// const URL = "mongodb://localhost:27017/FoodDelivery";

// const connectToMongo = () => {
//     mongoose.connect(URL)
//         .then(() => {
//             console.log('Connected to MongoDB');
//         })
//         .catch((err) => {
//             console.error('Connection error:', err);
//         });
// };


// module.exports = connectToMongo;
const m = require('mongoose')
const URL = "mongodb://127.0.0.1:27017/FoodDelivery";

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


// const mongoose = require('mongoose');
// const URL = "mongodb://localhost:27017/FoodDelivery";

// const connectToMongo = async () => {
//     try {
//         await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log("Connected to MongoDB successfully");
//     } catch (err) {
//         console.error("MongoDB connection failed:", err);
//     }
// };

// module.exports = connectToMongo;
