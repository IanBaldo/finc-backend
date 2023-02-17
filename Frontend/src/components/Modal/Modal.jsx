import React, { useEffect, useState } from "react";

import Card from '../Card/Card.jsx'
import './Modal.css'

function Modal(props) {
    const [ classes, setClasses ] = useState('modal')

    useEffect(() => {
        setClasses(`modal ${props.className}`)
    } , [props.className])

    return (
        <div className={classes}>
            <div className="modal-background" onClick={props.close}></div>
            <div className="modal-content">
                <Card>
                    <div className="modal-title">{props.title}</div>
                    {props.children}
                </Card>
            </div>
        </div>
    )
}

export default Modal;