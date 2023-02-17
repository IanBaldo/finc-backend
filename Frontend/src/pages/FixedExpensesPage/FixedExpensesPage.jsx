import React, { useState } from 'react';

import Header from '../../components/Header/Header.jsx';
import ExpenseList from '../../components/ExpenseList/ExpenseList.jsx';
import PageContent from '../../components/PageContent/PageContent.jsx';
import Modal from '../../components/Modal/Modal.jsx';

function FixedExpensesPage() {
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

  const [ modalState , setModalState ] = useState('')
  
  function openNewFixedExpenseModal() {
    setModalState('is-active')
  }

  function closeModal() {
    setModalState('')
  }

  function removeExpense(id) {
    alert('TO DO: Remove Expense of id: ' + id)
  }

  return(
    <>
      <Header title="Fixas" endBtn={<a className='button is-link navbar-item' onClick={openNewFixedExpenseModal}>Adicionar</a>} />
      <PageContent>
        <ExpenseList title="Despesas Fixas" items={expenseList} removable={true} callback={removeExpense} />
      </PageContent>

      <Modal className={modalState} title="Nova Despesa Fixa" close={closeModal}>
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
export default FixedExpensesPage;