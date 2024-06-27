import React, {useMemo} from "react";
import configureStore from "misc/redux/configureStore";
import useLocationSearch from "misc/hooks/useLocationSearch";
import IntlProvider from "misc/providers/IntlProvider";
import {Provider} from "react-redux";

import getMessages from "./intl";
import FlightDetails from "./containers/FlightDetails";
import flightDetailsReducer from "./reducers";

const store = configureStore(flightDetailsReducer);
function Index(props) {
    const {
        lang,
    } = useLocationSearch();
    const messages = useMemo(() => getMessages(lang), [lang]);
    return (
        <IntlProvider messages={messages}>
            <Provider store={store}>
                <FlightDetails {...props} />
            </Provider>
        </IntlProvider>
    );
}

export default Index;