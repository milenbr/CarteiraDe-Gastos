import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

const Gastos = () =>{
    const [total,setTotal] = useState([])

    useEffect(()=>{
        const fetchAllTotal = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/totalcarteira")
                setTotal(res.data);
                console.log(res.data[0].nome)

            }catch(err){
                console.log(err)
            }
        }
        fetchAllTotal()
    }, [])


    return(
        <div>
            <h1>Total</h1>
            <div className="total">
            
                {total.map((total) => (
                    <div className="total" key={total.id}>
                        <h2>{livro.nome}</h2>
                        <p>{livro.descricao}</p>
                        <span>{livro.preco}</span>
                        <button className="delete" onClick={()=>delEntrada(entrada.id)}>DELETAR</button>
                        <button className="atualizar"><Link to={`/atualizar/${entrada.id}`}>ATUALIZAR</Link></button>
                    </div>
                ))}
            </div>
            <button>
                <Link to="/adicionar">NOVA ENTRADA</Link>
            </button>
        
        </div>
    )
}

export default Carteira