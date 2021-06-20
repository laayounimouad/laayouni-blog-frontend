var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const redirectIfAuthenticated = require('../middleware/redirectIfAuthenticated');
router.use(express.static('public'));


router.get('/login',redirectIfAuthenticated,async function(req,res){
    res.render('login')
})

router.post('/login',async function(req, res, next){
    var response = await fetch('http://localhost:3001/users/login', 
    {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    })
    if(response.status == 400)
        {console.log(response.status)
            res.render('login')}
    else{
        var user =await response.json()
        console.log(user)
        req.session.userId = user.id
        res.redirect('/')
    }
  })

router.post('/register',async function(req, res, next) {
  
    var response = await fetch('http://localhost:3001/users', 
    {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    })
    if(response.status == 400)
        {console.log(response.status)
            res.render('register')}
    else{
        var json =await response.json()
        console.log(json)
        req.session.userId = json.user.id
        res.redirect('/')
    }
});

router.get('/register',redirectIfAuthenticated,async function(req,res){
      res.render('register')
})

router.get('/logout',(req, res) => {
      req.session.destroy(() => {
          res.redirect('/')
      })
})
  
  module.exports = router;
