import React, { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router";

import Header from '../../components/Header/Header.jsx';
import ExpenseList from '../../components/ExpenseList/ExpenseList.jsx'
import PageContent from "../../components/PageContent/PageContent.jsx";
import Modal from "../../components/Modal/Modal.jsx";

import { getIncome, removeIncomeById, addIncome } from '../../services/ApiService.js';

function IncomePage() {
    let newIcomeBtn = <a className="button is-link" onClick={openNewIncomeModal}>Adicionar</a>
    const [ token, setToken ] = useOutletContext()
    const [ modalState , setModalState ] = useState('')
    const [ incomeList, setIncomeList ] = useState([])

    let newIncomeName = useRef()
    let newIncomeValue = useRef()
    let newIncomeDate = useRef()
    let newIncomeIsRecurrent = useRef()

    useEffect( () => {
        async function getIncomeList() {
            let response = await getIncome()
            switch(response.status) {
                case 200:
                    response.data ? setIncomeList(response.data) : ''
                    break;
                case 401:
                    setToken(null)
                    break;
                default:
                    console.log(response)
                    alert(response.message)
            }
        }
    
        getIncomeList()
    }, [])
  
    function openNewIncomeModal() {
        setModalState('is-active')
    }

    function closeModal() {
        setModalState('')
    }

    async function addNewIncome(e) {
        e.preventDefault()

        let incomeData = {
            name: newIncomeName.current.value,
            value: newIncomeValue.current.value,
            date: newIncomeDate.current.value,
            is_recurrent: newIncomeIsRecurrent.current.value
        }
        
        let response = await addIncome(incomeData)
        console.log(response)
        switch(response.status) {
            case 201:
                // toast?
                let updatedIncomeList = [ ...incomeList, incomeData]
                setIncomeList(updatedIncomeList)
                newIncomeName.current.value = ''
                newIncomeValue.current.value = ''
                newIncomeDate.current.value = ''
                newIncomeIsRecurrent.current.valu = ''
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
    
    async function removeIncome(id) {
        let response = await removeIncomeById(id)
        switch(response.status) {
            case 201:
                // TO DO: Toast?
                console.log('Removed Income: ' + id)
                let updatedIncomeList = incomeList.filter ( income => income.id != id )
                setIncomeList(updatedIncomeList)
                break
            case 401:
                setToken(null)
                break;
            default:
                console.log(response)
                alert(response.message)
        }
    }
    
    return(
        <>
            <Header title="Renda" endBtn={newIcomeBtn} />
            <PageContent>
                <ExpenseList title="Renda" items={incomeList} removable={true} callback={removeIncome} />
            </PageContent>

            <Modal className={modalState} title="Nova Renda" close={closeModal}>
                <form className="form" onSubmit={addNewIncome}>
                    <div className="form-fields">
                        <div className="row">
                            <div className="field">
                                <label className="label">Nome</label>
                                <input className="input" ref={newIncomeName}/>
                            </div>
                            <div className="field">
                                <label className="label">Valor</label>
                                <input className="input" ref={newIncomeValue} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="field">
                                <label className="label">Data</label>
                                <input className="input" ref={newIncomeDate} />
                            </div>
                            <label className="checkbox">
                                <input type="checkbox" ref={newIncomeIsRecurrent} />
                                Recorrente?
                            </label>
                        </div>
                    </div>
                    <div className="form-footer">
                        <button type="submit" className="button is-link">Adicionar</button>
                        <button className="button is-ghost" onClick={closeModal}>Cancelar</button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
export default IncomePage;
