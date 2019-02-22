const express = require('express');
const router = express.Router();

const Food = require('../models/food_model.js');

router.use(express.static('public'));

router.get('/:id/edit', (req, res) => {
  Food.findById(req.params.id, (err, selectedItem) => {
    res.render(
      './food_pages/edit.ejs',
      {
        item: selectedItem,

      }
    )
  })
})

// get main pantry page
router.get('/', (req, res) => {
  Food.find({}, (err, allFood) => {
    res.render(
      './food_pages/index.ejs',
    {
      items: allFood,
    });
  });
})

router.get('/new', (req, res) => {
  res.render('./food_pages/new.ejs');
})

router.put('/:id', (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  // need to add fodmaps same as posting
  Food.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedItem) => {

    res.redirect('/pantry')
  })
})



router.post('/', (req, res) => {
  let fodMapsARR = []

  let fodmapObj1 = {
    servingSizeW1: req.body.servingSizeW1,
    servingSizeV1: req.body.servingSizeV1,
    oligos1: req.body.oligos1,
    fructos1: req.body.fructos1,
    polyols1: req.body.polyols1,
    lactos1: req.body.lactos1
  }
  fodMapsARR.push(fodmapObj1);

  let fodmapObj2 = {
    servingSizeW2: req.body.servingSizeW2,
    servingSizeV2: req.body.servingSizeV2,
    oligos2: req.body.oligos2,
    fructos2: req.body.fructos2,
    polyols2: req.body.polyols2,
    lactos2: req.body.lactos2
  }
  fodMapsARR.push(fodmapObj2);

  let fodmapObj3 = {
    servingSizeW3: req.body.servingSizeW3,
    servingSizeV3: req.body.servingSizeV3,
    oligos3: req.body.oligos3,
    fructos3: req.body.fructos3,
    polyols3: req.body.polyols3,
    lactos3: req.body.lactos3
  }

  fodMapsARR.push(fodmapObj3);


  // req.body.fodmaps = fodMapsARR
  req.body.fodmaps = fodMapsARR
  // console.log(req.body.fodmaps);

  Food.create(req.body, (err, newFood) => {
    console.log('new food: ' + newFood);

    res.redirect('/pantry')
  })
})

router.delete('/:id', (req, res) => {
  Food.findByIdAndRemove(req.params.id, (err, selectedItem) => {
    res.redirect('/pantry')
  })
})

module.exports = router;
