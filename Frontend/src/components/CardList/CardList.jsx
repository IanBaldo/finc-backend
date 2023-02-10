import React from "react";

import Card from '../Card/Card.jsx';
import CreditCard from './../CreditCard/CreditCard.jsx';

function CardList(props) {
    return (
        <>
            {props.cards.map((card, index) => {
                return (
                    <Card key={index}>
                        <CreditCard key={index} cardName={card.card} value={card.bill} />
                    </Card>
                )
            })}
        </>
    )
}

export default CardList;