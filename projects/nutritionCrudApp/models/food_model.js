const mongoose = require('mongoose');


const foodSchema = new mongoose.Schema(
  {
    name: String,
    brand: String,
    servingSize: String,
    calories: String,
    fat: String,
    carbs: String,
    fiber: String,
    sugars: String,
    protein: String,
    fodmaps: {type: Array}
  }
);

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
