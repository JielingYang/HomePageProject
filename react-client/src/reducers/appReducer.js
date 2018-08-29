import {ID_CONSTANTS} from "../utilities/CONSTANTS_ID";
import {createReducer, deepCopy} from "./reducerCreator";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";
import {APP_ACTION_TYPE} from "../actionCreators/appActions";
import {APP_REFRESHING_TIME_GAP} from "../utilities/CONSTANTS_TIME";
import Shape2d_Point from "../classes/Shape2d_Point";

export type appStateType = {
    appShapeModel: Shape2d_Rectangle,
    appMaximumRefreshingTimeGap: number,
    appMouseMoveEventTimeStamp: number,
}

const appDefaultState: appStateType = {
    appShapeModel: new Shape2d_Rectangle(0, ID_CONSTANTS.APP_COMPONENT, new Shape2d_Point(0, 0), window.innerWidth, window.innerHeight),
    appMaximumRefreshingTimeGap: APP_REFRESHING_TIME_GAP,
    appMouseMoveEventTimeStamp: 0,
};

const appAction_updateAppSize_handler = (state: appStateType, action) =>
{
    let nextState: appStateType = deepCopy(state);
    nextState.appShapeModel.updateRectangleSize(action.newAppWidth, action.newAppHeight);
    return nextState;
};

const appAction_updateAppMaximumRefreshingTimeGap_handler = (state: appStateType, action) =>
{
    // No deepCopy here because I don't want the change of refreshing time gap to cause re-render of the appComponent
    state.appMaximumRefreshingTimeGap = action.appMaximumRefreshingTimeGap;
    return state;
};

// This handler ensures a stable graphics performance across different browsers as they have different rates for firing mouse move events,
const appAction_updateAppMouseMoveEventTimeStamp_handler = (state: appStateType, action) =>
{
    // No deepCopy here because I don't want the change of mouse move event timestamp to cause re-render of the appComponent
    state.appMouseMoveEventTimeStamp = action.mouseMoveEventTimeStamp;
    return state;
};

// Check reducerCreator for explanation of handlers
const appReducerHandlers = {
    [APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_SIZE]: appAction_updateAppSize_handler,
    [APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_MAXIMUM_REFRESHING_TIME_GAP]: appAction_updateAppMaximumRefreshingTimeGap_handler,
    [APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_MOUSE_MOVE_EVENT_TIME_STAMP]: appAction_updateAppMouseMoveEventTimeStamp_handler,
};

export default createReducer(appDefaultState, appReducerHandlers);