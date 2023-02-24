import express from "express"; 
import mysql from "mysql";
 

const app = express() 

 

const db = mysql.createConnection({ 
    host:"localhost", 
    user:"root", 
    password:"", 
    database:"financeiro" 

}); 


app.use(express.json()); 

 

 app.get("/", (req, res)=> { 

    res.json("Oi, Este é o backend!") 

 }) 

 //SELECIONAR ENTRADA DE VALORES

app.get("/entradas", (req, res)=>{
    const q = "SELECT * FROM entrada"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

//SELECIONAR TOTAL ENTRADA DE VALORES

app.get("/totalentradas", (req, res)=>{
    const q = "SELECT SUM(valorentrada) FROM entrada AS TotalEntradas"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

//SELECIONAR SAIDA DE VALORES

app.get("/saidas", (req, res)=>{
    const q = "SELECT * FROM saida"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

//SELECIONAR TOTAL ENTRADA DE SAIDA

app.get("/totalsaidas", (req, res)=>{
    const q = "SELECT SUM(valorsaida) FROM saida AS TotalSaida"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
 

//OPERAÇÃO

app.get("/totalcarteira", (req, res)=>{
    const q = "select (SELECT SUM(valorentrada) FROM entrada) - (SELECT SUM(valorsaida) FROM saida) as TotalCarteira"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

 //INSERIR VALORES ENTRADA
app.post("/inserirentrada", (req,res)=>{
    const q = "INSERT INTO entrada (`descricao`, `data`, `valorentrada`) VALUES (?)"
    const values = [
        req.body.descricao,
        req.body.data,
        req.body.valorentrada,
    ]

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Seu valor de entrada foi adicionado")
    })
})

 //INSERIR VALORES SAIDA
 app.post("/inserirsaida", (req,res)=>{
    const q = "INSERT INTO saida (`descricao`, `data`, `valorsaida`) VALUES (?)"
    const values = [
        req.body.descricao,
        req.body.data,
        req.body.valorsaida,
    ]

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Seu valor de saida foi adicionado")
    })
})


//DELETAR UMA ENTRADA
app.delete("/entrada/:id", (req, res)=>{
    const EntradaId = req.params.id;
    const q = "DELETE FROM entrada  WHERE id = ?"

    db.query(q,[EntradaId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Seu valor adicionado em entrada foi deletado")
    })
})

//DELETAR UMA SAIDA
app.delete("/saida/:id", (req, res)=>{
    const SaidaId = req.params.id;
    const q = "DELETE FROM saida WHERE id = ?"

    db.query(q,[SaidaId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Seu valor adicionado em saida foi deletado")
    })
})

//ATUALIZAR ENTRADA
app.put("/entrada/:id", (req, res)=>{
    const EntradaId = req.params.id;
    const q = "UPDATE entrada SET `descricao` = ?, `data`= ?, `valorentrada`= ? WHERE id = ?"

    const values = [
        req.body.descricao,
        req.body.data,
        req.body.valorentrada
    ]
    db.query(q,[...values,EntradaId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Sua entrada atualizada com sucesso!")
    })
})


 //ATUALIZAR SAIDA
app.put("/saida/:id", (req, res)=>{
    const SaidaId = req.params.id;
    const q = "UPDATE saida SET `descricao` = ?, `data`= ?, `valorsaida`= ? WHERE id = ?"

    const values = [
        req.body.descricao,
        req.body.data,
        req.body.valorsaida
    ]
    db.query(q,[...values,SaidaId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Sua saida atualizada com sucesso!")
    })
})


 //ATUALIZAR VALORES
 app.put("/total", (req, res)=>{
    const SaidaId = req.params.id;
    const q = "UPDATE total SET `total` = ?, `data`= ?, `valorsaida`= ? WHERE id = ?"

    const values = [
        req.body.descricao,
        req.body.data,
        req.body.valorsaida
    ]
    db.query(q,[...values,SaidaId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Sua saida atualizada com sucesso!")
    })
})


app.listen(8800,()=>{ 

    console.log("Backend conectado!!!") 

}); 