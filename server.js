const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
const Article = require('./models/article');

const app = express();
const dbURI = 'mongodb+srv://sandhunirbhay1:PEx3u3F0IseSXU7f@linkedincluster.xbcaafg.mongodb.net/Article?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then(result =>{
        app.listen(8000);
        console.log('conencted to db')
    })
    .catch(err =>{
        console.log(err);
    })

app.use(cors());
app.use(bodyparser.json());



app.post('/all-articles', (req,res) =>{
    
    let article = new Article(req.body);

    article.save()
        .then(res.redirect('/all-articles'))
})

app.get('/all-articles', (req,res) =>{
    Article.find().sort({createdAt: -1})
        .then(result =>{
            res.json(result);
        })
})
