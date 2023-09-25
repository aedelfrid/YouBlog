const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt:{
        type: Date, 
        default: Date.now,
        get: (dateToFormat) => { return dateToFormat.getDate() }
    },
    username:{
        type: String,
        require: true
    },
    reactions:[reactionSchema]
});

thoughtSchema.virtual('reactionCount').get(async () => {
    return this.reactions.length
});

const Thought = model('thought',thoughtSchema);

module.exports = Thought;