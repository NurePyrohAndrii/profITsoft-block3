import React, {useMemo} from 'react';
import IntlProvider from 'misc/providers/IntlProvider';
import useLocationSearch from 'misc/hooks/useLocationSearch';
import {Provider} from "react-redux";

import getMessages from './intl';
import Flights from './containers/Flights';
import reducer from "./reducers"
import configureStore from "../../misc/redux/configureStore";

const store = configureStore(reducer);
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