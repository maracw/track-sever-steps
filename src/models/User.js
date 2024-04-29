const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    password : {
        type: String,
        required: true
    }
});

//associates new schema with mongoose
//model with lowercase m
mongoose.model('User', userSchema);