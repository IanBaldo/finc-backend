import React from "react";

import Header from "../../components/Header/Header.jsx";
import StatusCard from "../../components/StatusCard/StatusCard.jsx";
import PageContent from "../../components/PageContent/PageContent.jsx";

import './StatusPage.css';

function StatusPage() {

    const monthlyReport = {
        "cards_bills": {
            "bill": 0.0,
            "name": "Card 1"
        },
        "fixed_expenses": [
            {
                "name": "Expense 1",
                "value": 55.0
            },
            {
                "name": "Expense 2",
                "value": 1000.0
            }
        ],
        "income": [
            {
                "date": "Sat, 02 Jul 2022 00:00:00 GMT",
                "name": "Income 1",
                "value": 5000
            },
            {
                "date": "Sat, 02 Jul 2022 00:00:00 GMT",
                "name": "Income 2",
                "value": 2000
            }
        ]
    }
    
    return(
        <>
            <Header title="Status"/>
            <PageContent>
                <div className="status-title">
                    Mês Atual
                </div>
                <StatusCard />
            </PageContent>
        </>
    );
}
export default StatusPage;
