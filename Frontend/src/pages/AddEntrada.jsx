import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddEntrada = () =>{
    const [entrada, setEntrada] = useState({
        descricao:"",
        data:"",
        valorentrada:"",
    });

    const navigate = useNavigate()

    const formChange = (e) =>{
        setEntrada((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const formBtnClick = async e =>{
        e.preventDefault()
        try {
           await axios.post("http://localhost:8800/inserirentrada", entrada ) 
            navigate("/inserirentrada")
        } catch (err) {
            console.log(err)
        }
    }
    console.log(entrada)
    return(
        <div className='form'>
           <h1>Adicionar Nova Entrada</h1> 
           <input type="text" placeholder="descrição" onChange={formChange} name="descricao"/>
           <input type="text" placeholder="data" onChange={formChange} name="data"/>
           <input type="text" placeholder="valor entrada" onChange={formChange} name="valorentrada"/>
            <button onClick={formBtnClick}>ADICIONAR</button>
        </div>
    )
}

export default AddEntrada


