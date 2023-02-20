import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageContent from "../../components/PageContent/PageContent.jsx";
import './LoginPage.css'

import { requestLogin } from '../../services/ApiService.js';

function LoginPage(props) {
    const navigate = useNavigate();
    const [ formData, setFormData ] = useState({
        username: '',
        password: ''
    })

    function handleUsernameChange(e) {
        setFormData({
            ...formData,
            username: e.target.value
        })
    }

    function handlePasswordChange(e) {
        setFormData({
            ...formData,
            password: e.target.value
        })
    }

    async function login(e) {
        e.preventDefault()
       
        let response = await requestLogin(formData)
        if (!response)
            alert('Login Falhou!')

        props.setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
        navigate('/status')
    }

    
    return (
        <>
            <PageContent>
                <form className="login-form" onSubmit={login}>
                    <div className="field">
                        <label className="label">Usuário</label>
                        <input autoFocus className="input" value={formData.username} onChange={handleUsernameChange} />
                    </div>
                    <div className="field">
                        <label className="label">Senha</label>
                        <input className="input" type="password" value={formData.password} onChange={handlePasswordChange} />
                    </div>
                    <div className="login-button">
                        <button className="button is-link" type="submit">Entrar</button>
                    </div>
                </form>
            </PageContent>
        </>
    )
}

export default LoginPage;