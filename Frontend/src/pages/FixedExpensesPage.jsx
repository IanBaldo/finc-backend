import React from 'react';

import Header from './../components/Header/Header.jsx';
import ExpenseList from './../components/ExpenseList/ExpenseList.jsx';

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
  
  function newFixedExpense() {
    alert('TO DO')
  }

  function removeExpense(id) {
    alert('TO DO: Remove Expense of id: ' + id)
  }

  return(
    <>
      <Header title="Fixas" endBtn={<a className='button is-link navbar-item' onClick={newFixedExpense}>Adicionar</a>} />
      <div>
          <ExpenseList title="Despesas Fixas" items={expenseList} removable={true} callback={removeExpense} />
      </div>
    </>
  );
 }
export default FixedExpensesPage;