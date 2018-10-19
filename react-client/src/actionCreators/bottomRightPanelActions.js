import Shape2d_Point from "../classes/shapeClasses/Shape2d_Point";

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */

export const BOTTOM_RIGHT_PANEL_ACTION_TYPE = Object.freeze({
    BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_SIZE: "BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_SIZE",
    BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_POSITION: "BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_POSITION",
    BOTTOM_RIGHT_PANEL_ACTION_SET_BOTTOM_RIGHT_PANEL_FOCUS_ON: "BOTTOM_RIGHT_PANEL_ACTION_SET_BOTTOM_RIGHT_PANEL_FOCUS_ON",
});

export const bottomRightPanelAction_updateBottomRightPanelSize = (newBottomRightPanelWidth: number, newBottomRightPanelHeight: number) =>
{
    return {
        type: BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_SIZE,
        newBottomRightPanelWidth: newBottomRightPanelWidth,
        newBottomRightPanelHeight: newBottomRightPanelHeight
    };
};

export const bottomRightPanelAction_updateBottomRightPanelPosition = (newPosition: Shape2d_Point) =>
{
    return {
        type: BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_POSITION,
        newPosition: newPosition
    };
};

export const bottomRightPanelAction_setBottomRightPanelFocusOn = (focusOn: boolean) =>
{
    return {
        type: BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_SET_BOTTOM_RIGHT_PANEL_FOCUS_ON,
        focusOn: focusOn
    };
};