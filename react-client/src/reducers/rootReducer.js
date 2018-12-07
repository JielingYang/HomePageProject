import {combineReducers} from "redux";
import appReducer from "./appReducer";
import contentPanelsReducer from "./contentPanelsReducer";
import engineReducer from "./engineReducer";

const rootReducer = combineReducers({
    appState: appReducer,
    contentPanelsState: contentPanelsReducer,
    engineState: engineReducer,
});

export default rootReducer;