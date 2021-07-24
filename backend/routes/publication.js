const express = require('express'); 
const router = express.Router();    
const publicationCtrl = require('../controllers/publication')  
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post("/:id",auth, publicationCtrl.PostCommentaire);
router.delete("/commentaire/:id",auth, publicationCtrl.DeleteCommentaire);
router.get("/",auth, publicationCtrl.AllPublication);
router.post("/",auth,multer ,publicationCtrl.CreatePublication);
router.get("/:id",auth, publicationCtrl.OnePublication);
router.delete("/:id",auth,multer, publicationCtrl.DeletePublication);
router.put("/:id",auth,multer, publicationCtrl.ModifyPublication);


module.exports = router;
