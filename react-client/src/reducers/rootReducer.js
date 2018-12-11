import {combineReducers} from "redux";
import appReducer from "./appReducer";
import contentPanelsReducer from "./contentPanelsReducer";
import engineReducer from "./engineReducer";
import mainMenuReducer from "./mainMenuReducer";

const rootReducer = combineReducers({
    appState: appReducer,
    contentPanelsState: contentPanelsReducer,
    mainMenuState: mainMenuReducer,
    engineState: engineReducer,
});

export default rootReducer;