import React from "react";

import Card from "../Card/Card.jsx";
import './StatusCard.css'

function StatusCard(props) {
    return (
        <>
            <Card>
                <div className="top-row">
                    <div className="img">
                        <span className="material-icons icon-danger">dangerous_align_right</span>
                    </div>
                    <div className="values">
                        Renda R$ 2000,00
                        <br/>
                        Gastos R$ 1000,00
                    </div>
                </div>
                <div className="bottom-row">
                    <div className="month-status">R$ 1000,00</div>
                </div>
            </Card>
        </>
    )
}

export default StatusCard;