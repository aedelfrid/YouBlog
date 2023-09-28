const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: new Schema.Types.ObjectId(),
    },
    reactionBody:{
        type: String,
        require: true,
        maxLength: 280
    },
    username:{
        type: String,
        require:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = reactionSchema