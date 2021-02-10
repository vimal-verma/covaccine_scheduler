const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Form = require('./model/form');

const dbURI = "mongodb+srv://vimal:8jvsAqznhwOACujN@cluster0.dwrea.mongodb.net/covid_Form?retryWrites=true&w=majority";
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
app.get('/form', (req, res) => {
    res.render('form')
});
app.post('/', (req, res) => {
    const postBody = req.body;
    const form = new Form({
        firstname: postBody.firstname,
        lastname: postBody.lastname,
        email: postBody.email,
        age: postBody.age,
        gender: postBody.gender,
    })
    form.save()
    .then(result =>res.render('thanks', {postBody}))
    .catch(err => console.log(err))
});
app.get('/about', (req, res) => {
    res.send("hello backend about")
});
app.get('*', (req, res) => {
    res.send("hello backend error")
});





const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {console.log(`server start at ${PORT}, go to http://localhost:${PORT}/`)});