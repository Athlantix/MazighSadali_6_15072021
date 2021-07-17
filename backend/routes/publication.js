const express = require('express'); 
const router = express.Router();    
const publicationCtrl = require('../controllers/publication')  

router.get('/', publicationCtrl.AllPublication);


module.exports = router;
