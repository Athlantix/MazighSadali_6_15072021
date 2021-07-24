const express = require('express'); 
const router = express.Router();    
const publicationCtrl = require('../controllers/publication')  
const auth = require('../middleware/auth');


router.post("/:id",auth, publicationCtrl.PostCommentaire);
router.delete("/commentaire/:id",auth, publicationCtrl.DeleteCommentaire);
router.get("/",auth, publicationCtrl.AllPublication);
router.post("/",auth, publicationCtrl.CreatePublication);
router.get("/:id",auth, publicationCtrl.OnePublication);
router.delete("/:id",auth, publicationCtrl.DeletePublication);
router.put("/:id",auth,publicationCtrl.ModifyPublication);


module.exports = router;
