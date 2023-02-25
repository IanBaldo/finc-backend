import React from "react";
import { useNavigate } from "react-router";

import Card from '../Card/Card.jsx';
import CreditCard from './../CreditCard/CreditCard.jsx';

function CardList({ cards }) {
    const navigate = useNavigate();

    function goToDetails(id) {
        navigate('/cards/details/'+id)
    }

    return (
        <>
            {cards.map((card, index) => {
                return (
                    <Card key={index}>
                        <CreditCard key={index} card={card} onClick={goToDetails} />
                    </Card>
                )
            })}
        </>
    )
}

export default CardList;