const express = require('express')
const { moviecontroller} = require('../controllers')
const router = express.Router()

router.get('/getmovie', moviecontroller.getMovies)
router.post('/addmovie', moviecontroller.addMovies)
router.delete('/deletemovie/:id', moviecontroller.deleteMovies)
router.put('/editmovies/:id', moviecontroller.editMovies)



module.exports = router