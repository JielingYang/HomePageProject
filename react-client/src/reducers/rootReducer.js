import {combineReducers} from "redux";
import basePanelReducer from "./basePanelReducer";
import centerComponentReducer from "./centerComponentReducer";

const rootReducer = combineReducers({
    basePanelState: basePanelReducer,
    centerComponentState: centerComponentReducer,
});

export default rootReducer;