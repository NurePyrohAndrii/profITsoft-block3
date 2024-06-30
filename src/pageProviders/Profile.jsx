import * as authorities from 'constants/authorities';
import React from 'react';

import PageAccessValidator from './components/PageAccessValidator';
import PageContainer from './components/PageContainer';
import ProfilePage from "pages/profile";

const Profile = (props) => {
    return (
        <PageAccessValidator
            neededAuthorities={[authorities.ENABLE_SEE_SECRET_PAGE]}
        >
            <PageContainer>
                <ProfilePage {...props} />
            </PageContainer>
        </PageAccessValidator>
    );
};

export default Profile;