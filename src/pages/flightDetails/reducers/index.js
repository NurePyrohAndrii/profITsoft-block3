import {combineReducers} from "redux";
import flightDetails from "./flightDetails";
import services from "../../flights/reducers/services";
import airports from "./airports";

export default combineReducers({
    flightDetails,
    services,
    airports
});
