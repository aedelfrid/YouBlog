const { User, Thought } = require('../models');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const userData = await User.find()
            res.status(200).json(userData)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getSingleUser: async (req, res) => {
        try {
            const userID = req.params.id;
            const userData = await User.findOne({_id: userID})
            .select('-__v')
            .populate(
                { path:'thoughts', select:'-__v' }, 
                { path:'friends', select:'-__v' }
            );
                
            res.status(200).json(userData)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createUser: async (req, res) => {
        try {
            const { username, email } = req.body;
            const newUser = await User.create({
                username: username,
                email: email
            })

            res.status(200).json(`User with ${{ username, email }} created!`)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const userID = req.params.id;

            const username = await User.findOne({ _id:userID })
                .select(`username`)
                .deleteOne({ _id:userID })

            const deletedThoughts = await Thought.deleteMany({username: username})

            res.status(200).json(`User of id ${userID}, and associated thoughts are deleted.`)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateUser: async (req, res) => {
        try {
            const userID = req.params.id;
            const updatedUser = await User.updateOne({ _id:userID }, req.body)

            res.status(200).json(`User of id ${userID} 
            is updated by the following parameters 
            ${req.body}.
        `);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    addFriend: async (req, res) => {
        try {
            const userID = req.params.id;
            const { friendID } = req.body
            const friendAddedUser = await User.findOneAndUpdate(
                { _id: userID },
                { $addToSet: { friends: friendID}},
                { new: true}
            );

            res.status(200).json(friendAddedUser)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    removeFriend: async (req, res) => {
        try {
            const userID = req.params.id;
            const { friendID } = req.body
            const friendRemovedUser = await User.findOneAndUpdate(
                { _id: userID },
                { $pull: { friends: friendID}},
                { new: true}
            );

            res.status(200).json(friendRemovedUser)
        } catch (err) {
            res.status(500).json(err);
        }
    },
}