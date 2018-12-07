import type {appStateType} from "../reducers/appReducer";
import BaseModelWithStateAndShape from "../classes/BaseModelWithStateAndShape";
import {contentPanelAction_updateContentPanelPositionAndSize} from "./contentPanelActions";
import {CONTENT_PANELS_INDICES} from "../utilities/CONSTANTS_NUMBER";
import {engineAction_requestToUpdateEngineLayout, engineAction_requestToUpdateEnginePerspective, engineAction_requestToUpdateEngineRotation} from "./engineActions";

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
            dispatch(engineAction_requestToUpdateEngineRotation(mouseMoveX, mouseMoveY));
        }
    };
};

export const appAction_requestToUpdateAppSize = (newAppWidth: number, newAppHeight: number, forceToUpdate: boolean) =>
{
    return (dispatch, getState) =>
    {
        let appModel: BaseModelWithStateAndShape = getState().appState.appModel;
        let previousAppWidth: number = appModel.getWidth();
        let previousAppHeight: number = appModel.getHeight();

        // Compare against previous size
        if (forceToUpdate || newAppWidth !== previousAppWidth || newAppHeight !== previousAppHeight)
        {
            let menuContentPanelWidth: number = newAppWidth / 6;

            let engineContentPanelWidth: number = newAppWidth - menuContentPanelWidth;
            let engineContentPanelX: number = menuContentPanelWidth;

            dispatch(appAction_updateAppSize(newAppWidth, newAppHeight));
            dispatch(contentPanelAction_updateContentPanelPositionAndSize(CONTENT_PANELS_INDICES.CONTENT_PANEL_MENU, 0, 0, 0, menuContentPanelWidth, newAppHeight));
            dispatch(contentPanelAction_updateContentPanelPositionAndSize(CONTENT_PANELS_INDICES.CONTENT_PANEL_ENGINE, engineContentPanelX, 0, 0, engineContentPanelWidth, newAppHeight));
            dispatch(engineAction_requestToUpdateEnginePerspective());
            dispatch(engineAction_requestToUpdateEngineLayout());
        }
    };
};


export const appAction_requestToChangeAppTheme = (themeIndex: number) =>
{
    return (dispatch, getState) =>
    {
        if (getState().appState.themeIndex !== themeIndex)
        {
            dispatch(appAction_changeAppTheme(themeIndex));
        }
    }
};

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */

export const APP_ACTION_TYPE = Object.freeze({
    APP_ACTION_UPDATE_APP_SIZE: "APP_ACTION_UPDATE_APP_SIZE",
    APP_ACTION_CHANGE_APP_THEME: "APP_ACTION_CHANGE_APP_THEME",
    APP_ACTION_UPDATE_APP_MAXIMUM_REFRESHING_TIME_GAP: "APP_ACTION_UPDATE_APP_MAXIMUM_REFRESHING_TIME_GAP",
    APP_ACTION_UPDATE_APP_MOUSE_MOVE_EVENT_TIME_STAMP: "APP_ACTION_UPDATE_APP_MOUSE_MOVE_EVENT_TIME_STAMP",
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

const appAction_changeAppTheme = (themeIndex: number) =>
{
    return {
        type: APP_ACTION_TYPE.APP_ACTION_CHANGE_APP_THEME,
        themeIndex: themeIndex,
    }
};