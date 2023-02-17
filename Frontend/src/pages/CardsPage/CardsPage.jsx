import React, { useState } from "react";

import CardList from '../../components/CardList/CardList.jsx';
import Header from '../../components/Header/Header.jsx';
import PageContent from "../../components/PageContent/PageContent.jsx";
import Modal from "../../components/Modal/Modal.jsx";

import './CardsPage.css'

function CardsPage() {
    const cards = [
        {
            bank: "Bank 1",
            bill: 1000.0,
            card: "Card 1",
            limit: 3000.0
        },
        {
            bank: "Bank 1",
            bill: 200.0,
            card: "Card 2",
            limit: 500.0
        },
        {
            bank: "Bank 2",
            bill: 1300.0,
            card: "Card 3",
            limit: 700.0
        },
        {
            bank: "Bank 3",
            bill: 400.0,
            card: "Card 4",
            limit: 2000.0
        },
        
    ]

    let newCardButton = <a className="button is-link" onClick={openNewCardModal}>Adicionar</a>
    const [ modalState, setModalState ] = useState('')
    

    function openNewCardModal() {
        setModalState('is-active')
    }

    function closeModal() {
        setModalState('')
    }

    return(
        <>
            <Header title="Cartões" endBtn={newCardButton} />
            <PageContent>
                <CardList cards={cards} />
            </PageContent>

            <Modal className={modalState} title="Adicionar Cartão" close={closeModal}>
                <div className="form">
                    <div className="form-fields">
                        <div className="row">
                            <div className="field">
                                <label className="label">Banco</label>
                                <input className="input" />
                            </div>
                            <div className="field">
                                <label className="label">Nome do Cartão</label>
                                <input className="input" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="field">
                                <label className="label">Fatura</label>
                                <input className="input" />
                            </div>
                            <div className="field">
                                <label className="label">Limite</label>
                                <input className="input" />
                            </div>
                        </div>
                    </div>
                    <div className="form-footer">
                        <button className="button is-link">Adicionar</button>
                        <button className="button is-ghost" onClick={closeModal}>Cancelar</button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
export default CardsPage;
