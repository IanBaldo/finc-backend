import React from "react";

import ExpenseHeader from "../ExpenseHeader/ExpenseHeader.jsx";
import ExpenseItem from "../ExpenseItem/ExpenseItem.jsx";
import ExpenseFooter from "../ExpenseFooter/ExpenseFooter.jsx";

function ExpenseList ({ title, items, removable, callback }) {
    let total = 0
    let extraProp = {}
    
    if (removable) {
        extraProp = {
            removable : removable,
            callback : callback
        }
    }

    return (
        <>
            <div>
                { title ? <ExpenseHeader title={title}/> : "" }
                { items.map( (expense, index) => {
                    total += parseFloat(expense.value)
                    return (
                        <ExpenseItem key={index} itemId={expense.id} title={expense.name} value={expense.value} {...extraProp} />
                    )
                })}
                <ExpenseFooter value={total} />
            </div>
        </>
    )
}

export default ExpenseList;