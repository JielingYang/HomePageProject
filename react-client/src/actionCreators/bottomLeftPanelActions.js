import Shape2d_Point from "../classes/Shape2d_Point";

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */

export const BOTTOM_LEFT_PANEL_ACTION_TYPE = Object.freeze({
    BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_SIZE: "BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_SIZE",
    BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_POSITION: "BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_POSITION",
    BOTTOM_LEFT_PANEL_ACTION_SET_BOTTOM_LEFT_PANEL_FOCUS_ON: "BOTTOM_LEFT_PANEL_ACTION_SET_BOTTOM_LEFT_PANEL_FOCUS_ON",
});

export const bottomLeftPanelAction_updateBottomLeftPanelSize = (newBottomLeftPanelWidth: number, newBottomLeftPanelHeight: number) =>
{
    return {
        type: BOTTOM_LEFT_PANEL_ACTION_TYPE.BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_SIZE,
        newBottomLeftPanelWidth: newBottomLeftPanelWidth,
        newBottomLeftPanelHeight: newBottomLeftPanelHeight
    };
};

export const bottomLeftPanelAction_updateBottomLeftPanelPosition = (newPosition: Shape2d_Point) =>
{
    return {
        type: BOTTOM_LEFT_PANEL_ACTION_TYPE.BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_POSITION,
        newPosition: newPosition
    };
};

export const bottomLeftPanelAction_setBottomLeftPanelFocusOn = (focusOn: boolean) =>
{
    return {
        type: BOTTOM_LEFT_PANEL_ACTION_TYPE.BOTTOM_LEFT_PANEL_ACTION_SET_BOTTOM_LEFT_PANEL_FOCUS_ON,
        focusOn: focusOn
    };
};