const { User, Thought } = require('../models');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const userData = await User.find()
            res.status(200).json(userData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
    getSingleUser: async (req, res) => {
        try {
            const userID = req.params.userID;
            const userData = await User.findOne({_id: userID})
            .select('-__v')
            .populate([
                { path:'thoughts', select:'-__v' }, 
                { path:'friends', select:'-__v' }
            ]);
                
            res.status(200).json(userData)
        } catch (err) {
            console.log(err)
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

            res.status(200).json(`User with ${username, email} created!`)
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const userID = req.params.userID;

            const username = await User.findOne({ _id:userID })
                .select(`username`)
                .deleteOne({ _id:userID })

            const deletedThoughts = await Thought.deleteMany({username: username})

            res.status(200).json(`User of id ${userID}, and associated thoughts are deleted.`)
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
    updateUser: async (req, res) => {
        try {
            const userID = req.params.userID;
            const updatedUser = await User.updateOne({ _id:userID }, req.body)

            res.status(200).json(`User is updated!`);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
    addFriend: async (req, res) => {
        try {
            const {userID, friendID} = req.params;
       
            const friendAdd = await User.findOneAndUpdate(
                { _id: userID },
                { $addToSet: { friends: friendID}},
                { new: true}
            );
            const userFriendAdd = await User.findOneAndUpdate(
                { _id: friendID },
                { $addToSet: { friends: userID}},
                { new: true}
            );

            res.status(200).json('Users added as friends!')
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
    removeFriend: async (req, res) => {
        try {
            const {userID, friendID} = req.params;
            
            const friendRemovedUser = await User.findOneAndUpdate(
                { _id: userID },
                { $pull: { friends: friendID}},
                { new: true}
            );
            const userRemovedFriend = await User.findOneAndUpdate(
                { _id: friendID },
                { $pull: { friends: userID}},
                { new: true}
            );

            res.status(200).json("Friend removed!")
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
}