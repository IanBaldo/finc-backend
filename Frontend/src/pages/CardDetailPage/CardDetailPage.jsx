import React from "react";

import PageContent from "../../components/PageContent/PageContent.jsx";
import CardBillDropdown from "../../components/CardBillDropdown/CardBillDropdown.jsx";
import Header from "../../components/Header/Header.jsx";

function CardDetailPage(props) {
    return (
        <>
            <Header title="Detalhe" hasBackButton={true} />
            <PageContent>
                <CardBillDropdown />
            </PageContent>
        </>
    )
}

export default CardDetailPage;