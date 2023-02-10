import React from "react";

import './ExpenseHeader.css'

function ExpenseHeader (props) {
     return (
        <>
            <div className="list-header">{props.title}</div>
        </>
    )
}

export default ExpenseHeader;