import config from 'config';
import axios from "axios";
import {
    FETCH_FLIGHT_DETAILS,
    FETCH_FLIGHT_DETAILS_SUCCESS,
    FETCH_FLIGHT_DETAILS_ERROR,
    EDIT_FLIGHT_DETAILS,
    EDIT_FLIGHT_DETAILS_SUCCESS,
    EDIT_FLIGHT_DETAILS_ERROR,
    CREATE_FLIGHT_DETAILS,
    CREATE_FLIGHT_DETAILS_SUCCESS,
    CREATE_FLIGHT_DETAILS_ERROR,
} from "../constants/actionTypes";


const receiveFlightDetails = (flightDetails) => ({
    type: FETCH_FLIGHT_DETAILS_SUCCESS,
    payload: flightDetails,
});

const requestFlightDetails = () => ({
    type: FETCH_FLIGHT_DETAILS,
});

const errorFlightDetails = errors => ({
    type: FETCH_FLIGHT_DETAILS_ERROR,
    payload: errors
});

const updateFlightDetails = () => ({
    type: EDIT_FLIGHT_DETAILS,
});

const updateFlightDetailsSuccess = (flightDetails) => ({
    type: EDIT_FLIGHT_DETAILS_SUCCESS,
    payload: flightDetails,
});

const updateFlightDetailsError = errors => ({
    type: EDIT_FLIGHT_DETAILS_ERROR,
    payload: errors
});

const createFlightDetails = () => ({
    type: CREATE_FLIGHT_DETAILS,
});

const createFlightDetailsSuccess = () => ({
    type: CREATE_FLIGHT_DETAILS_SUCCESS
});

const createFlightDetailsError = errors => ({
    type: CREATE_FLIGHT_DETAILS_ERROR,
    payload: errors
});

const getFlightDetails = (id) => {
    const {
        FLIGHTS_SERVICE,
    } = config;
    return axios.get(`${FLIGHTS_SERVICE}/flights/${id}`)
}

const fetchFlightDetails = (id) => {
    return dispatch => {
        dispatch(requestFlightDetails());
        return getFlightDetails(id)
            .then(response => {
                dispatch(receiveFlightDetails(response.data));
            })
            .catch(error => {
                dispatch(errorFlightDetails(error.response.data.errors));
            });
    };
}

const requestEditFlightDetails = (id, data) => {
    const {
        FLIGHTS_SERVICE,
    } = config;
    return axios.put(`${FLIGHTS_SERVICE}/flights/${id}`, data);
}

const editFlightDetails = (id, data) => {
    return dispatch => {
        dispatch(updateFlightDetails());
        return requestEditFlightDetails(id, data)
            .then(response => {
                dispatch(updateFlightDetailsSuccess(response.data));
            })
            .catch(error => {
                dispatch(updateFlightDetailsError(error.response.data.errors));
                return Promise.reject(error.response.data.errors);
            });
    };
}

const requestCreateFlightDetails = (data) => {
    const {
        FLIGHTS_SERVICE,
    } = config;
    return axios.post(`${FLIGHTS_SERVICE}/flights`, data);
}

const createFlight = (data) => {
    return dispatch => {
        dispatch(createFlightDetails());
        return requestCreateFlightDetails(data)
            .then(() => {
                dispatch(createFlightDetailsSuccess());
            })
            .catch(error => {
                dispatch(createFlightDetailsError(error.response.data.errors));
                return Promise.reject(error.response.data.errors);
            });
    };
}

const exportFunctions = {
    fetchFlightDetails,
    editFlightDetails,
    createFlight,
};

export default exportFunctions;
