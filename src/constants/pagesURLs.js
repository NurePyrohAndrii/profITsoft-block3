import * as pages from './pages';
import config from 'config';

const result = {
    [pages.defaultPage]: `${config.UI_URL_PREFIX}/${pages.defaultPage}`,
    [pages.login]: `${config.UI_URL_PREFIX}/${pages.login}`,
    [pages.secretPage]: `${config.UI_URL_PREFIX}/${pages.secretPage}`,
    [pages.flights]: `${config.UI_URL_PREFIX}/${pages.flights}`,
    [pages.flightDetails]: `${config.UI_URL_PREFIX}/${pages.flightDetails}/:id`,
};

export default result;
