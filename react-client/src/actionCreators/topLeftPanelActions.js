import Shape2d_Point from "../classes/Shape2d_Point";

export const TOP_LEFT_PANEL_ACTION_TYPE = Object.freeze({
    TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_SIZE: 'TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_SIZE',
    TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_POSITION: 'TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_POSITION',
});

export const topLeftPanelAction_updateTopLeftPanelSize = (newTopLeftPanelWidth: number, newTopLeftPanelHeight: number) =>
{
    return {
        type: TOP_LEFT_PANEL_ACTION_TYPE.TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_SIZE,
        newTopLeftPanelWidth: newTopLeftPanelWidth,
        newTopLeftPanelHeight: newTopLeftPanelHeight,
    };
};

export const topLeftPanelAction_updateTopLeftPanelPosition = (newPosition: Shape2d_Point) =>
{
    return {
        type: TOP_LEFT_PANEL_ACTION_TYPE.TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_POSITION,
        newPosition: newPosition,
    };
};