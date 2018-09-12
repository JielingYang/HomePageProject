import {combineReducers} from "redux";
import basePanelReducer from "./basePanelReducer";
import centerCircleReducer from "./centerCircleReducer";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
    appState: appReducer,
    basePanelState: basePanelReducer,
    centerCircleState: centerCircleReducer,
});

export default rootReducer;