import type {appStateType} from "../reducers/appReducer";
import {basePanelAction_updateBasePanelSize, basePanelAction_requestToUpdateBasePanelTransformAndFocusPoint} from "./basePanelActions";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";

/* ************************** Requesting actions ************************** */
/* This kind of actions do not send new data directly to reducer            */
/* They check on new data to decide whether to call updating actions or not */
/* ************************************************************************ */

export const appAction_requestToUpdateMouseMoveRelatedData = (mouseMoveEventTimeStamp: number, mouseMoveX: number, mouseMoveY: number) =>
{
    return (dispatch, getState) =>
    {
        let appState: appStateType = getState().appState;

        let appMaximumRefreshingTimeGap: number = appState.appMaximumRefreshingTimeGap;
        let currentTimestamp: number = Math.trunc(mouseMoveEventTimeStamp);
        let previousTimestamp: number = appState.appMouseMoveEventTimeStamp;

        /*
         I use timestamp to prevent new data being sent to reducer too often
         New data will be sent only if current timestamp is at least 30ms (by default) younger than previous one
         */
        if (currentTimestamp - previousTimestamp >= appMaximumRefreshingTimeGap)
        {
            dispatch(appAction_updateAppMouseMoveEventTimeStamp(currentTimestamp)); // Update timestamp to prepare next check
            dispatch(basePanelAction_requestToUpdateBasePanelTransformAndFocusPoint(mouseMoveX, mouseMoveY)) // Request base panel action to update base panel data
        }
    };
};

export const appAction_requestToUpdateAppSize = (newAppWidth: number, newAppHeight: number) =>
{
    return (dispatch, getState) =>
    {
        let appShapeModel: Shape2d_Rectangle = getState().appState.appShapeModel;
        let previousAppWidth: number = appShapeModel.getWidth();
        let previousAppHeight: number = appShapeModel.getHeight();

        // Compare against previous size
        if (newAppWidth !== previousAppWidth || newAppHeight !== previousAppHeight)
        {
            dispatch(appAction_updateAppSize(newAppWidth, newAppHeight)); // Update app component size
            dispatch(basePanelAction_updateBasePanelSize(newAppWidth, newAppHeight)); // Update base panel size
        }
    };
};

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */

export const APP_ACTION_TYPE = Object.freeze({
    APP_ACTION_UPDATE_APP_SIZE: 'APP_ACTION_UPDATE_APP_SIZE',
    APP_ACTION_UPDATE_APP_MAXIMUM_REFRESHING_TIME_GAP: 'APP_ACTION_UPDATE_APP_MAXIMUM_REFRESHING_TIME_GAP',
    APP_ACTION_UPDATE_APP_MOUSE_MOVE_EVENT_TIME_STAMP: 'APP_ACTION_UPDATE_APP_MOUSE_MOVE_EVENT_TIME_STAMP',
});

export const appAction_updateAppMaximumRefreshingTimeGap = (timeGap: number) =>
{
    return {
        type: APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_MAXIMUM_REFRESHING_TIME_GAP,
        timeGap: timeGap
    };
};

const appAction_updateAppSize = (newAppWidth: number, newAppHeight: number) =>
{
    return {
        type: APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_SIZE,
        newAppWidth: newAppWidth,
        newAppHeight: newAppHeight,
    };
};

const appAction_updateAppMouseMoveEventTimeStamp = (mouseMoveEventTimeStamp: number) =>
{
    return {
        type: APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_MOUSE_MOVE_EVENT_TIME_STAMP,
        mouseMoveEventTimeStamp: mouseMoveEventTimeStamp
    };
};