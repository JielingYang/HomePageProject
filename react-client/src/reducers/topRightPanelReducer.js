import {ID, SETTINGS_TITLES} from "../utilities/CONSTANTS_STRING";
import Shape2d_Point from "../classes/shapeClasses/Shape2d_Point";
import Shape2d_Rectangle from "../classes/shapeClasses/Shape2d_Rectangle";
import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {TOP_RIGHT_PANEL_ACTION_TYPE} from "../actionCreators/topRightPanelActions";
import numberIdGenerator from "../classes/NumberIdGenerator";
import SingleSelectionModel from "../classes/StateModelClasses/SingleSelectionModel";

export type topRightPanelStateType = {
    topRightPanelShapeModel: Shape2d_Rectangle,
    topRightPanelFocusOn: boolean,
    topRightPanelPadding: number,

    settingsTabsStateModel: SingleSelectionModel,
    settingsTabsWidth: number,
    settingsTabsHeight: number,

    topRightPanelBorderSize: number,
    topRightPanelBorderRadius: number,
    topRightPanelBorderWidth: number,
    topRightPanelBorderHeight: number,
}

const topRightPanelDefaultState: topRightPanelStateType = {
    topRightPanelShapeModel: new Shape2d_Rectangle(numberIdGenerator.generateId(), ID.TOP_RIGHT_PANEL_ID, new Shape2d_Point(window.innerWidth / 2, 0), window.innerWidth / 2, window.innerHeight / 2),
    topRightPanelFocusOn: false,
    topRightPanelPadding: 10,

    settingsTabsStateModel: new SingleSelectionModel(numberIdGenerator.generateId(), ID.SETTINGS_TABS_ID, Object.values(SETTINGS_TITLES)),
    settingsTabsWidth: 0,
    settingsTabsHeight: 0,

    topRightPanelBorderSize: 5,
    topRightPanelBorderRadius: 15,
    topRightPanelBorderWidth: 0,
    topRightPanelBorderHeight: 0,
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

const topRightPanelAction_setTopRightPanelContentLayoutData_handler = (state: topRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.topRightPanelBorderWidth = action.topRightPanelBorderWidth;
    nextState.topRightPanelBorderHeight = action.topRightPanelBorderHeight;
    nextState.settingsTabsWidth = action.settingsTabsWidth;
    nextState.settingsTabsHeight = action.settingsTabsHeight;
    return nextState;
};

const topRightPanelAction_selectSettingsTab_handler = (state: topRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.settingsTabsStateModel.selectItem(action.tabIndex);
    return nextState;
};

// Check reducerCreator for explanation of handlers
const topRightPanelReducerHandlers = {
    [TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_SIZE]: topRightPanelAction_updateTopRightPanelSize_handler,
    [TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_POSITION]: topRightPanelAction_updateTopRightPanelPosition_handler,
    [TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_SET_TOP_RIGHT_PANEL_FOCUS_ON]: topRightPanelAction_setTopRightPanelFocusOn_handler,
    [TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_CONTENT_LAYOUT_DATA]: topRightPanelAction_setTopRightPanelContentLayoutData_handler,
    [TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_SELECT_SETTINGS_TAB]: topRightPanelAction_selectSettingsTab_handler,
};


export default createReducer(topRightPanelDefaultState, topRightPanelReducerHandlers);