const router = require('express').Router()

const { 
    getUsers, 
    getSingleUser, 
    createUser, 
    deleteUser, 
    updateUser, 
    addFriend, 
    removeFriend 
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userID')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)
;

router.route('/:userID/friends/:friendID')
    .post(addFriend)
    .delete(removeFriend)
;

module.exports = router;
