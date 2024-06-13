const mongoose = require('mongoose')

//foodSchema
const foodSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

const foodModels = mongoose.models.food/*if model is already present, this will execute*/ || mongoose.model('food',foodSchema);//otherwise this will execute
module.exports = foodModels;