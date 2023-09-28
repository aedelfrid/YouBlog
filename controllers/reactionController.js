const { User, Thought } = require('../models');

module.exports = {
    addReaction: async (req, res) => {
        try {
            const thoughtID = req.params.thoughtID;
            const {reactionBody,  username} = req.body

            const thought = await Thought.findOne({_id: thoughtID})
            
            thought.reactions.push( new reactionSchema (
                    { reactionBody: reactionBody, username: username }
            ) )
            await thought.save()

            res.status(200).json(`Added reaction!`)
        } catch (err) {
            res.status(400).json(err)
        }
    },
    deleteReaction: async (req, res) => {
        try {
            const thoughtID = req.params.thoughtID;
            const { reactionID } = req.body.reactionID

            const thought = await Thought.findOne({_id: thoughtID})

            const reaction = thought.reactions.find(reactionId => reactionId === reactionID)

            thought.reactions.splice(reaction)

            thought.save()

            res.status(200).json('Deleted reaction!')
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    }
}