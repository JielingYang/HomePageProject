export const BASE_PANEL_ACTION_TYPE = Object.freeze({
    BASE_PANEL_ACTION_UPDATE_BASE_PANEL_SIZE: 'BASE_PANEL_ACTION_UPDATE_BASE_PANEL_SIZE',
    BASE_PANEL_ACTION_UPDATE_TRANSFORM_AND_FOCUS_POINT: 'BASE_PANEL_ACTION_UPDATE_TRANSFORM_AND_FOCUS_POINT',
});

export const basePanelAction_UpdateBasePanelSize = (basePanelWidth: number, basePanelHeight: number) =>
{
    return {type: BASE_PANEL_ACTION_TYPE.BASE_PANEL_ACTION_UPDATE_BASE_PANEL_SIZE, newBasePanelWidth: basePanelWidth, newBasePanelHeight: basePanelHeight};
};

export const basePanelAction_UpdateTransformAndFocusPoint = (translatePercentageX: string, translatePercentageY: string, rotationX: string, rotationY: string, focusPointPercentageX: string, focusPointPercentageY: string) =>
{
    return {type: BASE_PANEL_ACTION_TYPE.BASE_PANEL_ACTION_UPDATE_TRANSFORM_AND_FOCUS_POINT, translatePercentageX: translatePercentageX, translatePercentageY: translatePercentageY, rotationX: rotationX, rotationY: rotationY, focusPointPercentageX: focusPointPercentageX, focusPointPercentageY: focusPointPercentageY};
};