import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import './../css/MainTabs.css';

const Tabs = [
    {
        title: "Fixas",
        link: "fix"
    },
    {
        title: "Cartões",
        link: "cards"
    },
    {
        title: "Renda",
        link: "income"
    },
    {
        title: "Status",
        link: "status"
    }
]

function MainTabs() {
    const navigate = useNavigate();
    const [ activeTab, setActiveTab ] = useState('fix')
    
    function handleClick (tabLink) {
        setActiveTab(tabLink)
        return navigate(`/${tabLink}`)
    }

    return (
        <>
            <div className="tabs is-toggle is-fullwidth">
                <ul>
                    {Tabs.map((tab, index) => {
                        return (
                            <li key={index} className={`${activeTab == tab.link ? "is-active" : ""}`} onClick={() => handleClick(tab.link)}>
                                <a>
                                    <span>{tab.title}</span>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    );
    
}

export default MainTabs;