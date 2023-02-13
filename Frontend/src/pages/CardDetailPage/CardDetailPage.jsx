import React, { useState } from "react";

import PageContent from "../../components/PageContent/PageContent.jsx";
import CardBillDropdown from "../../components/CardBillDropdown/CardBillDropdown.jsx";
import Header from "../../components/Header/Header.jsx";
import ExpenseList from "../../components/ExpenseList/ExpenseList.jsx";


import './CardDetailPage.css';

function CardDetailPage(props) {
    const [ contentDisplay, setContentDisplay ] = useState('bills')
    const expenseList = [
        {
          "date": "Mon, 25 Jul 2022 00:00:00 GMT",
          "dt_created": "Mon, 25 Jul 2022 00:00:00 GMT",
          "id": 15,
          "name": "Netflix",
          "value": 55.0
        },
        {
          "date": "Mon, 25 Jul 2022 00:00:00 GMT",
          "dt_created": "Mon, 25 Jul 2022 00:00:00 GMT",
          "id": 16,
          "name": "Aluguel",
          "value": 1000.0
        }
    ]

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
                        <CardBillDropdown />
                        <CardBillDropdown />
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