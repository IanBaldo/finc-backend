import React from "react";

import Header from '../../components/Header/Header.jsx';
import ExpenseList from '../../components/ExpenseList/ExpenseList.jsx'
import PageContent from "../../components/PageContent/PageContent.jsx";

function IncomePage() {

    const incomeList = [
        {
            "date": "Sat, 02 Jul 2022 00:00:00 GMT",
            "id": 1,
            "name": "Income 1",
            "value": 5000
        },
        {
            "date": "Sat, 02 Jul 2022 00:00:00 GMT",
            "id": 2,
            "name": "Income 2",
            "value": 2000
        }

    ]

    let newIcomeBtn = <a className="button is-link" onClick={newIncome}>Adicionar</a>

    function newIncome() {
        alert('TO DO')
    }

    function removeIncome(id) {
        alert(`remove income: ${id}`)
    }
    
    return(
        <>
            <Header title="Renda" endBtn={newIcomeBtn} />
            <PageContent>
                <ExpenseList title="Renda" items={incomeList} removable={true} callback={removeIncome} />
            </PageContent>
        </>
    );
}
export default IncomePage;
