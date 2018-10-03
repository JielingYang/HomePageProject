import {combineReducers} from "redux";
import basePanelReducer from "./basePanelReducer";
import centerCircleReducer from "./centerCircleReducer";
import appReducer from "./appReducer";
import topLeftPanelReducer from "./topLeftPanelReducer";

const rootReducer = combineReducers({
    appState: appReducer,
    basePanelState: basePanelReducer,
    centerCircleState: centerCircleReducer,
    topLeftPanelState: topLeftPanelReducer,
});

export default rootReducer;