const foodModels = require('../models/foodModel')
const fs = require('fs')

//add food item
const addFood = async (req, res) => {
    if(!req.file){
        return res.status(400).json({ success: false, message: 'Image file is required' });
    }
    let image_filename = req.file.filename; // store the uploaded file name in this variable

    //creating new food model
    const food = new foodModels({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category,
    })
    try {
        await food.save(); //food item will be saved in the database
        res.json({ success: true, message: "Food item added successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Unable to add food item' })
    }
}

// fetching all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModels.find({}); // fetching all the food items
        console.log(foods)
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'error' })
    }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModels.findById(req.body._id);

        if (!food) {
            return res.status(404).json({ success: false, message: 'Food not found' });
        }

        // Remove image file
        fs.unlink(`uploads/${food.image}`, async(err) => {
            if (err) {
                console.error('Failed to delete image file:', err);
                return res.status(500).json({ success: false, message: 'Failed to delete image file' });
            }
        });

        await foodModels.findByIdAndDelete(req.body._id);

        res.status(200).json({ success: true, message: 'Food removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error removing food' });
    }
};

module.exports = { addFood, listFood, removeFood };
