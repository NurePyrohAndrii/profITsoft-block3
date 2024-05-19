import config from 'config';
import axios from "axios";
import {
    FETCH_FLIGHTS,
    FETCH_FLIGHTS_SUCCESS,
    FETCH_FLIGHTS_ERROR,
    DELETE_FLIGHT,
    DELETE_FLIGHT_SUCCESS,
    DELETE_FLIGHT_ERROR
} from "../constants/actionTypes";


const receiveFlights = (flights, page, size, totalPages, totalElements) => ({
    type: FETCH_FLIGHTS_SUCCESS,
    payload: flights,
    page,
    size,
    totalPages,
    totalElements,
});

const requestFlights = () => ({
    type: FETCH_FLIGHTS,
});

const errorFlights = errors => ({
    type: FETCH_FLIGHTS_ERROR,
    payload: errors
});

const deleteFlightSuccess = () => ({
    type: DELETE_FLIGHT_SUCCESS,
});

const deleteFlightError = errors => ({
    type: DELETE_FLIGHT_ERROR,
    payload: errors
});

const requestDeleteFlight = () => ({
    type: DELETE_FLIGHT,
});


const getFlights = ({
    departureAirport,
    arrivalAirport,
    services,
    page,
    size,
}) => {
    const {
        FLIGHTS_SERVICE,
    } = config;
    return axios.post(
        `${FLIGHTS_SERVICE}/flights/_list`,
        {
            departureAirport,
            arrivalAirport,
            services,
            page,
            size,
        }
    )
}

const performDeleteFlight = (id) => {
    const {
        FLIGHTS_SERVICE,
    } = config;
    return axios.delete(`${FLIGHTS_SERVICE}/flights/${id}`);
}

const fetchFlights = ({
    departureAirport = "",
    arrivalAirport = "",
    services = [],
    page = 0,
    size = 5,
}) => (dispatch) => {
    dispatch(requestFlights());
    return getFlights({
        departureAirport,
        arrivalAirport,
        services,
        page,
        size
    }).then((flights) => {
            dispatch(receiveFlights(
                flights.data.content,
                flights.data.page,
                flights.data.size,
                flights.data.totalPages,
                flights.data.totalElements
            ));
        })
        .catch((error) => {
            dispatch(errorFlights(error.response.data.errors));
        });
}

const deleteFlight = (id) => (dispatch) => {
    dispatch(requestDeleteFlight());
    return performDeleteFlight(id).then(() => {
            dispatch(deleteFlightSuccess());
        })
        .catch((error) => {
            dispatch(deleteFlightError(error.response.data.errors));
            return Promise.reject(error);
        });
}

const exportFunctions = {
    fetchFlights,
    deleteFlight
}

export default exportFunctions;

