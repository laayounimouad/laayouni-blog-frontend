var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth')
router.use(express.static('public'));

router.get('/',auth.userListeAuth,async function(req,res){
    res.render('userListe')
});
module.exports = router;
