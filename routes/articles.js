var express = require('express')
var router = express.Router()
const fetch = require('node-fetch');



router.use(express.static('public'));


// router.get('/:id(\\d+)', (req, res) => {
//     fetch('http://localhost:3001/articles/'+req.params.id)
//     .then(res => res.json())
//     .then(article => {
//         console.log(article)
//         res.render('post',{article})
//     })
    
// });

router.get('/:id(\\d+)', async (req, res) => {
    var article=await (await fetch('http://localhost:3001/articles/'+req.params.id) ).json()
    var user=await (await fetch('http://localhost:3001/users/'+article.UserId) ).json()
    var tags=await (await fetch('http://localhost:3001/articles/'+article.id+'/tags') ).json()
    article.createdAt = new Date(article.createdAt).toDateString()
      res.render('post',{article,user,tags})
});
router.get('/new', (req, res) => {
    res.render('create')
});

router.post('/create', (req, res) => {
    fetch('http://localhost:3001/articles', 
        {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
        .then(json => console.log(json));
        res.redirect('/') 
});

module.exports = router;
