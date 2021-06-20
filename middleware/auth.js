
const edge = require("edge.js");
const fetch = require('node-fetch');
module.exports ={
    async createAuth(req, res, next) {
        var user = null
        if(req.session.userId)
         user =await (await fetch('http://localhost:3001/users/'+req.session.userId) ).json()
        // var user = await User.findByPk(req.session.userId) 
        if(user){
             next() 
        } 
        else{
            return res.redirect('/users/login')
        }
    },
    async roleAuth(req, res, next){
        if(req.session.userId){
        var user =await (await fetch('http://localhost:3001/users/'+req.session.userId) ).json()
        // var user = await User.findByPk(req.session.userId)
        
        if(user){
            edge.global('role',user.role)
        }
    }
    else{
        edge.global('role',null)
    }
        next() 
    },
    async userListeAuth(req, res, next){
     var user = null;
        if(req.session.userId){
       user = await (await fetch('http://localhost:3001/users/'+req.session.userId) ).json()
        // var user = await User.findByPk(req.session.userId)
    }
        if(user){
            if(user.role='admin') next();
            else return res.redirect('/users/login')
        }
        else return res.redirect('/users/login')
    }
}