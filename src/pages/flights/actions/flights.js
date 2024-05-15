import config from 'config';
import axios from "axios";
import {
    FETCH_FLIGHTS,
    FETCH_FLIGHTS_SUCCESS,
    FETCH_FLIGHTS_ERROR,
} from "../constants/actionTypes";


const receiveFlights = flights => ({
    type: FETCH_FLIGHTS_SUCCESS,
    payload: flights,
});

const requestFlights = () => ({
    type: FETCH_FLIGHTS,
});

const errorFlights = errors => ({
    type: FETCH_FLIGHTS_ERROR,
    payload: errors
});


const getFlights = () => {
    const {
        FLIGHTS_SERVICE,
    } = config;
    return axios.post(
        `${FLIGHTS_SERVICE}/flights/_list`,
        {
            "page": 0,
            "size": 1
        }
    )
}

const fetchFlights = () => (dispatch) => {
    dispatch(requestFlights());
    return getFlights()
        .then((flights) => {
            dispatch(receiveFlights(flights.data.content));
        })
        .catch((error) => {
            dispatch(errorFlights(error.response.data.errors));
        });
}

const exportFunctions = {
    fetchFlights,
}

export default exportFunctions;

