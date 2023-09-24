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
        default: Date.now
        // getter method to format the timestamp on query
        get: 
    },
    username:{
        type: string,
        require: true
    },
    reactions:[reactionSchema],
});

const 

thoughtSchema.virtual('reactionCount').get(async () => {
    return this.reactions.length
});

const Thought = model('thought',thoughtSchema);

module.exports = Thought;