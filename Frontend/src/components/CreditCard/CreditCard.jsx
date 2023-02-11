import React from "react";

import './CreditCard.css'

function CreditCard(props) {
    return (
        <>
            <div onClick={props.onClick}>
                <div className="bank-name">
                    {props.cardName}
                </div>
                <div className="value">
                    R$ {props.value}
                </div>
                <div className="button-group">
                    <button className="button">Substituir</button>
                    <button className="button">Subtrair</button>
                    <button className="button">Somar</button>
                </div>
            </div>
        </>
    )
}

export default CreditCard;