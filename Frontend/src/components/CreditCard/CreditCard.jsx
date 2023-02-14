import React from "react";

import './CreditCard.css'

function CreditCard(props) {

    function addValue(e) {
        e.stopPropagation()
        alert('TO DO')
    }

    function subtractValue(e) {
        e.stopPropagation()
        alert('TO DO')
    }

    function changeBill(e) {
        e.stopPropagation()
        alert('TO DO')
    }

    function promptCardRemoval(e) {
        e.stopPropagation()
        alert('TO DO')
    }

    return (
        <>
            <div onClick={props.onClick}>
                <div className="bank-name">
                    <div className="top-row">
                        {props.cardName}
                        <a className="button is-ghost" onClick={promptCardRemoval}>
                            <span className="material-icons icon-danger">delete</span>
                        </a>
                    </div>
                </div>
                <div className="value">
                    R$ {props.value}
                </div>
                <div className="button-group">
                    <button className="button" onClick={changeBill}>Substituir</button>
                    <button className="button" onClick={subtractValue}>Subtrair</button>
                    <button className="button" onClick={addValue}>Somar</button>
                </div>
            </div>
        </>
    )
}

export default CreditCard;