import axios from 'axios';
import pagesURLs from "../../constants/pagesURLs";
import {defaultPage} from "../../constants/pages";
import {useNavigate} from "react-router-dom";

axios.interceptors.request.use((params) => {
    params.withCredentials = true;
    return params;
}, (error) => {
    return Promise.reject(error);
});

const addAxiosInterceptors = () => {
    axios.interceptors.response.use(
        (response) => response.data,
        (error) => {
            if (error.response && error.response.status === 401) {
                if (window.location.pathname !== pagesURLs[defaultPage]) {
                    window.location.href = pagesURLs[defaultPage];
                }
            }
            return Promise.reject(error);
        },
    );
};

export {
    addAxiosInterceptors,
};

export default axios;
