In postman
Add json test data to body
use double quotes around each piece of info
Add a KVP to header that sets content type to application/json

To check if email has been used before in mongoDB

Users collection - like an array of objects (but you know documents..)
User
email string
password string

set up mongoose (a node lib) to be able to talk to mongoDB
needs a model 
require without assigning in index

mongoose does the set up for the collection when we define a model

when you need to use it - i.e. authRoutes

set up validation
needs a way to test required email
needs to catch empty/ null  - a try catch block
catch - mongoDB will send error for missing or duplicate data, don't need to write code to check manually

JWT
string - I am who I am
drivers license - has features that are hard to fake in person, the id itself is a reliable document
take id info and store it in a document that is hard to fake
JWT uses key from "our server" 

jwt.io
header/payload/verify signature
/info from user - id created by mongo/secret from our server

hard to modify existing token

making a new user - make a jwt and send back to user for them to use later

validating the user
index - app.get needs valid web token
set up middlewares folder
start requireAuth.js
