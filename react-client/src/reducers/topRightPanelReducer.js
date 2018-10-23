import {ID, SETTINGS_TABS_TITLES, THEMES_TITLES} from "../utilities/CONSTANTS_STRING";
import Shape2d_Point from "../classes/shapeClasses/Shape2d_Point";
import Shape2d_Rectangle from "../classes/shapeClasses/Shape2d_Rectangle";
import {deepCopy, getObjectById} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {TOP_RIGHT_PANEL_ACTION_TYPE} from "../actionCreators/topRightPanelActions";
import numberIdGenerator from "../classes/NumberIdGenerator";
import SingleSelectionModel from "../classes/StateModelClasses/SingleSelectionModel";
import {INDEX} from "../utilities/CONSTANTS_NUMBER";

let settingsTabsContentDisplayValues: Array<string> = [];
settingsTabsContentDisplayValues[INDEX.SETTINGS_TABS_THEME] = "block";
settingsTabsContentDisplayValues[INDEX.SETTINGS_TABS_COLOR] = "none";
settingsTabsContentDisplayValues[INDEX.SETTINGS_TABS_SHAPE] = "none";
settingsTabsContentDisplayValues[INDEX.SETTINGS_TABS_VIEW] = "none";
settingsTabsContentDisplayValues[INDEX.SETTINGS_TABS_PLAYGROUND] = "none";

export type topRightPanelStateType = {
    topRightPanelShapeModel: Shape2d_Rectangle,
    topRightPanelFocusOn: boolean,
    topRightPanelPadding: number,
    topRightPanelBorderSize: number,
    topRightPanelBorderRadius: number,
    topRightPanelBorderWidth: number,
    topRightPanelBorderHeight: number,

    settingsTabsStateModel: SingleSelectionModel,
    settingsTabsWidth: number,
    settingsTabsHeight: number,
    settingsTabsContentDisplayValues: Array<string>,

    themesDisplay: string,
    themesTitleStartingY: number,
    themesDescriptionStartingY: number,
    themesDescriptionWidth: number,
    themesSettingStateModel: SingleSelectionModel,
    themesSettingOptionsSize: number,
    themesSettingOptionsGap: number,
    themesSettingOptionsStartingX: number,
    themesSettingOptionsStartingY: number,
}

const topRightPanelDefaultState: topRightPanelStateType = {
    topRightPanelShapeModel: new Shape2d_Rectangle(numberIdGenerator.generateId(), ID.TOP_RIGHT_PANEL_ID, new Shape2d_Point(window.innerWidth / 2, 0), window.innerWidth / 2, window.innerHeight / 2),
    topRightPanelFocusOn: false,
    topRightPanelPadding: 10,
    topRightPanelBorderSize: 0,
    topRightPanelBorderRadius: 0,
    topRightPanelBorderWidth: 0,
    topRightPanelBorderHeight: 0,

    settingsTabsStateModel: new SingleSelectionModel(numberIdGenerator.generateId(), ID.SETTINGS_TABS_ID, SETTINGS_TABS_TITLES),
    settingsTabsWidth: 0,
    settingsTabsHeight: 0,
    settingsTabsContentDisplayValues: settingsTabsContentDisplayValues,

    themesTitleStartingY: 0,
    themesDescriptionStartingY: 0,
    themesDescriptionWidth: 0,
    themesSettingStateModel: new SingleSelectionModel(numberIdGenerator.generateId(), ID.THEMES_SETTING_ID, THEMES_TITLES),
    themesSettingOptionsSize: 0,
    themesSettingOptionsGap: 0,
    themesSettingOptionsStartingX: 0,
    themesSettingOptionsStartingY: 0,
};

const topRightPanelAction_updateTopRightPanelSize_handler = (state: topRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.topRightPanelShapeModel.updateRectangleSize(action.newTopRightPanelWidth, action.newTopRightPanelHeight);
    return nextState;
};

const topRightPanelAction_updateTopRightPanelPosition_handler = (state: topRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.topRightPanelShapeModel.updateTopLeftPoint(action.newPosition);
    return nextState;
};

const topRightPanelAction_setTopRightPanelFocusOn_handler = (state: topRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.topRightPanelFocusOn = action.focusOn;
    return nextState;
};

const topRightPanelAction_selectSingleSelectionModelItem_handler = (state: topRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    let targetStateModel: SingleSelectionModel = getObjectById(nextState, action.modelStringId);
    if (targetStateModel.getSelectedItemIndex() !== action.itemIndex)
    {
        targetStateModel.selectItem(action.itemIndex);
        return nextState;
    }
    else
    {
        return state;
    }
};

const topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem_handler = (state: topRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    let targetStateModel: SingleSelectionModel = getObjectById(nextState, action.modelStringId);
    if (targetStateModel.getMouseHoveredItemIndex() !== action.itemIndex)
    {
        targetStateModel.mouseHoversItem(action.itemIndex);
        return nextState;
    }
    else
    {
        return state;
    }
};

const topRightPanelAction_setMouseHoverOnSingleSelectionModelItems_handler = (state: topRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    let targetStateModel: SingleSelectionModel = getObjectById(nextState, action.modelStringId);
    targetStateModel.setMouseHover(action.hover);
    return nextState;
};

const topRightPanelAction_setSettingsTabsContentDisplayValue_handler = (state: topRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.settingsTabsContentDisplayValues[action.itemIndex] = action.display;
    return nextState;
};

const topRightPanelAction_setTopRightPanelContentLayoutData_handler = (state: topRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.topRightPanelBorderWidth = action.topRightPanelBorderWidth;
    nextState.topRightPanelBorderHeight = action.topRightPanelBorderHeight;
    nextState.topRightPanelBorderSize = action.topRightPanelBorderSize;
    nextState.topRightPanelBorderRadius = action.topRightPanelBorderRadius;
    nextState.settingsTabsWidth = action.settingsTabsWidth;
    nextState.settingsTabsHeight = action.settingsTabsHeight;
    nextState.themesTitleStartingY = action.themesTitleStartingY;
    nextState.themesDescriptionStartingY = action.themesDescriptionStartingY;
    nextState.themesDescriptionWidth = action.themesDescriptionWidth;
    nextState.themesSettingOptionsSize = action.themesSettingOptionsSize;
    nextState.themesSettingOptionsGap = action.themesSettingOptionsGap;
    nextState.themesSettingOptionsStartingX = action.themesSettingOptionsStartingX;
    nextState.themesSettingOptionsStartingY = action.themesSettingOptionsStartingY;
    return nextState;
};

// Check reducerCreator for explanation of handlers
const topRightPanelReducerHandlers = {
    [TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_SIZE]: topRightPanelAction_updateTopRightPanelSize_handler,
    [TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_POSITION]: topRightPanelAction_updateTopRightPanelPosition_handler,
    [TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_SET_TOP_RIGHT_PANEL_FOCUS_ON]: topRightPanelAction_setTopRightPanelFocusOn_handler,
    [TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_CONTENT_LAYOUT_DATA]: topRightPanelAction_setTopRightPanelContentLayoutData_handler,
    [TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_SELECT_SINGLE_SELECTION_MODEL_ITEM]: topRightPanelAction_selectSingleSelectionModelItem_handler,
    [TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_SET_MOUSE_HOVER_ON_SINGLE_SELECTION_MODEL_INDIVIDUAL_ITEM]: topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem_handler,
    [TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_SET_MOUSE_HOVER_ON_SINGE_SELECTION_MODEL_ITEMS]: topRightPanelAction_setMouseHoverOnSingleSelectionModelItems_handler,
    [TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_SET_SETTINGS_TABS_CONTENT_DISPLAY_VALUE]: topRightPanelAction_setSettingsTabsContentDisplayValue_handler,
};


export default createReducer(topRightPanelDefaultState, topRightPanelReducerHandlers);