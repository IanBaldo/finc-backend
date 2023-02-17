import React, { useEffect, useState } from "react";

import Card from '../Card/Card.jsx'

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
                    <p>Content</p>
                </Card>
            </div>
        </div>
    )
}

export default Modal;