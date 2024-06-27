import React from "react";

import PageAccessValidator from "./components/PageAccessValidator";
import PageContainer from "./components/PageContainer";

import * as authorities from "../constants/authorities";
import FlightDetailsPage from "../pages/flightDetails";

const FlightDetails = (props) => {
    return (
        <PageAccessValidator
            neededAuthorities={[authorities.ENABLE_SEE_SECRET_PAGE]}
        >
            <PageContainer>
                <FlightDetailsPage {...props} />
            </PageContainer>
        </PageAccessValidator>
    );
};

export default FlightDetails;