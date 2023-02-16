import React, { useEffect, useState } from "react";

import Card from '../Card/Card.jsx'

function Modal(props) {
    const [ classes, setClasses ] = useState('modal')

    useEffect(() => {
        console.log(classes, props.className)
        setClasses(`${classes} ${props.className}`)
    } , [props.className])
    
    function close(e) {
        e.stopPropagation()
        setClasses('modal')
    }

    return (
        <div className={classes}>
            <div className="modal-background" onClick={close}></div>
            <div className="modal-content">
                <Card>
                    <p>Content</p>
                </Card>
            </div>
        </div>
    )
}

export default Modal;