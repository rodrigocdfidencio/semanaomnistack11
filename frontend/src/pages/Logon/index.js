import React, {useState} from 'react'
import {FiLogIn} from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'
import logoimg from '../../assets/logo.svg'
import heroesimg from '../../assets/heroes.png'

export default function Logon(){
    const [id, setID] = useState('')
    const history = useHistory()
    async function handleLogin(e){
        e.preventDefault()

        try {
            const res = await api.post('sessions', {id})
            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', res.data.name)

            history.push('/profile')
        } catch (err){
            alert('Falha no Login, tente novamente')
        }
    }

    return (
       <div className="logon-container">
       <section className="form">
       <img src={logoimg} alt="Be the Hero"/>

       <form onSubmit={handleLogin}>
        <h1>Faça seu Logon</h1>
        <input placeholder="Sua ID"
        value={id}
        onChange={e => setID(e.target.value)}
        ></input>
        <button className="button" type="submit">Entrar</button>

        <Link className="back-link" to="/register">
        <FiLogIn size={16} color="#e02041" />
        Não tenho cadastro
        </Link>

       </form>
       </section>



       <img src={heroesimg} alt="Heroes"/>
       </div>
    )
}