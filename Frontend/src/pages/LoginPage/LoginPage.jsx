import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageContent from "../../components/PageContent/PageContent.jsx";
import './LoginPage.css'

import { requestLogin } from '../../services/ApiService.js';

function LoginPage({ setToken }) {
    const navigate = useNavigate();
    let username = useRef()
    let password = useRef()
    
    
    async function login(e) {
        e.preventDefault()
        
        let formData = {
            username: username.current.value,
            password: password.current.value
        }

        if (!formData.username || !formData.password) return
        
        let response = await requestLogin(formData)
        if (response.status != 200) {
            password.current.value = ''
            return
        }

        let page = localStorage.getItem('active_tab') || 'status'

        setToken(response.data.token)
        navigate(`/${page}`)
    }

    
    return (
        <>
            <PageContent>
                <form className="login-form" onSubmit={login}>
                    <div className="field">
                        <label className="label">Usuário</label>
                        <input autoFocus className="input" ref={username} />
                    </div>
                    <div className="field">
                        <label className="label">Senha</label>
                        <input className="input" type="password" ref={password} />
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