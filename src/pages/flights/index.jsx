import React, {useMemo} from 'react';
import IntlProvider from 'misc/providers/IntlProvider';
import useLocationSearch from 'misc/hooks/useLocationSearch';

import getMessages from './intl';
import Flights from './containers/Flights';
import {Provider} from "react-redux";
import flightReducer from "./reducers"
import configureStore from "../../misc/redux/configureStore";

const store = configureStore(flightReducer);
function Index(props) {
    const {
        lang,
    } = useLocationSearch();
    const messages = useMemo(() => getMessages(lang), [lang]);
    return (
        <IntlProvider messages={messages}>
            <Provider store={store}>
                <Flights {...props} />
            </Provider>
        </IntlProvider>
    );
}

export default Index;