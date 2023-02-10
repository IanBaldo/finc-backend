import React from "react";
import { useNavigate } from "react-router";


import './Header.css';

function Header (props) {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1)
    }

     return (
        <>
            <nav className="navbar is-link">

                <div className="navbar-menu">
                    <div className="navbar-start">
                        {props.hasBackButton ? <a className="navbar-item" onClick={goBack}>Voltar</a> : ""}
                    </div>
                    <div className="nav-title">
                        {props.title}
                    </div>
                    <div className="navbar-end">
                        <div className="buttons">
                            {props.endBtn ? props.endBtn : ""}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;