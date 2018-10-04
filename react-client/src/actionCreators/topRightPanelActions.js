import Shape2d_Point from "../classes/Shape2d_Point";

export const TOP_RIGHT_PANEL_ACTION_TYPE = Object.freeze({
    TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_SIZE: 'TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_SIZE',
    TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_POSITION: 'TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_POSITION',
});

export const topRightPanelAction_updateTopRightPanelSize = (newTopRightPanelWidth: number, newTopRightPanelHeight: number) =>
{
    return {
        type: TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_SIZE,
        newTopRightPanelWidth: newTopRightPanelWidth,
        newTopRightPanelHeight: newTopRightPanelHeight,
    };
};

export const topRightPanelAction_updateTopRightPanelPosition = (newPosition: Shape2d_Point) =>
{
    return {
        type: TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_POSITION,
        newPosition: newPosition,
    };
};