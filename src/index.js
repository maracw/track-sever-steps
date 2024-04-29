//require user model in index ONLY
//not assigned to anything
//needs to execute only once
require('./models/User');

//importing express
const express = require('express');
//import mongoose
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//require in/ import router object 

const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

//entire application
const app = express();

//set up body parser before setting up the routing
app.use(bodyParser.json());
//set up connection to be able to access routes
app.use(authRoutes);

//default get route for app 
// app.get('/', (req, res)=>{
//     res.send('Hi there');
// });
app.get('/',requireAuth, (req, res)=>{
    res.send(`Hi there ${req.user.email}`);
});

//connection string to connect to mongoDB
const mongoUri = "mongodb+srv://admin:pWord@lcccluster.c0cxa6p.mongodb.net/?retryWrites=true&w=majority&appName=LccCluster";

//after connection string add call to mongoose to make the connection
mongoose.connect(mongoUri);

//when connection is successful
mongoose.connection.on('connected', ()=>{
    console.log("connected to mongoDb through mongoose");
});
//when it tries to connect and gets an error
mongoose.connection.on('error', (err)=>{
    console.error('error connecting to mongoDB through mongoose', err);
}); 
//set up port listening
app.listen(3000, ()=>{
    console.log('listening on port 3000');
});

