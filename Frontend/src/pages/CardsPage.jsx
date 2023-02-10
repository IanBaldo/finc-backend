import React from "react";

import CardList from '../components/CardList/CardList.jsx';
import Header from './../components/Header/Header.jsx';

function CardsPage() {
    const cards = [
        {
            cardName : 'Card 1',
            value : '2000,00'
        },
        {
            cardName : 'Card 2',
            value : '200,00'
        },
        {
            cardName : 'Card 3',
            value : '1000,00'
        },
        {
            cardName : 'Card 4',
            value : '3000,00'
        }
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
