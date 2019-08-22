const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);

const bcrypt = require('bcrypt');

/* Schema - https://mongoosejs.com/docs/guide.html#definition */
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        /* Validation - https://mongoosejs.com/docs/validation.html */
        required: [true, 'Why no username?'],
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Why no password?']
    },
    role: {
        type: Number,
        required: [true, 'Why no role?']
    }
},
    { strict: "throw", timestamps: true }
);


//This is called a pre-hook, before the user information is saved in the database
//this function will be called, we'll get the plain text password, hash it and store it.
userSchema.pre('save', async function (next) {
    //'this' refers to the current document about to be saved
    const user = this;
    //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
    //your application becomes.
    const hash = await bcrypt.hash(this.password, 10);
    //Replace the plain text password with the hash and then store it
    this.password = hash;
    //Indicates we're done and moves on to the next middleware
    next();
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
