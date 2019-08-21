const express = require('express')
const { categorycontroller} = require('../controllers')
const router = express.Router()

router.get('/getcategory', categorycontroller.getCategory)
router.post('/addcategory', categorycontroller.addCategory)
router.put('/editcategory/:id', categorycontroller.editCategory)
router.delete('/deletecategory/:id', categorycontroller.deleteCategory)

module.exports = router