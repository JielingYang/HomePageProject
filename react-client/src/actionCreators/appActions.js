import type {appStateType} from "../reducers/appReducer";
import {basePanelAction_updateBasePanelSize, basePanelAction_requestToUpdateBasePanelTransformAndFocusPoint} from "./basePanelActions";
import Shape2d_Rectangle from "../classes/shapeClasses/Shape2d_Rectangle";
import {bottomRightPanelAction_updateBottomRightPanelPosition, bottomRightPanelAction_updateBottomRightPanelSize} from "./bottomRightPanelActions";
import {topLeftPanelAction_requestToUpdateTopLeftPanelContentLayoutData, topLeftPanelAction_updateTopLeftPanelSize} from "./topLeftPanelActions";
import {topRightPanelAction_requestToUpdateTopRightPanelContentLayoutData, topRightPanelAction_updateTopRightPanelPosition, topRightPanelAction_updateTopRightPanelSize} from "./topRightPanelActions";
import Shape2d_Point from "../classes/shapeClasses/Shape2d_Point";
import {bottomLeftPanelAction_updateBottomLeftPanelPosition, bottomLeftPanelAction_updateBottomLeftPanelSize} from "./bottomLeftPanelActions";

/* ************************** Requesting actions ************************** */
/* This kind of actions do not send new data directly to reducer            */
/* They check on new data to decide whether to call updating actions or not */
/* ************************************************************************ */

export const appAction_requestToUpdateAppMouseMoveRelatedData = (mouseMoveEventTimeStamp: number, mouseMoveX: number, mouseMoveY: number) =>
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
            dispatch(basePanelAction_requestToUpdateBasePanelTransformAndFocusPoint(mouseMoveX, mouseMoveY)); // Request base panel action to update base panel transformation data
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
            let newTopLeftPanelWidth: number = newAppWidth / 2;
            let newTopLeftPanelHeight: number = newAppHeight / 2;

            let newTopRightPanelWidth: number = newAppWidth / 2;
            let newTopRightPanelHeight: number = newAppHeight / 2;
            let newTopRightPanelPosition: Shape2d_Point = new Shape2d_Point(newAppWidth / 2, 0);

            let newBottomLeftPanelWidth: number = newAppWidth / 2;
            let newBottomLeftPanelHeight: number = newAppHeight / 2;
            let newBottomLeftPanelPosition: Shape2d_Point = new Shape2d_Point(0, newAppHeight / 2);

            let newBottomRightPanelWidth: number = newAppWidth / 2;
            let newBottomRightPanelHeight: number = newAppHeight / 2;
            let newBottomRightPanelPosition: Shape2d_Point = new Shape2d_Point(newAppWidth / 2, newAppHeight / 2);

            // Update app component size
            dispatch(appAction_updateAppSize(newAppWidth, newAppHeight));
            // Update base panel size
            dispatch(basePanelAction_updateBasePanelSize(newAppWidth, newAppHeight));
            // Update top left panel size
            dispatch(topLeftPanelAction_updateTopLeftPanelSize(newTopLeftPanelWidth, newTopLeftPanelHeight));
            dispatch(topLeftPanelAction_requestToUpdateTopLeftPanelContentLayoutData());
            // Update top right panel size and position
            dispatch(topRightPanelAction_updateTopRightPanelSize(newTopRightPanelWidth, newTopRightPanelHeight));
            dispatch(topRightPanelAction_updateTopRightPanelPosition(newTopRightPanelPosition));
            dispatch(topRightPanelAction_requestToUpdateTopRightPanelContentLayoutData());
            // Update bottom left panel size and position
            dispatch(bottomLeftPanelAction_updateBottomLeftPanelSize(newBottomLeftPanelWidth, newBottomLeftPanelHeight));
            dispatch(bottomLeftPanelAction_updateBottomLeftPanelPosition(newBottomLeftPanelPosition));
            // Update bottom right panel size and position
            dispatch(bottomRightPanelAction_updateBottomRightPanelSize(newBottomRightPanelWidth, newBottomRightPanelHeight));
            dispatch(bottomRightPanelAction_updateBottomRightPanelPosition(newBottomRightPanelPosition));
        }
    };
};

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */

export const APP_ACTION_TYPE = Object.freeze({
    APP_ACTION_UPDATE_APP_SIZE: "APP_ACTION_UPDATE_APP_SIZE",
    APP_ACTION_UPDATE_APP_MAXIMUM_REFRESHING_TIME_GAP: "APP_ACTION_UPDATE_APP_MAXIMUM_REFRESHING_TIME_GAP",
    APP_ACTION_UPDATE_APP_MOUSE_MOVE_EVENT_TIME_STAMP: "APP_ACTION_UPDATE_APP_MOUSE_MOVE_EVENT_TIME_STAMP",
    APP_ACTION_CHANGE_APP_THEME: "APP_ACTION_CHANGE_APP_THEME"
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
        newAppHeight: newAppHeight
    };
};

const appAction_updateAppMouseMoveEventTimeStamp = (mouseMoveEventTimeStamp: number) =>
{
    return {
        type: APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_MOUSE_MOVE_EVENT_TIME_STAMP,
        mouseMoveEventTimeStamp: mouseMoveEventTimeStamp
    };
};

export const appAction_changeAppTheme = (themeIndex: number) =>
{
    return {
        type: APP_ACTION_TYPE.APP_ACTION_CHANGE_APP_THEME,
        themeIndex: themeIndex,
    }
};