const router = require('express').Router()

const { 
    getAllThoughts, 
    getOneThought, 
    createThought, 
    updateThought, 
    deleteThought
} = require('../../controllers/thoughtController')

const {
    addReaction,
    deleteReaction
} = require('../../controllers/reactionController')

router.route('/')
    .get(getAllThoughts)
    .post(createThought)
;

router.route('/:thoughtID')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought)
;

router.route('/:thoughtID/reactions')
    .post(addReaction)
    .delete(deleteReaction)
;

module.exports = router;