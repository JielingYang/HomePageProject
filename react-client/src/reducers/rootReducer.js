import {combineReducers} from "redux";
import basePanelReducer from "./basePanelReducer";
import appReducer from "./appReducer";
import bottomRightPanelReducer from "./bottomRightPanelReducer";
import topLeftPanelReducer from "./topLeftPanelReducer";
import topRightPanelReducer from "./topRightPanelReducer";
import bottomLeftPanelReducer from "./bottomLeftPanelReducer";

const rootReducer = combineReducers({
    appState: appReducer,
    basePanelState: basePanelReducer,
    topLeftPanelState: topLeftPanelReducer,
    topRightPanelState: topRightPanelReducer,
    bottomLeftPanelState: bottomLeftPanelReducer,
    bottomRightPanelState: bottomRightPanelReducer
});

export default rootReducer;