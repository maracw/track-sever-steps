const jwt= require('jsonwebtoken');
const mongoose = require('mongoose');
//get user model
const User=mongoose.model('User');

//incoming request 
//if req is good (has a jwt) then it goes to next
//if req is not good it gets rejected and error sent

module.exports = (req, res, next)=>{
    console.log('you are in requireAuth');
    //how user sends the jwt - in header Authorization: Bearer <token>
    //inspect req for Authorization
    const {authorization} = req.headers;
    console.log(req.headers);

    //authorization === Bearer token-string
    //no header called authorization
    if(!authorization){
        return res.status(401).send({error:"you must be logged in step 1"});
    }
    console.log("authorization from header: " + authorization);
    //remove the Bearer and space
    const token = authorization.replace('Bearer ','');
    //call verify 
    jwt.verify(token,'MY_BIG_SECRET', async (err, payload)=>{
        //payload is what gets decoded from jwt
        if (err){
            //don't give out info that would help unauthorized user access site
            //this error message is not specific to the token
            return res.status(401).send({error:"you must be logged in step 2"}); 
        }
        //if no error- jwt is legit, get the id from the payload
        const {userId}=payload;

        //async call to db to get user information from db
        const user =await User.findById(userId);

        //add user object to req object so that the next function can access it
        req.user=user;

        //call next
        next();

    })
};