import React from "react";

import './PageContent.css'

function PageContent(props) {
    return (
        <>
            <div className="card content">
                {props.children}
            </div>
        </>
    )
}

export default PageContent;