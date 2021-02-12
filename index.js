const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const User = require('./model/user');
const bcrypt = require('bcryptjs');
require('dotenv').config()

const dbURI = process.env.DB_URL;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log('connected to db'))
  .catch(err => console.log(err));

  
const app = express();
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index')
});
app.get('/register', (req, res) => {
    res.render('register')
});
app.get('/login', (req, res) => {
    res.render('login')
});
app.post('/register', (req, res) => {
    const postBody = req.body;
    const user = new User({
        firstname: postBody.firstname,
        lastname: postBody.lastname,
        email: postBody.email,
        age: postBody.age,
        gender: postBody.gender,
        password: postBody.password
    })
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(user.password, salt, (err, hash)=>{
            if(err){
                console.log(err)
            }else{
                user.password = hash;
                user.save()
                .then(result =>res.render('home', {postBody}))
                .catch(err => console.log(err))
            }
        })
    })
});
app.get('/about', (req, res) => {
    res.render('about')
});
app.get('*', (req, res) => {
    res.render('error')
});





const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {console.log(`server start at ${PORT}, go to http://localhost:${PORT}/`)});