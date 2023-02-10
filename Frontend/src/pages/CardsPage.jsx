import React from "react";

import Card from './../components/Card.jsx';
import CreditCard from './../components/CreditCard.jsx';

function CardsPage() {
    const cards = [
        {
            cardName : 'Bradesco 1',
            value : '2000,00'
        },
        {
            cardName : 'Nubank Day',
            value : '200,00'
        },
        {
            cardName : 'Nubank Ian',
            value : '1000,00'
        },
        {
            cardName : 'Santander',
            value : '3000,00'
        }
    ]
    
    return(
        <div>
            {cards.map((card, index) => {
                return (
                    <Card>
                        <CreditCard key={index} cardName={card.cardName} value={card.value} />
                    </Card>
                )
            })}
        </div>
    );
}
export default CardsPage;
