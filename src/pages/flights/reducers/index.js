import { combineReducers } from 'redux';

import flights from './flights';
import services from './services';

export default combineReducers({
    flights,
    services,
});
