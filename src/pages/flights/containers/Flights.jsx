import {useIntl} from 'react-intl';
import React, {useEffect, useState} from 'react';
import Typography from 'components/Typography';
import {useDispatch, useSelector} from "react-redux";
import actionsFlights from "../actions/flights";
import Alert from "components/Alert";

function Flights() {
    const dispatch = useDispatch();

    const [state, setState] = useState({
        externalErrorMessages: [],
    });

    useEffect(() => {
        dispatch(actionsFlights.fetchFlights());
    }, []);

    const {formatMessage} = useIntl();
    const {
        list,
        isLoading,
        isFailed,
        errors,
    } = useSelector(state => state.flights);

    useEffect(() => {
        const messages = errors.map(error => error.message);
        setState({
            ...state,
            externalErrorMessages: messages,
        });
    }, [errors]);

    return (
        <div>
            <Typography variant={"title"}>
                {formatMessage({id: 'title'})}
            </Typography>
            {isFailed && state.externalErrorMessages.map((message, index) => (
                <Alert
                    key={index}
                    severity={'error'}
                    variant={'filled'}
                    children={
                        <Typography color={'white'}>
                            {formatMessage({id: 'fetchError'})}: {message}
                        </Typography>
                    }/>
            ))}
        </div>
    );
}

export default Flights;
