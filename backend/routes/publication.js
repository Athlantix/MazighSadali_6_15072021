const express = require('express'); 
const router = express.Router();    
const publicationCtrl = require('../controllers/publication')  
const auth = require('../middleware/auth');

router.get("/com",auth, publicationCtrl.AllCommentaire);
router.get("/",auth, publicationCtrl.AllPublication);
router.post("/",auth, publicationCtrl.CreatePublication);


router.get("/:id",auth, publicationCtrl.OnePublication);
router.delete("/:id",auth, publicationCtrl.DeletePublication);

module.exports = router;
