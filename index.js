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
app.use(express.static('public'))

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
        password: postBody.password,
        profession: postBody.profession,
        covidbefore: postBody.covidbefore,
        aadhar: postBody.aadhar,
        phone: postBody.phone,
        lungproblems : postBody.lungproblems,
        heartdisease : postBody.heartdisease,
        diabetes : postBody.diabetes,
        obesity : postBody.obesity,
        cancer : postBody.cancer,
        hivaids : postBody.hivaids,
        chronickidneyorliverdisease : postBody.chronickidneyorliverdisease,
        score: 0
    })
    // bcrypt.genSalt(10, (err, salt)=>{
    //     bcrypt.hash(user.password, salt, (err, hash)=>{
    //         if(err){
    //             console.log(err)
    //         }else{
    //             user.password = hash;
    var today = new Date();
    var age = today.getFullYear() - user.age.getFullYear();
    let score = 0

    if(age>74){
        score = score+100
    }else if(age>60){
        score = score+75
    }else{
        score = score+10
    }


      switch(user.profession) {
        case 0:  // Healthcare Personnel
            score = score+200
          break;
        case 1:  // Frontline essential workers
            score = score+150
          break;
        case 1:  // Other essential workers
            score = score+10
          break;
        default:  // Other
            score = score+0
      }
      if(user.lungproblems){
        score = score+5
      }
      if(user.heartdisease){
        score = score+1
      }
      if(user.diabetes){
        score = score+2
      }
      if(user.obesity){
        score = score+1
      }
      if(user.cancer){
        score = score+1
      }
      if(user.hivaids){
        score = score+1
      }
      if(user.chronickidneyorliverdisease){
        score = score+1
      }

      user.score = score
      console.log(user)
      
                user.save()
                .then(result =>{
                    // User.find().sort({"score": -1})
                    // .then(alluser =>{
                    //     let arr = []
                    //     alluser.forEach(user => {
                    //         console.log(user.score)
                    //         arr = arr + user.email
                    //     })
                    //     console.log(arr)
                    //     res.render('home', {score,postBody})
                    // })
                    res.render('home', {postBody,score })
                })
                .catch(err => console.log(err))
    //         }
    //     })
    // })
});

app.post('/login', (req, res) => {
    const postBody = req.body;
    const user = new User({
        email: postBody.email,
        password: postBody.password
    })
    // bcrypt.genSalt(10, (err, salt)=>{
    //     bcrypt.hash(user.password, salt, (err, hash)=>{
    //         if(err){
    //             console.log(err)
    //         }else{
    //             user.password = hash;
    //             // login function
                const query  = User.where({ email: user.email });
                query.findOne()
                .then(result => {
                    if(user.password === result.password){
                        res.render('home',{postBody : result})
                    }else{
                        res.redirect('login')
                    }
                })
                .catch(err => console.log(err))
    //         }
    //     })
    // })
});
app.get('/about', (req, res) => {
    res.render('about')
});
app.get('*', (req, res) => {
    res.render('error')
});





const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {console.log(`server start at ${PORT}, go to http://localhost:${PORT}/`)});