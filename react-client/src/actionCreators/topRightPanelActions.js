import Shape2d_Point from "../classes/shapeClasses/Shape2d_Point";

/* ************************** Requesting actions ************************** */
/* This kind of actions do not send new data directly to reducer            */
/* They check on new data to decide whether to call updating actions or not */
/* ************************************************************************ */

export const topRightPanelAction_requestToUpdateTopRightPanelContentLayoutData = () =>
{
    return (dispatch, getState) =>
    {
        let topRightPanelState = getState().topRightPanelState;
        let topRightPanelShapeModel = topRightPanelState.topRightPanelShapeModel;
        let numberOfSettingsTabs = topRightPanelState.settingsTabsStateModel.getNumberOfTabs();
        let topRightPanelPadding = topRightPanelState.topRightPanelPadding;

        let topRightPanelBorderWidth = topRightPanelShapeModel.getWidth() - 2 * topRightPanelPadding;
        let topRightPanelBorderHeight = topRightPanelShapeModel.getHeight() - 2 * topRightPanelPadding;

        let settingsTabsWidth = topRightPanelBorderWidth / numberOfSettingsTabs;
        let settingsTabsHeight = topRightPanelBorderHeight * 0.1;

        dispatch(topRightPanelAction_updateTopRightPanelContentLayoutData(topRightPanelBorderWidth, topRightPanelBorderHeight, settingsTabsWidth, settingsTabsHeight));
    }
};

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */

export const TOP_RIGHT_PANEL_ACTION_TYPE = Object.freeze({
    TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_SIZE: "TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_SIZE",
    TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_POSITION: "TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_POSITION",
    TOP_RIGHT_PANEL_ACTION_SET_TOP_RIGHT_PANEL_FOCUS_ON: "TOP_RIGHT_PANEL_ACTION_SET_TOP_RIGHT_PANEL_FOCUS_ON",
    TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_CONTENT_LAYOUT_DATA: "TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_CONTENT_LAYOUT_DATA",
});

export const topRightPanelAction_updateTopRightPanelSize = (newTopRightPanelWidth: number, newTopRightPanelHeight: number) =>
{
    return {
        type: TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_SIZE,
        newTopRightPanelWidth: newTopRightPanelWidth,
        newTopRightPanelHeight: newTopRightPanelHeight
    };
};

export const topRightPanelAction_updateTopRightPanelPosition = (newPosition: Shape2d_Point) =>
{
    return {
        type: TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_POSITION,
        newPosition: newPosition
    };
};

export const topRightPanelAction_setTopRightPanelFocusOn = (focusOn: boolean) =>
{
    return {
        type: TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_SET_TOP_RIGHT_PANEL_FOCUS_ON,
        focusOn: focusOn
    };
};

export const topRightPanelAction_updateTopRightPanelContentLayoutData = (topRightPanelBorderWidth: number, topRightPanelBorderHeight: number, settingsTabsWidth: number, settingsTabsHeight: number) =>
{
    return {
        type: TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_CONTENT_LAYOUT_DATA,
        topRightPanelBorderWidth: topRightPanelBorderWidth,
        topRightPanelBorderHeight: topRightPanelBorderHeight,
        settingsTabsWidth: settingsTabsWidth,
        settingsTabsHeight: settingsTabsHeight
    };
};