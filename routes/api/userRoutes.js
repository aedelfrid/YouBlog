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

