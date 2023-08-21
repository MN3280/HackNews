
const express = require('express')
const router = express.Router()
const CategoryController = require("../controllers/categoryController")
const { authentication } = require('../middlewares/authentication')


router.get("/", CategoryController.readCategory);
router.use(authentication)
router.post("/createCategory", CategoryController.createCategory);
router.delete("/:id", CategoryController.deleteCategory)




module.exports = router 