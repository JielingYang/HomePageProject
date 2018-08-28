import type {appStateType} from "../reducers/appReducer";

export const APP_ACTION_TYPE = Object.freeze({
    APP_ACTION_REQUEST_TO_UPDATE_APP_MOUSE_MOVE_RELATED_DATA: 'APP_ACTION_REQUEST_TO_UPDATE_APP_MOUSE_MOVE_RELATED_DATA',
    APP_ACTION_UPDATE_APP_SIZE: 'APP_ACTION_UPDATE_APP_SIZE',
    APP_ACTION_UPDATE_APP_MAXIMUM_REFRESHING_TIME_GAP: 'APP_ACTION_UPDATE_APP_MAXIMUM_REFRESHING_TIME_GAP',
    APP_ACTION_UPDATE_APP_MOUSE_MOVE_EVENT_TIME_STAMP: 'APP_ACTION_UPDATE_APP_MOUSE_MOVE_EVENT_TIME_STAMP',
    APP_ACTION_UPDATE_APP_MOUSE_MOVE_COORDINATE: 'APP_ACTION_UPDATE_APP_MOUSE_MOVE_COORDINATE',

});
/*
 Exposed actions
 */
// This action will do a check on given mouse move event timestamp before send new data to reducer
export const appAction_requestToUpdateAppMouseMoveRelatedData = (mouseMoveEventTimeStamp: number, mouseMoveX: number, mouseMoveY: number) =>
{
    return (dispatch, getState) =>
    {
        let appState: appStateType = getState().appState;

        let appMaximumRefreshingTimeGap: number = appState.appMaximumRefreshingTimeGap;
        let currentTimestamp: number = Math.trunc(mouseMoveEventTimeStamp);
        let previousTimestamp: number = appState.appMouseMoveEventTimeStamp;

        // Send new data to reducer only if current timestamp is at least 30ms (by default) younger than previous one
        if (currentTimestamp - previousTimestamp >= appMaximumRefreshingTimeGap)
        {
            dispatch(appAction_UpdateAppMouseMoveEventTimeStamp(currentTimestamp));
            dispatch(appAction_UpdateAppMouseMoveCoordinate(mouseMoveX, mouseMoveY));
        }
    };
};

export const appAction_UpdateAppSize = (appWidth: number, appHeight: number) =>
{
    return {
        type: APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_SIZE,
        appWidth: appWidth,
        appHeight: appHeight,
    }
};

export const appAction_UpdateAppMaximumRefreshingTimeGap = (timeGap: number) =>
{
    return {
        type: APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_MAXIMUM_REFRESHING_TIME_GAP,
        timeGap: timeGap
    };
};
/*
 Non-exposed actions
 */
const appAction_UpdateAppMouseMoveEventTimeStamp = (mouseMoveEventTimeStamp: number) =>
{
    return {
        type: APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_MOUSE_MOVE_EVENT_TIME_STAMP,
        mouseMoveEventTimeStamp: mouseMoveEventTimeStamp
    };
};

const appAction_UpdateAppMouseMoveCoordinate = (appMouseMoveX: number, appMouseMoveY: number) =>
{
    return {
        type: APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_MOUSE_MOVE_COORDINATE,
        appMouseMoveX: appMouseMoveX,
        appMouseMoveY: appMouseMoveY,
    }
};