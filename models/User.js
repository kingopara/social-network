const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
});

//virtual to retrieve user's friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});


// create the user model using the UserSchema
const User = model('User', UserSchema);

//export the User model
module.exports = User;