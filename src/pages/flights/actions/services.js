import config from 'config';
import axios from "axios";
import {
    FETCH_SERVICES,
    FETCH_SERVICES_SUCCESS,
    FETCH_SERVICES_ERROR,
} from "../constants/actionTypes";

// TODO по нормальному би винести це в app модуль, бо оце і в flights і в flightDetails використовується,
//  але краще в відповідний services, коли зв'явиться потреба у імплементації сторінки з сервісами
const receiveServices = services => ({
    type: FETCH_SERVICES_SUCCESS,
    payload: services,
});

const requestServices = () => ({
    type: FETCH_SERVICES,
});

const errorServices = errors => ({
    type: FETCH_SERVICES_ERROR,
    payload: errors
});

const getServices = () => {
    const {
        FLIGHTS_URL,
    } = config;
    return axios.get(`${FLIGHTS_URL}/services`)
}

const fetchServices = () => (dispatch) => {
    dispatch(requestServices());
    return getServices()
        .then((services) => {
            dispatch(receiveServices(services.data));
        })
        .catch((error) => {
            dispatch(errorServices(error.response.data.errors));
        });
}

const exportFunctions = {
    fetchServices,
}

export default exportFunctions;
