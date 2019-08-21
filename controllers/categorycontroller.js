const db = require('../database')


// PAKAI FOREIGN KEY CONSTRAINTS
module.exports = {
    getCategory : (req,res) =>{
        var sql = `SELECT * from categories`
        db.query(sql, (err,result)=>{
            if(err) return res.status(500).send({ message: "Error :(", error: err})
    
            return res.status(200).send(result)
        })  
    },
    addCategory : (req,res) => {
        console.log(req.body)
        var sql = `select * from categories where nama = '${req.body.nama}' `
        db.query(sql, (err,result)=>{
            if(err) return res.status(500).send({ message: "Error :(", error: err})
            
            if(result.length !== 0) {
                return res.status(500).send({ message: "Nama Category sudah terdaftar :(", error: err})
            }
            sql = `insert into categories set ?`
            db.query(sql, req.body,(err,results2)=>{
                if(err) return res.status(500).send({ message: "Error :(", error: err})
        
                return res.status(200).send(results2)
            })  
        })  
        
    },
    editCategory : (req,res) => {
        console.log(req.params.id)
        var sql = `Update categories set ? where id = ${req.params.id}`
        db.query(sql,req.body, (err,result)=>{
            if(err) return res.status(500).send({ message: "Error :(", error: err})
            

            console.log("Update categories berhasil")
            return res.status(200).send(result)
        })  
    },
    deleteCategory : (req,res) => {
        console.log(req.params.id)
        var sql = `delete from categories where id = ${req.params.id}`
        db.query(sql, (err,result)=>{
            if(err) return res.status(500).send({ message: "Error :(", error: err})
            
            console.log("Berhasil delete category")
            return res.status(200).send(result)
        })  
    }
}