import {ID_CONSTANTS} from "../utilities/CONSTANTS_ID";
import {createReducer, deepCopy} from "./reducerCreator";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";
import {APP_ACTION_TYPE} from "../actionCreators/appActions";
import {APP_REFRESHING_TIME_GAP} from "../utilities/CONSTANTS_TIME";
import Shape2d_Point from "../classes/Shape2d_Point";

export type appStateType = {
    appShapeModel: Shape2d_Rectangle,
    appMouseMoveEventTimeStamp: number,
    appMaximumRefreshingTimeGap: number,
}

const appDefaultState: appStateType = {
    appShapeModel: new Shape2d_Rectangle(0, ID_CONSTANTS.APP, new Shape2d_Point(0, 0), window.innerWidth, window.innerHeight),
    appMouseMoveEventTimeStamp: 0,
    appMaximumRefreshingTimeGap: APP_REFRESHING_TIME_GAP,
};

const appAction_updateAppMouseMoveEventTimeStamp_handler = (state: appStateType, action) =>
{
    let currentTimestamp: number = Math.trunc(action.mouseMoveEventTimeStamp);
    let previousTimestamp: number = state.appMouseMoveEventTimeStamp;

    if (currentTimestamp - previousTimestamp >= state.appMaximumRefreshingTimeGap)
    {
        let nextState: appStateType = deepCopy(state);
        nextState.appMouseMoveEventTimeStamp = currentTimestamp;
        return nextState;
    }

    return state;
};

const appAction_updateAppMaximumRefreshingTimeGap_handler = (state: appStateType, action) =>
{
    let nextState: appStateType = deepCopy(state);

    nextState.appMaximumRefreshingTimeGap = action.appMaximumRefreshingTimeGap;

    return nextState;
};

const appAction_updateAppSize_handler = (state: appStateType, action) =>
{
    let previousAppWidth: number = state.appShapeModel.getWidth();
    let previousAppHeight: number = state.appShapeModel.getHeight();

    if (action.appWidth !== previousAppWidth || action.appHeight !== previousAppHeight)
    {
        let nextState: appStateType = deepCopy(state);
        nextState.appShapeModel.updateRectangleSize(action.appWidth, action.appHeight);
        return nextState;
    }

    return state;
};

// Check reducerCreator for explanation of handlers
const appReducerHandlers = {
    [APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_MOUSE_MOVE_EVENT_TIME_STAMP]: appAction_updateAppMouseMoveEventTimeStamp_handler,
    [APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_MAXIMUM_REFRESHING_TIME_GAP]: appAction_updateAppMaximumRefreshingTimeGap_handler,
    [APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_SIZE]: appAction_updateAppSize_handler,
};

export default createReducer(appDefaultState, appReducerHandlers);