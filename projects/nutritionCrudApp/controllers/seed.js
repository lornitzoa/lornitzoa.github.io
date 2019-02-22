const express = require('express');
const seedRouter = express.Router();

const Food = require('../models/food_model.js');

seedRouter.get('/seed', (req, res) => {
  Food.create(
    [
      {
        name: 'Couse cous',
        servingSize: '1 cup',
        calories: 176,
        totalFat: .3,
        saturatedFat: 0,
        polyunsaturatedFat: .1,
        monounsaturatedFat: 0,
        transFat: 0,
        cholesterol: 0,
        sodium: 8,
        potassium: 91,
        totalCarbs: 36,
        dietaryFiber: 2.2,
        sugars: .2,
        protein: 6,
        vA: 0,
        vC: 0,
        calcium: 1,
        iron: 3,
        fodmap:
          [
            {
              servingSizeW: '37g', //by weight
              servingSizeV: '.25 cup', //by volume
              oligos: 'low', // will be a forced string option
              fructos: 'low', // will be a forced string option
              polyols: 'low', // will be a forced string option
              lactos: 'low', // will be a forced string option
            },
            {
              servingSizeW: '51g', //by weight
              servingSizeV: '.33 cup', //by volume
              oligos: 'med', // will be a forced string option
              fructos: 'low', // will be a forced string option
              polyols: 'low', // will be a forced string option
              lactos: 'low', // will be a forced string option
            },
            {
              servingSizeW: '77g', //by weight
              servingSizeV: '.5 cup', //by volume
              oligos: 'high', // will be a forced string option
              fructos: 'low', // will be a forced string option
              polyols: 'low', // will be a forced string option
              lactos: 'low', // will be a forced string option
            }
          ]
        }
      ], (err, data) => {
        res.redirect('/pantry');
      }
  )
})

module.exports = seedRouter;
