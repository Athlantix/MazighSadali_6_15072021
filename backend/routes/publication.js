const express = require('express'); 
const router = express.Router();    
const publicationCtrl = require('../controllers/publication')  
const auth = require('../middleware/auth');

router.get('/',auth, publicationCtrl.AllPublication);


module.exports = router;
