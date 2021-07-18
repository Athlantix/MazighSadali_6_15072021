const express = require('express'); 
const router = express.Router();    
const publicationCtrl = require('../controllers/publication')  
const auth = require('../middleware/auth');

router.get("/commentaire",auth, publicationCtrl.AllCommentaire);
router.post("/commentaire",auth, publicationCtrl.PostCommentaire);
router.delete("/commentaire/:id",auth, publicationCtrl.DeleteCommentaire);
router.get("/",auth, publicationCtrl.AllPublication);
router.post("/",auth, publicationCtrl.CreatePublication);


router.get("/:id",auth, publicationCtrl.OnePublication);
router.delete("/:id",auth, publicationCtrl.DeletePublication);


module.exports = router;
