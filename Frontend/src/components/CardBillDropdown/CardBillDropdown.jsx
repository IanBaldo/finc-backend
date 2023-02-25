import React, { useState } from "react";

import './CardBillDropdown.css'
import ExpenseList from "../ExpenseList/ExpenseList.jsx";

function CardBillDropdown({ dateTitle, expenses, total }) {
    const [ open, setOpen ] = useState(false)

    function toggle() {
        setOpen(!open)
    }

    return (
        <>
            <div className="month-bill">
                <div className="month-bill-header" onClick={toggle}>
                    <div className="month">{ dateTitle }</div>
                    <div className="bill">R$ { total }</div>
                    <div className="icon">
                        <span className="material-icons">
                            { open ? 'south' : 'east' }
                        </span>
                    </div>
                </div>
                <div className="expense-list">
                    { open ? <ExpenseList title="Compras" items={expenses} /> : "" }
                </div>
            </div>
        </>
    )
}

export default CardBillDropdown;