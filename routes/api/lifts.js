const express = require('express'); 
const router = express.Router();
const auth = require('../../middleware/auth');

//Item Model
const Lift = require('../../models/Lift'); 

// @route GET api/items
// @desc Get all Items
// @access Public

router.get('/:user', (req, res) => {
    Lift.find({user: req.params.user})
        .sort({date: -1})
        .then(lifts => res.json(lifts))
});

//@route GET api/lifts/user/type
//@desc Get user/type
//@access public
router.get('/:user/:lift', (req, res) => {
    Lift.find({user: req.params.user, lift: req.params.lift})
        .sort({date: -1})
        .then(lifts => res.json(lifts))
})




// @route Post api/items
// @desc Create A item
// @access Public

router.post('/', auth, (req, res) => {
    const newLift = new Lift({
        user: req.body.user,
        lift: req.body.lift,
        weight: req.body.weight,
        rep: req.body.rep
    });     
    newLift.save().then(lift => res.json(lift)); 
}); 


// @route DELETE api/items
// @desc Delete a item
// @access Public

router.delete('/:id', auth, (req, res) => {
    Lift.findById(req.params.id)
    .then(lift => lift.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false})); 
});



module.exports =  router;