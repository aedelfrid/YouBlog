const { User, Thought } = require('../models');

module.exports = {
    addReaction: async (req, res) => {
        try {
            const thoughtID = req.params.id;
            const {reactionBody,  username} = req.body

            const addedReaction = await Thought.findOneAndUpdate(
                { _id: thoughtID },
                { $addToSet: { reactions: { reactionBody: reactionBody, username: username } }},
                { new: true }
            );

            res.status(200).json(
                `Added reaction: 
                ${addedReaction}
                to Thought ID ${thoughtID}`
            )
        } catch (err) {
            res.status(400).json(err)
        }
    },
    deleteReaction: async (req, res) => {
        try {
            const reactionID = req.params.id;

            const deletedReaction = await Thought
                .findOne({reactions: { reactionId: reactionID }})
                .select('_id')
                .updateOne(
                    { _id: deletedReaction._id },
                    { $pull: { reactions: reactionID }}
                );

            res.status(200).json(deletedReaction)
        } catch (err) {
            res.status(400).json(err)
        }
    }
}