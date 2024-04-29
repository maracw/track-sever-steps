//import express
const express = require('express');
//set up mongoose object to access the user model
const mongoose=require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

//make router object that will be exported to use in index
const router = express.Router();

router.post('/signup', async (req, res)=>{
    
    //parser parses the req body json object
    //console.log(req.body);
    //extract info from the req by destructuring
    const {email, password} = req.body;

    //create new user object - but not saved to db yet
    try {
        const user = new User({email, password});
    //call save on the user to save to db (async)
    //mongoDB will check for bad data
    await user.save();
    //after user is saved successfully - generate JWT and send the res object back to the client
    //make token with id and BIG SECRET
    const token= jwt.sign({userId: user._id}, 'MY_BIG_SECRET');
    //send token back to user
    res.send({token: token});
    } catch (err) {
        //422 is problem with data in req
        //mongoDB checks for unique value for email
        //err.message is what mongoDB sends back - but not user friendly
        //return
        return res.status(422).send(err.message);
    }
    

  
});

module.exports=router;