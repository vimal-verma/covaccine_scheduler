const express = require('express');
const bodyParser = require('body-parser')

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
    res.render('thanks', {postBody})
});
app.get('/about', (req, res) => {
    res.send("hello backend about")
});
app.get('*', (req, res) => {
    res.send("hello backend error")
});





const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {console.log(`server start at ${PORT}, go to http://localhost:${PORT}/`)});