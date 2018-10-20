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
        let basePanelUnitLength = getState().basePanelState.basePanelShapeModel.getUnitLength();
        let topRightPanelShapeModel = topRightPanelState.topRightPanelShapeModel;
        let numberOfSettingsTabs = topRightPanelState.settingsTabsStateModel.getNumberOfItems();
        let numberOfThemes = topRightPanelState.themesSettingStateModel.getNumberOfItems();
        let topRightPanelPadding = topRightPanelState.topRightPanelPadding;

        let topRightPanelBorderWidth = topRightPanelShapeModel.getWidth() - 2 * topRightPanelPadding;
        let topRightPanelBorderHeight = topRightPanelShapeModel.getHeight() - 2 * topRightPanelPadding;
        let topRightPanelBorderSize = basePanelUnitLength * 0.5;
        let topRightPanelBorderRadius = basePanelUnitLength * 3;

        let settingsTabsWidth = topRightPanelBorderWidth / numberOfSettingsTabs;
        let settingsTabsHeight = topRightPanelShapeModel.getYUnitLength() * 13;

        let themesSettingOptionsSize = basePanelUnitLength * 8;
        let themesSettingOptionsGap = themesSettingOptionsSize / 2;
        let themesSettingOptionsStartingX = (topRightPanelShapeModel.getWidth() - numberOfThemes * themesSettingOptionsSize - (numberOfThemes - 1) * themesSettingOptionsGap) / 2;

        dispatch(topRightPanelAction_updateTopRightPanelContentLayoutData(topRightPanelBorderWidth, topRightPanelBorderHeight, settingsTabsWidth, settingsTabsHeight, topRightPanelBorderSize, topRightPanelBorderRadius, themesSettingOptionsSize, themesSettingOptionsGap, themesSettingOptionsStartingX));
    }
};

export const topRightPanelAction_requestToSelectSettingsTab = (tabIndex: number) =>
{
    return (dispatch, getState) =>
    {
        let currentSelectedTabIndex = getState().topRightPanelState.settingsTabsStateModel.getSelectedItemIndex();
        if (currentSelectedTabIndex !== tabIndex)
        {
            dispatch(topRightPanelAction_selectSettingsTab(tabIndex));
        }
    }
};

export const topRightPanelAction_requestToMouseHoversIndividualSettingsTab = (tabIndex: number) =>
{
    return (dispatch, getState) =>
    {
        let currentMouseHoveredTabIndex = getState().topRightPanelState.settingsTabsStateModel.getMouseHoveredItemIndex();
        if (currentMouseHoveredTabIndex !== tabIndex)
        {
            dispatch(topRightPanelAction_mouseHoversIndividualSettingsTab(tabIndex));
        }
    }
};

export const topRightPanelAction_requestToSetIsMouseHoversSettingsTabs = (isHover: boolean) =>
{
    return (dispatch) =>
    {
        if (!isHover)
        {
            dispatch(topRightPanelAction_mouseHoversIndividualSettingsTab(null));
        }
        dispatch(topRightPanelAction_setIsMouseHoversSettingsTabs(isHover));
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
    TOP_RIGHT_PANEL_ACTION_SELECT_SETTINGS_TAB: "TOP_RIGHT_PANEL_ACTION_SELECT_SETTINGS_TAB",
    TOP_RIGHT_PANEL_ACTION_MOUSE_HOVERS_INDIVIDUAL_SETTINGS_TAB: "TOP_RIGHT_PANEL_ACTION_MOUSE_HOVERS_INDIVIDUAL_SETTINGS_TAB",
    TOP_RIGHT_PANEL_ACTION_SET_IS_MOUSE_HOVERS_SETTINGS_TABS: "TOP_RIGHT_PANEL_ACTION_SET_IS_MOUSE_HOVERS_SETTINGS_TABS",
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

const topRightPanelAction_updateTopRightPanelContentLayoutData = (topRightPanelBorderWidth: number, topRightPanelBorderHeight: number, settingsTabsWidth: number, settingsTabsHeight: number, topRightPanelBorderSize: number, topRightPanelBorderRadius: number, themesSettingOptionsSize: number, themesSettingOptionsGap: number, themesSettingOptionsStartingX: number) =>
{
    return {
        type: TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_CONTENT_LAYOUT_DATA,
        topRightPanelBorderWidth: topRightPanelBorderWidth,
        topRightPanelBorderHeight: topRightPanelBorderHeight,
        settingsTabsWidth: settingsTabsWidth,
        settingsTabsHeight: settingsTabsHeight,
        topRightPanelBorderSize: topRightPanelBorderSize,
        topRightPanelBorderRadius: topRightPanelBorderRadius,
        themesSettingOptionsSize: themesSettingOptionsSize,
        themesSettingOptionsGap: themesSettingOptionsGap,
        themesSettingOptionsStartingX: themesSettingOptionsStartingX,
    };
};

const topRightPanelAction_selectSettingsTab = (tabIndex: number) =>
{
    return {
        type: TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_SELECT_SETTINGS_TAB,
        tabIndex: tabIndex
    };
};

const topRightPanelAction_mouseHoversIndividualSettingsTab = (tabIndex: number) =>
{
    return {
        type: TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_MOUSE_HOVERS_INDIVIDUAL_SETTINGS_TAB,
        tabIndex: tabIndex
    };
};

const topRightPanelAction_setIsMouseHoversSettingsTabs = (isHover: boolean) =>
{
    return {
        type: TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_SET_IS_MOUSE_HOVERS_SETTINGS_TABS,
        isHover: isHover,
    };
};