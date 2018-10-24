import Shape2d_Point from "../classes/shapeClasses/Shape2d_Point";
import Shape2d_Rectangle from "../classes/shapeClasses/Shape2d_Rectangle";
import type {topRightPanelStateType} from "../reducers/topRightPanelReducer";

/* ************************** Requesting actions ************************** */
/* This kind of actions do not send new data directly to reducer            */
/* They check on new data to decide whether to call updating actions or not */
/* ************************************************************************ */

export const topRightPanelAction_requestToUpdateTopRightPanelContentLayoutData = () =>
{
    return (dispatch, getState) =>
    {
        let topRightPanelState: topRightPanelStateType = getState().topRightPanelState;
        let basePanelUnitLength: number = getState().basePanelState.basePanelShapeModel.getUnitLength();
        let topRightPanelShapeModel: Shape2d_Rectangle = topRightPanelState.topRightPanelShapeModel;
        let numberOfSettingsTabs: number = topRightPanelState.settingsTabsStateModel.getNumberOfItems();
        let numberOfThemes: number = topRightPanelState.themesSettingStateModel.getNumberOfItems();
        let topRightPanelPadding: number = topRightPanelState.topRightPanelPadding;

        let topRightPanelBorderWidth: number = topRightPanelShapeModel.getWidth() - 2 * topRightPanelPadding;
        let topRightPanelBorderHeight: number = topRightPanelShapeModel.getHeight() - 2 * topRightPanelPadding;
        let topRightPanelBorderSize: number = basePanelUnitLength * 0.5;
        let topRightPanelBorderRadius: number = basePanelUnitLength * 3;

        let settingsTabsWidth: number = topRightPanelBorderWidth / numberOfSettingsTabs;
        let settingsTabsHeight: number = topRightPanelShapeModel.getYUnitLength() * 13;

        let themesSettingOptionsSize: number = basePanelUnitLength * 5;
        let themesSettingOptionsGap: number = themesSettingOptionsSize / 1.2;
        let themesSettingOptionsStartingX: number = (topRightPanelShapeModel.getWidth() - numberOfThemes * themesSettingOptionsSize - (numberOfThemes - 1) * themesSettingOptionsGap) / 2;
        let themesSettingOptionsStartingY: number = settingsTabsHeight + (topRightPanelShapeModel.getHeight() - settingsTabsHeight - themesSettingOptionsSize) / 2;

        let themesTitleStartingY: number = settingsTabsHeight + (themesSettingOptionsStartingY - settingsTabsHeight) * 2 / 3;
        let themesDescriptionWidth: number = basePanelUnitLength * 30;
        let themesDescriptionStartingY: number = themesSettingOptionsStartingY + topRightPanelShapeModel.getYUnitLength() * 13;

        dispatch(topRightPanelAction_updateTopRightPanelContentLayoutData(topRightPanelBorderWidth, topRightPanelBorderHeight, topRightPanelBorderSize, topRightPanelBorderRadius, settingsTabsWidth, settingsTabsHeight, themesTitleStartingY, themesDescriptionStartingY, themesDescriptionWidth, themesSettingOptionsSize, themesSettingOptionsGap, themesSettingOptionsStartingX, themesSettingOptionsStartingY));
    }
};

export const topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems = (hover: boolean, modelStringId: string) =>
{
    return (dispatch) =>
    {
        if (!hover)
        {
            dispatch(topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem(null, modelStringId));
        }
        dispatch(topRightPanelAction_setMouseHoverOnSingleSelectionModelItems(hover, modelStringId));
    }
};

export const topRightPanelAction_requestToSetSettingsTabsContentDisplayValueToNoneWhenTransitionEnd = (tabIndex: number, transitionName: string, transitionedValue: number, valueToCheck: number) =>
{
    return (dispatch, getSate) =>
    {
        if(transitionName === "opacity" && transitionedValue === valueToCheck && getSate().topRightPanelState.settingsTabsStateModel.getMouseHoveredItemIndex() !== tabIndex)
        {
            dispatch(topRightPanelAction_setSettingsTabsContentDisplayValue(tabIndex, "none"));
        }
    }
};

export const topRightPanelAction_requestToSetSettingsTabsContentDisplayValueToNoneWhenMouseLeave = (tabIndex: number) =>
{
    return (dispatch, getSate) =>
    {
        if(getSate().topRightPanelState.settingsTabsStateModel.getSelectedItemIndex() !== tabIndex)
        {
            dispatch(topRightPanelAction_setSettingsTabsContentDisplayValue(tabIndex, "none"));
        }
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
    TOP_RIGHT_PANEL_ACTION_SELECT_SINGLE_SELECTION_MODEL_ITEM: "TOP_RIGHT_PANEL_ACTION_SELECT_SINGLE_SELECTION_MODEL_ITEM",
    TOP_RIGHT_PANEL_ACTION_SET_MOUSE_HOVER_ON_SINGLE_SELECTION_MODEL_INDIVIDUAL_ITEM: "TOP_RIGHT_PANEL_ACTION_SET_MOUSE_HOVER_ON_SINGLE_SELECTION_MODEL_INDIVIDUAL_ITEM",
    TOP_RIGHT_PANEL_ACTION_SET_MOUSE_HOVER_ON_SINGE_SELECTION_MODEL_ITEMS: "TOP_RIGHT_PANEL_ACTION_SET_MOUSE_HOVER_ON_SINGE_SELECTION_MODEL_ITEMS",
    TOP_RIGHT_PANEL_ACTION_SET_SETTINGS_TABS_CONTENT_DISPLAY_VALUE: "TOP_RIGHT_PANEL_ACTION_SET_SETTINGS_TABS_CONTENT_DISPLAY_VALUE",
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

const topRightPanelAction_updateTopRightPanelContentLayoutData = (topRightPanelBorderWidth: number, topRightPanelBorderHeight: number, topRightPanelBorderSize: number, topRightPanelBorderRadius: number, settingsTabsWidth: number, settingsTabsHeight: number, themesTitleStartingY: number, themesDescriptionStartingY: number, themesDescriptionWidth: number, themesSettingOptionsSize: number, themesSettingOptionsGap: number, themesSettingOptionsStartingX: number, themesSettingOptionsStartingY: number) =>
{
    return {
        type: TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_CONTENT_LAYOUT_DATA,
        topRightPanelBorderWidth: topRightPanelBorderWidth,
        topRightPanelBorderHeight: topRightPanelBorderHeight,
        settingsTabsWidth: settingsTabsWidth,
        settingsTabsHeight: settingsTabsHeight,
        topRightPanelBorderSize: topRightPanelBorderSize,
        topRightPanelBorderRadius: topRightPanelBorderRadius,
        themesTitleStartingY: themesTitleStartingY,
        themesDescriptionStartingY: themesDescriptionStartingY,
        themesDescriptionWidth: themesDescriptionWidth,
        themesSettingOptionsSize: themesSettingOptionsSize,
        themesSettingOptionsGap: themesSettingOptionsGap,
        themesSettingOptionsStartingX: themesSettingOptionsStartingX,
        themesSettingOptionsStartingY: themesSettingOptionsStartingY,
    };
};

export const topRightPanelAction_selectSingleSelectionModelItem = (itemIndex: number, modelStringId: string) =>
{
    return {
        type: TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_SELECT_SINGLE_SELECTION_MODEL_ITEM,
        itemIndex: itemIndex,
        modelStringId: modelStringId,
    };
};

export const topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem = (itemIndex: number, modelStringId: string) =>
{
    return {
        type: TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_SET_MOUSE_HOVER_ON_SINGLE_SELECTION_MODEL_INDIVIDUAL_ITEM,
        itemIndex: itemIndex,
        modelStringId: modelStringId,
    };
};

const topRightPanelAction_setMouseHoverOnSingleSelectionModelItems = (hover: boolean, modelStringId: string) =>
{
    return {
        type: TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_SET_MOUSE_HOVER_ON_SINGE_SELECTION_MODEL_ITEMS,
        hover: hover,
        modelStringId: modelStringId,
    };
};

export const topRightPanelAction_setSettingsTabsContentDisplayValue = (itemIndex: number, display: string) =>
{
    return {
        type: TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_SET_SETTINGS_TABS_CONTENT_DISPLAY_VALUE,
        itemIndex: itemIndex,
        display: display,
    };
};