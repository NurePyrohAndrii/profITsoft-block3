import config from 'config';
import axios from "axios";
import {
    FETCH_AIRPORTS,
    FETCH_AIRPORTS_SUCCESS,
    FETCH_AIRPORTS_ERROR,
    } from '../constants/actionTypes';

// TODO по нормальному би винести це в відповідний airports пакет, коли зв'явиться потреба у імплементації сторінки з аеропортами
const receiveAirports = airports => ({
    type: FETCH_AIRPORTS_SUCCESS,
    payload: airports,
});

const requestAirports = () => ({
    type: FETCH_AIRPORTS,
});

const errorAirports = errors => ({
    type: FETCH_AIRPORTS_ERROR,
    payload: errors,
});

const getAirports = () => {
    const {
        FLIGHTS_SERVICE,
    } = config;
    return axios.get(`${FLIGHTS_SERVICE}/airports`)
}

const fetchAirports = () => (dispatch) => {
    dispatch(requestAirports());
    return getAirports()
        .then((airports) => {
            dispatch(receiveAirports(airports.data));
        })
        .catch((error) => {
            dispatch(errorAirports(error.response.data.errors));
        });
}

const exportFunctions = {
    fetchAirports,
}

export default exportFunctions;
