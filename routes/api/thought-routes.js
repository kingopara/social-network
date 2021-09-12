const router = require('express').Router();
const { 
    addThought,
    removeThought,
    addReaction,
    removeReaction,
    getAllThoughts,
    getThoughtById,
    updateThought
} = require('../../controllers/thought-controller');

//get all thoughts
router
    .route('/')
    .get(getAllThoughts);

//Get and update single thought
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought);

//add user's thought 
router
    .route('/:userId')
    .post(addThought);

//add reaction and remove thought
router
    .route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(removeThought);

//delete reaction
router
    .route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;