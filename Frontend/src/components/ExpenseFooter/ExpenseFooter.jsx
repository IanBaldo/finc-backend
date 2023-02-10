import React from "react";

import './ExpenseFooter.css'

function ExpenseFooter (props) {
     return (
        <>
            <div className="list-footer">
                <div className="header">
                    Total
                </div>

                <div className="total-value">
                    R$ {props.value}
                </div>
            </div>
        </>
    )
}

export default ExpenseFooter;