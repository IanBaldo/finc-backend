import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";

import PageContent from "../../components/PageContent/PageContent.jsx";
import CardBillDropdown from "../../components/CardBillDropdown/CardBillDropdown.jsx";
import Header from "../../components/Header/Header.jsx";
import ExpenseList from "../../components/ExpenseList/ExpenseList.jsx";

import { cast2array } from '../../services/helpers.js';
import { getCardDetails } from '../../services/ApiService.js';

import './CardDetailPage.css';

function CardDetailPage(props) {
    const [ token, setToken ] = useOutletContext()
    const [ contentDisplay, setContentDisplay ] = useState('bills')
    const [ bills, setBills ] = useState({})
    let { id } = useParams()

    useEffect( () => {
        async function getDetails() {
            let response = await getCardDetails(id)
            switch(response.status) {
                case 200:
                    let cardBills = response.data ? response.data : {}
                    setBills(cardBills)
                    break
                case 401:
                    setToken(null)
                    break
                default:
                    console.log(response)
                    alert(response.message)
            }
        }

        getDetails()
    }, [] )
    
    function changeContentDisplay(content) {
        setContentDisplay(content)
    }

    function removeSubscription(id) {
        alert(`TO DO: Remove subscription: ${id}`)
    }

    function openNewSubscriptionModal() {
        alert('TO DO: New subscription modal')
    }

    let headerButton = <a className='button is-link navbar-item' onClick={() => {changeContentDisplay('subscription')}}>Recorrência</a>
    if (contentDisplay == 'subscription') {
        headerButton = <a className='button is-link navbar-item' onClick={() => {changeContentDisplay('bills')}}>Faturas</a>
    }

    return (
        <>
            <Header title="Detalhe" hasBackButton={true} endBtn={headerButton} />
            <PageContent>
                { contentDisplay == 'bills' ? (
                    <>
                        { Object.keys(bills).map( key => {
                            return (
                                <CardBillDropdown key={key} dateTitle={key} expenses={bills[key].expenses} total={bills[key].total} />
                            )
                        })}
                    </>
                ) : (
                    <>
                        <div className="new-subscription-btn">
                            <button className="button" onClick={openNewSubscriptionModal}>
                                <span className="material-icons">add</span>
                                Nova Recorrência
                            </button>
                        </div>
                        <ExpenseList title="Recorrência" items={expenseList} removable={true} callback={removeSubscription} />
                    </>
                )}
            </PageContent>
        </>
    )
}

export default CardDetailPage;