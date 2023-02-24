import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddSaida = () =>{
    const [saida, setSaida] = useState({
        descricao:"",
        data:"",
        valorsaida:"",
    });

    const navigate = useNavigate()

    const formChange = (e) =>{
        setSaida((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const formBtnClick = async e =>{
        e.preventDefault()
        try {
           await axios.post("http://localhost:8800/inserirsaida", saida ) 
            navigate("/inserirsaidada")
        } catch (err) {
            console.log(err)
        }
    }
    console.log(saida)
    return(
        <div className='form'>
           <h1>Adicionar Nova Saida</h1> 
           <input type="text" placeholder="descrição" onChange={formChange} name="descricao"/>
           <input type="text" placeholder="data" onChange={formChange} name="data"/>
           <input type="text" placeholder="valor saida" onChange={formChange} name="valorsaida"/>
            <button onClick={formBtnClick}>ADICIONAR</button>
        </div>
    )
}

export default AddSaida