import React, { useEffect, useRef, useState } from 'react';

import Header from '../../components/Header/Header.jsx';
import ExpenseList from '../../components/ExpenseList/ExpenseList.jsx';
import PageContent from '../../components/PageContent/PageContent.jsx';
import Modal from '../../components/Modal/Modal.jsx';

import { getFixedExpenses, addNewFixedExpense, removeFixedExpense } from '../../services/ApiService.js';
import { useOutletContext } from 'react-router';

function FixedExpensesPage() {
    const [ token, setToken ] = useOutletContext()
    const [ modalState , setModalState ] = useState('')
    const [ expenseList, setExpenseList ] = useState([])
    let newExpenseName = useRef()
    let newExpenseValue = useRef()

    useEffect( () => {
        async function getExpenses() {
            let response = await getFixedExpenses()
            switch(response.status) {
                case 200:
                    response.data ? setExpenseList(response.data) : ''
                    break
                case 401:
                    setToken(null)
                    break
                default:
                    console.log(response)
                    alert(response.message)
            }
        }

        getExpenses()
    }, [])
  
    function openNewFixedExpenseModal() {
        setModalState('is-active')
    }

    function closeModal() {
        setModalState('')
        newExpenseName.current.value = null
        newExpenseValue.current.value = null
    }

    async function removeExpense(id) {
        let response = await removeFixedExpense(id)
        switch(response.status) {
            case 201:
                let updatedList = expenseList.filter( expense => expense.id != id)
                setExpenseList(updatedList)
                break;
            case 401:
                setToken(null)
                break;
            default:
                console.log(response)
                alert(response.message)
        }
    }

    async function handleSubmitNewExpense(e) {
        e.preventDefault()

        let newExpense = {
            name: newExpenseName.current.value,
            value: newExpenseValue.current.value,
            is_recurrent: true
        }

        if (!newExpense.name || !newExpense.value) return

        let response = await addNewFixedExpense(newExpense)
        switch(response.status) {
            case 201:
                setExpenseList([...expenseList, newExpense])
                break
            case 401:
                setToken(null)
                break
            default:
                console.log(response)
                alert(response.message)
        }
        closeModal()
    }

    return(
        <>
            <Header title="Fixas" endBtn={<a className='button is-link navbar-item' onClick={openNewFixedExpenseModal}>Adicionar</a>} />
            <PageContent>
                <ExpenseList title="Despesas Fixas" items={expenseList} removable={true} callback={removeExpense} />
            </PageContent>

            <Modal className={modalState} title="Nova Despesa Fixa" close={closeModal}>
                <form className="form" onSubmit={handleSubmitNewExpense}>
                    <div className="form-fields">
                        <div className="row">
                        <div className="field">
                            <label className="label">Nome</label>
                            <input className="input" ref={newExpenseName}/>
                        </div>
                        <div className="field">
                            <label className="label">Valor</label>
                            <input className="input" ref={newExpenseValue} />
                        </div>
                        </div>
                    </div>
                    <div className="form-footer">
                        <button className="button is-link" type='submit'>Adicionar</button>
                        <button className="button is-ghost" onClick={closeModal}>Cancelar</button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
export default FixedExpensesPage;