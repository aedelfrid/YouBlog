const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        match: [/.+@.+\..+/, 'Must match an email address!']
    },
    thoughts: [
        {
            type: Types.ObjectId,
            ref: 'thought'
        }
    ],
    friends: [
        {
            type: Types.ObjectId,
            ref: 'user'
        }
    ]
});

userSchema.virtual('friendCount').get(async () => {
    return this.friends.length
})

const User = model('user', userSchema)

module.exports = User;
