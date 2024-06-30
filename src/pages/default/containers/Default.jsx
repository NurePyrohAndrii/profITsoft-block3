import {useIntl} from 'react-intl';
import React from 'react';
import config from "../../../config";

import Typography from 'components/Typography';

import {Box, Button} from "@mui/material";
import {useDispatch} from "react-redux";

function Default() {
    const dispatch = useDispatch();
    const {formatMessage} = useIntl();
    const handleGoogleLogin = () => {
        window.location.href = `${config.AUTH_URL}/authenticate`;
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="80vh"
            textAlign="center"
        >
            <Typography variant="title">
                {formatMessage({ id: 'title' })}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleGoogleLogin}
                sx={{ mt: 3 }}
            >
                {formatMessage({ id: 'login' })}
            </Button>
        </Box>
    );
}

export default Default;
