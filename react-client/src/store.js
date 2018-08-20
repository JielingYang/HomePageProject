import rootReducer from "./reducers/rootReducer";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

// Add middleware. NOTE: Order of middleware matters, thunk before logger
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;