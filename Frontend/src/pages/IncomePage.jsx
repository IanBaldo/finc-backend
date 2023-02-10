import React from "react";

import Header from './../components/Header/Header.jsx';

function IncomePage() {

    const incomeList = [
        {
            "date": "Sat, 02 Jul 2022 00:00:00 GMT",
            "id": 1,
            "name": "Income 1",
            "value": 5000
        },
        {
            "date": "Sat, 02 Jul 2022 00:00:00 GMT",
            "id": 2,
            "name": "Income 2",
            "value": 2000
        }

    ]
    
    return(
        <>
            <Header title="Renda"/>
            <div>
                Income Page
            </div>
        </>
    );
}
export default IncomePage;
