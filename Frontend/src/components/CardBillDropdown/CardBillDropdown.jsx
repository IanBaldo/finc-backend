import React, { useState } from "react";

import './CardBillDropdown.css'
import ExpenseList from "../ExpenseList/ExpenseList.jsx";

function CardBillDropdown(props) {
    const [ open, setOpen ] = useState(false)

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

    function toggle() {
        setOpen(!open)
    }

    return (
        <>
            <div className="month-bill">
                <div className="month-bill-header" onClick={toggle}>
                    <div className="month">Mês</div>
                    <div className="bill">R$ 1000,00</div>
                    <div className="icon">
                        <span className="material-icons">
                            { open ? 'south' : 'east' }
                        </span>
                    </div>
                </div>
                <div className="expense-list">
                    { open ? <ExpenseList title="Compras" items={expenseList} /> : "" }
                </div>
            </div>
        </>
    )
}

export default CardBillDropdown;