
const express = require('express')
const router = express.Router()
const PostController = require("../controllers/postController")
const { authentication } = require('../middlewares/authentication')


router.get("/", PostController.readArticle);
router.get("/:id", PostController.RenderPostDetail)
router.use(authentication)
router.post("/createPost", PostController.createPost); //bisa add tags ny 3
router.delete("/:id", PostController.deletePostById);
router.put("/:id", PostController.editPost);




module.exports = router 