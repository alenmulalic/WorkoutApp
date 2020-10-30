const express = require('express'); 
const router = express.Router();
const auth = require('../../middleware/auth');

//cardio Model
const cardio = require('../../models/Cardio'); 

// @route GET api/cardios
// @desc Get all cardios
// @access Public

router.get('/:user', (req, res) => {
    cardio.find({user: req.params.user})
        .sort({date: -1})
        .then(cardios => res.json(cardios))
});

router.get('/:user/:type', (req, res) => {
    cardio.find({user: req.params.user, type: req.params.type})
        .sort({date: -1})
        .then(cardios => res.json(cardios))
})

// @route Post api/cardios
// @desc Create A cardio
// @access Publicsss

router.post('/', auth, (req, res) => {
    const newcardio = new cardio({
        user: req.body.user, 
        type: req.body.type,
        duration: req.body.duration,
        intensity: req.body.intensity
    }); 
    
    newcardio.save().then(cardio => res.json(cardio)); 
}); 


// @route DELETE api/cardios
// @desc Delete a cardio
// @access Public

router.delete('/:id', auth, (req, res) => {
    cardio.findById(req.params.id)
    .then(cardio => cardio.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false})); 
});



module.exports =  router;