const { User, Thought } = require('../models');

module.exports = {
    getAllThoughts: async (req, res) => {
        try {
            const thoughtData = await Thought.find({})
                .select('-__v')
                res.status(200).json(thoughtData)
        } catch (err) {
            res.status(400).json(err)
        }
    },
    getOneThought: async (req, res) => {
        try {
            const thoughtID = req.params.thoughtID
            const thoughtData = await Thought.findOne({ _id: thoughtID })
                .select('-__v');

            res.status(200).json(thoughtData)
        } catch (err) {
            res.status(400).json(err)
        }
    },
    createThought: async (req, res) => {
        try {
            const { thoughtText, username, userId} = req.body
            const newThought = await Thought.create(
                {thoughtText: thoughtText, username: username }
            );

            const thoughtID = newThought._id

            const user = await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { thoughts: thoughtID} },
                { new: true }
            );

            res.status(200).json(`Added new thought with data ${newThought}.
                Pushed thought ID to ${userId}'s thoughts`)
        } catch (err) {
            res.status(400).json(err)
        }
    },
    updateThought: async (req, res) => {
        try {
            const thoughtID = req.params.thoughtID;
            const updatedThought = await Thought.findOneAndUpdate(
                { _id:thoughtID }, 
                req.body,
                { new: true }
            );
            
            res.status(200).json(`Updated thought as follows; ${updatedThought}`)
        } catch (err) {
            res.status(400).json(err)
        }
    },
    deleteThought: async (req, res) => {
        try {
            const thoughtID = req.params.thoughtID;
            const deletedThought = await Thought.findOneAndDelete(
                { _id:thoughtID }
            );
            
            res.status(200).json(`Deleted following thought; ${deletedThought}`)
        } catch (err) {
            res.status(400).json(err)
        }
    },
}