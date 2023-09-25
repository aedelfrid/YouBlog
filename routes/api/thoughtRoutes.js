const router = require('express').Router()

const { 
    getAllThoughts, 
    getOneThought, 
    createThought, 
    updateThought, 
    deleteThought
} = require('../../controllers/thoughtController')