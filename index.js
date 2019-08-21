const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const port =  1998
const app = express();

// PAKAI FOREIGN KEY UPDATE AND DELETE CONSTRAINTS
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

app.use(express.static('public'))

app.get('/', (req,res)=>{

    res.status(200).send(`<h1>APIAKTIF!</h1>`)
})


const { movieRouter, categoryRouter, movcatRouter } = require('./routers')

app.use('/movie', movieRouter)
app.use('/category', categoryRouter)
app.use('/movcat', movcatRouter)


app.listen(port, ()=>console.log('API AKTIF DI PORT ' + port))