import React from "react";

import './CreditCard.css'

function CreditCard({ card, onClick }) {

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
            <div onClick={ () => onClick(card.id)}>
                <div className="top-row">
                    <div className="bank-name">
                        { card.card }
                        <a className="button is-ghost" onClick={promptCardRemoval}>
                            <span className="material-icons icon-danger">delete</span>
                        </a>
                    </div>
                </div>
                <div className="value">
                    R$ { card.bill }
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