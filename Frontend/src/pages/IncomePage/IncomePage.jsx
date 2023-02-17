import React, { useState } from "react";

import Header from '../../components/Header/Header.jsx';
import ExpenseList from '../../components/ExpenseList/ExpenseList.jsx'
import PageContent from "../../components/PageContent/PageContent.jsx";
import Modal from "../../components/Modal/Modal.jsx";

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

    let newIcomeBtn = <a className="button is-link" onClick={openNewIncomeModal}>Adicionar</a>

    const [ modalState , setModalState ] = useState('')
  
    function openNewIncomeModal() {
        setModalState('is-active')
    }

    function closeModal() {
        setModalState('')
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

            <Modal className={modalState} title="Nova Renda" close={closeModal}>
                <div className="form">
                    <div className="form-fields">
                        <div className="row">
                        <div className="field">
                            <label className="label">Nome</label>
                            <input className="input" />
                        </div>
                        <div className="field">
                            <label className="label">Valor</label>
                            <input className="input" />
                        </div>
                        </div>
                        <div className="row">
                        <div className="field">
                            <label className="label">Data</label>
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
export default IncomePage;
