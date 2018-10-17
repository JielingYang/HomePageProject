import Shape2d_Point from "../classes/Shape2d_Point";

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */

export const TOP_LEFT_PANEL_ACTION_TYPE = Object.freeze({
    TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_SIZE: "TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_SIZE",
    TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_POSITION: "TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_POSITION",
    TOP_LEFT_PANEL_ACTION_SET_TOP_LEFT_PANEL_FOCUS_ON: "TOP_LEFT_PANEL_ACTION_SET_TOP_LEFT_PANEL_FOCUS_ON",
});

export const topLeftPanelAction_updateTopLeftPanelSize = (newTopLeftPanelWidth: number, newTopLeftPanelHeight: number) =>
{
    return {
        type: TOP_LEFT_PANEL_ACTION_TYPE.TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_SIZE,
        newTopLeftPanelWidth: newTopLeftPanelWidth,
        newTopLeftPanelHeight: newTopLeftPanelHeight
    };
};

export const topLeftPanelAction_updateTopLeftPanelPosition = (newPosition: Shape2d_Point) =>
{
    return {
        type: TOP_LEFT_PANEL_ACTION_TYPE.TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_POSITION,
        newPosition: newPosition
    };
};

export const topLeftPanelAction_setTopLeftPanelFocusOn = (focusOn: boolean) =>
{
    return {
        type: TOP_LEFT_PANEL_ACTION_TYPE.TOP_LEFT_PANEL_ACTION_SET_TOP_LEFT_PANEL_FOCUS_ON,
        focusOn: focusOn
    };
};