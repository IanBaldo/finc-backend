import React from "react";

import ExpenseHeader from "../ExpenseHeader/ExpenseHeader.jsx";
import ExpenseItem from "../ExpenseItem/ExpenseItem.jsx";
import ExpenseFooter from "../ExpenseFooter/ExpenseFooter.jsx";

function ExpenseList (props) {
    let total = 0
    let extraProp = {}

    if (props.removable) {
        extraProp = {
            removable : props.removable,
            callback : props.callback
        }
    }

    return (
        <>
            <div>
                <ExpenseHeader title={props.title}/>
                {props.items.map( (expense, index) => {
                    total += expense.value
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