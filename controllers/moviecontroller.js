const db = require('../database')


// PAKAI FOREIGN KEY CONSTRAINTS
module.exports={
    getMovies : (req,res) =>{
        var sql = `SELECT * from movies`
        db.query(sql, (err,result)=>{
        if(err) return res.status(500).send({ message: "Error :(", error: err})

        return res.status(200).send(result)
        })  
    },
    addMovies : (req,res) =>{
        console.log(req.body)
        var sql = `Select * from movies where nama = '${req.body.nama}'`
        db.query(sql, (err,result)=>{
            if(err) return res.status(500).send({ message: "Error :(", error: err})
    
            if(result.length !== 0){
                return res.status(500).send({ message: "Nama Movie sudah terdaftar", error: err})
            }
            sql = `insert into movies set ?`
            db.query(sql,req.body, (err,results2)=>{
                if(err) return res.status(500).send({ message: "Error :(", error: err})
                

                console.log("insert movies berhasil")
                return res.status(200).send(results2)
                })  

            })  
        
    },
    deleteMovies : (req,res) => {
        console.log(req.params.id)
        var sql = `DELETE from movies where id = ${req.params.id}`
        db.query(sql, (err,result)=>{
            if(err) return res.status(500).send({ message: "Error :(", error: err})
            
            console.log("Delete Berhasil")
            return res.status(200).send(result)
        })  
    },
    editMovies : (req,res) => {
        console.log(req.params.id)
        var sql = `Update Movies set ? where id = ${req.params.id}`
        db.query(sql,req.body, (err,result)=>{
            if(err) return res.status(500).send({ message: "Error :(", error: err})
            
            
            console.log("Update movies berhasil")
            return res.status(200).send(result)
            })  
    }
}