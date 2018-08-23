import {combineReducers} from "redux";
import basePanelReducer from "./basePanelReducer";
import centerComponentReducer from "./centerComponentReducer";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
    appState: appReducer,
    basePanelState: basePanelReducer,
    centerComponentState: centerComponentReducer,
});

export default rootReducer;