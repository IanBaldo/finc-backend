import React from "react";
import { useNavigate } from "react-router";

import Card from '../Card/Card.jsx';
import CreditCard from './../CreditCard/CreditCard.jsx';

function CardList(props) {
    const navigate = useNavigate();

    function goToDetails() {
        navigate('/cards/details')
    }

    return (
        <>
            {props.cards.map((card, index) => {
                return (
                    <Card key={index}>
                        <CreditCard key={index} cardName={card.card} value={card.bill} onClick={goToDetails} />
                    </Card>
                )
            })}
        </>
    )
}

export default CardList;