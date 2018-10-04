import {combineReducers} from "redux";
import basePanelReducer from "./basePanelReducer";
import centerCircleReducer from "./centerCircleReducer";
import appReducer from "./appReducer";
import topLeftPanelReducer from "./topLeftPanelReducer";
import topRightPanelReducer from "./topRightPanelReducer";

const rootReducer = combineReducers({
    appState: appReducer,
    basePanelState: basePanelReducer,
    centerCircleState: centerCircleReducer,
    topLeftPanelState: topLeftPanelReducer,
    topRightPanelState: topRightPanelReducer,
});

export default rootReducer;