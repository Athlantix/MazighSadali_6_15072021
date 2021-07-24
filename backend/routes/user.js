const express = require('express'); 
const router = express.Router();    
const usersCtrl = require('../controllers/user')  
const auth = require('../middleware/auth');

router.get('/',auth, usersCtrl.AllUsers);
router.get('/:id',auth, usersCtrl.OneUser);
router.delete('/:id',auth, usersCtrl.DeleteUser);
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('/currentUser/get',auth, usersCtrl.getCurrentUser);
router.put('/',auth,usersCtrl.ModifyUser)

module.exports = router;
