import React from "react";

import './ExpenseItem.css';

function ExpenseItem (props) {
     return (
        <>
            <div className="item">
                <div className="item-title">
                    {props.title}
                </div>
                
                <div className="item-value">
                    R$ {props.value}
                </div>

                <div className="item-extra">
                    {props.removable ? <a className="button is-ghost is-small" onClick={() => props.callback(props.itemId)}> <span className="material-icons icon-danger">remove_circle</span> </a> : ""}
                    {props.extra ? props.extra : ""}
                </div>
            </div>
        </>
    )
}

export default ExpenseItem;