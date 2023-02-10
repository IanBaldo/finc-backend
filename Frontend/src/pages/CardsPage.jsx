import React from "react";

import CardList from '../components/CardList/CardList.jsx';
import Header from './../components/Header/Header.jsx';

function CardsPage() {
    const cards = [
        {
            bank: "Bank 1",
            bill: 1000.0,
            card: "Card 1",
            limit: 3000.0
        },
        {
            bank: "Bank 1",
            bill: 200.0,
            card: "Card 2",
            limit: 500.0
        },
        {
            bank: "Bank 2",
            bill: 1300.0,
            card: "Card 3",
            limit: 700.0
        },
        {
            bank: "Bank 3",
            bill: 400.0,
            card: "Card 4",
            limit: 2000.0
        },
        
    ]
    
    return(
        <>
            <Header title="Cartões"/>
            <div>
                <CardList cards={cards} />
            </div>
        </>
    );
}
export default CardsPage;
