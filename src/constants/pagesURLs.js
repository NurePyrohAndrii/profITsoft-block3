import * as pages from './pages';
import config from 'config';

const result = {
    [pages.defaultPage]: `${config.UI_URL_PREFIX}/${pages.defaultPage}`,
    [pages.flights]: `${config.UI_URL_PREFIX}/${pages.flights}`,
    [pages.flightDetails]: `${config.UI_URL_PREFIX}/${pages.flightDetails}/:id`,
    [pages.profile]: `${config.UI_URL_PREFIX}/${pages.profile}`,
};

export default result;
