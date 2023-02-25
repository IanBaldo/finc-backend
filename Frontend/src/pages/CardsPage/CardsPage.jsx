import React, { useEffect, useState } from "react";

import CardList from '../../components/CardList/CardList.jsx';
import Header from '../../components/Header/Header.jsx';
import PageContent from "../../components/PageContent/PageContent.jsx";
import Modal from "../../components/Modal/Modal.jsx";

import { getCardList } from '../../services/ApiService.js';
import { cast2array } from '../../services/helpers.js';

import './CardsPage.css'
import { useOutletContext } from "react-router";

function CardsPage() {
    const [ token, setToken ] = useOutletContext()
    const [ cardList, setCardList ] = useState([])
    const [ modalState, setModalState ] = useState('')
    let newCardButton = <a className="button is-link" onClick={openNewCardModal}>Adicionar</a>
    

    useEffect( () => {
        async function getCards() {
            // Load Card List
            let response = await getCardList()
            switch(response.status) {
                case 200:
                    setCardList(cast2array(response.data))
                    break
                case 401:
                    setToken(null)
                    break
                default:
                    console.log(response)
                    alert(response.message)
            }
        }

        getCards()
    }, [])

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
                <CardList cards={cardList} />
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
