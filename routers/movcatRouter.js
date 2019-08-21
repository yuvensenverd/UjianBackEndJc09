const express = require('express')
const { movcatController} = require('../controllers')
const router = express.Router()

router.get('/getmovcat', movcatController.getMovCat)
router.post('/addmovcat', movcatController.addMovCat)
router.delete('/deletemovcat', movcatController.deleteMovCat)



module.exports = router