import * as authorities from 'constants/authorities';
import FlightPage from 'pages/flights';
import React from 'react';

import PageAccessValidator from './components/PageAccessValidator';
import PageContainer from './components/PageContainer';

const Flights = (props) => {
    return (
        <PageAccessValidator
            neededAuthorities={[authorities.ENABLE_SEE_SECRET_PAGE]}
        >
            <PageContainer>
                <FlightPage {...props} />
            </PageContainer>
        </PageAccessValidator>
    );
};

export default Flights;