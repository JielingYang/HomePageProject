export const APP_ACTION_TYPE = Object.freeze({
    APP_ACTION_UPDATE_APP_MOUSE_MOVE_EVENT_TIME_STAMP: 'APP_ACTION_UPDATE_APP_MOUSE_MOVE_EVENT_TIME_STAMP',
    APP_ACTION_UPDATE_APP_MAXIMUM_REFRESHING_TIME_GAP: 'APP_ACTION_UPDATE_APP_MAXIMUM_REFRESHING_TIME_GAP',
    APP_ACTION_UPDATE_APP_SIZE: 'APP_ACTION_UPDATE_APP_SIZE',

});

export const appAction_UpdateAppMouseMoveEventTimeStamp = (mouseMoveEventTimeStamp: Number) =>
{
    return {
        type: APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_MOUSE_MOVE_EVENT_TIME_STAMP,
        mouseMoveEventTimeStamp: mouseMoveEventTimeStamp
    };
};

export const appAction_UpdateAppMaximumRefreshingTimeGap = (timeGap: Number) =>
{
    return {
        type: APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_MAXIMUM_REFRESHING_TIME_GAP,
        timeGap: timeGap
    };
};

export const appAction_UpdateAppSize = (appWidth: Number, appHeight: Number) =>
{
    return {
        type: APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_SIZE,
        appWidth: appWidth,
        appHeight: appHeight,
    }
};