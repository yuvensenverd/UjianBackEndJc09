const db = require('../database')


// PAKAI FOREIGN KEY CONSTRAINTS
module.exports = {
    getMovCat : (req,res) =>{
        var sql = `select m.nama as NamaMovie, c.nama as NamaCategory from movcat mc join movies m on mc.idmovie = m.id
        join categories c on mc.idcategory = c.id`
        db.query(sql, (err,result)=>{

            if(err) return res.status(500).send({ message: "Error :(", error: err})

            return res.status(200).send(result)
        })  
    },
    deleteMovCat : (req,res) => {
        console.log(req.query.mov)
        console.log(req.query.cat)
        var sql = `select id from movies where nama = '${req.query.mov}'`
        db.query(sql, (err,result)=>{

            if(err) return res.status(500).send({ message: "Error :(", error: err})
            
            if(result.length !== 0){
                var idmovie = result[0].id
                sql = `select id from categories where nama = '${req.query.cat}'`
                db.query(sql, (err,results2)=>{

                    if(err) return res.status(500).send({ message: "Error :(", error: err})
                    
                    if(results2.length !== 0){
                        var idcategory = results2[0].id
                        console.log("masuk")
                        sql = `delete from movcat where idmovie = ${idmovie} and idcategory = ${idcategory}`
                        db.query(sql, (err,results3)=>{

                            if(err) return res.status(500).send({ message: "Error :(", error: err})
                            
                            console.log("delete movcat berhasil")

                            return res.status(200).send(results3)
                        })

                    }else{
                        return res.status(500).send({ message: "Nama Category TIdak ditemukan", error: err})
                    }
                }) 
            }else{
                return res.status(500).send({ message: "Movie Not Found", error: err})
            }
        })  
    },

    addMovCat : (req,res) => {
        console.log(req.query.mov)
        console.log(req.query.cat)
        var sql = `select m.nama as namaMovie, c.nama as namaCat from movcat mc join movies m on mc.idmovie = m.id
        join categories c on mc.idcategory = c.id where m.nama = '${req.query.mov}' and c.nama = '${req.query.cat}'`
        db.query(sql, (err,result)=>{

            if(err) return res.status(500).send({ message: "Error :(", error: err})

            if(result.length !== 0){
                return res.status(500).send({ message: "Nama dan Category sudah dipakai", error: err})
            }
            
            sql = `select id from movies where nama = '${req.query.mov}'`
            db.query(sql, (err,results2)=>{

                if(err) return res.status(500).send({ message: "Error", error: err})
                
                if(results2.length !== 0){
                    var idmovie = results2[0].id
                    sql = `select id from categories where nama = '${req.query.cat}'`
                    db.query(sql, (err,results3)=>{
                        if(err) return res.status(500).send({ message: "Error", error: err})
            
                        if(results3.length !== 0){
                            var idcategory = results3[0].id
                            var data = {
                                idmovie,
                                idcategory
                            }
                            sql = `insert into movcat set ?`
                            db.query(sql, data,(err,finalresult)=>{
                                if(err) return res.status(500).send({ message: "Error :(", error: err})
                                
                                console.log("add movcat berhasil")
                                return res.status(200).send(finalresult)
                            }) 
                        }else{
                            return res.status(500).send({ message: "Category tidak ditemukan", error: err})
                        }
                        
                  
                    })  

                }else{
                    return res.status(500).send({ message: "Movie Tidak Ditemukan", error: err})
                }

     
            })  
            

        })  
    }
}