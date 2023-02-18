import React from "react";

import PageContent from "../../components/PageContent/PageContent.jsx";
import './LoginPage.css'

function LoginPage(props) {

    function login() {
        // TO DO: Send Request and fill token
        let token = 'my_token'
        
        props.setToken(token)
        localStorage.setItem('token', token)
    }
    
    return (
        <>
            <PageContent>
                <form className="login-form" onSubmit={login}>
                    <div className="field">
                        <label className="label">Usuário</label>
                        <input className="input" />
                    </div>
                    <div className="field">
                        <label className="label">Senha</label>
                        <input className="input" />
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