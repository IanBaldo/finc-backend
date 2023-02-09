import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import './../css/MainTabs.css';


function MainTabs() {
    const navigate = useNavigate();
    
    const handleClick = (route) => {
        return navigate(`/${route}`)
    }

    return (
        <>
            <div className="tabs is-toggle is-fullwidth">
                <ul>
                    <li className="is-active" onClick={() => handleClick('fix')}>
                        <a>
                            <span>Fixas</span>
                        </a>
                    </li>
                    <li onClick={() => handleClick('cards')}>
                        <a>
                            <span>Cartões</span>
                        </a>
                    </li>
                    <li onClick={() => handleClick('income')}>
                        <a>
                            <span>Renda</span>
                        </a>
                    </li>
                    <li onClick={() => handleClick('status')}>
                        <a>
                            <span>Status</span>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
    
}

export default MainTabs;