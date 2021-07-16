const express = require('express'); 
const router = express.Router();    
const usersCtrl = require('../controllers/user')  

router.get('/', usersCtrl.AllUsers);
router.get('/:id', usersCtrl.OneUser);
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

module.exports = router;
