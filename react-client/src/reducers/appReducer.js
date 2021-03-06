import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {APP_ACTION_TYPE} from "../actionCreators/appActions";
import {APP_REFRESHING_TIME_GAP} from "../utilities/CONSTANTS_TIME";
import {APP_NAME} from "../utilities/CONSTANTS_STRING";
import numberIdGenerator from "../classes/NumberIdGenerator";
import {BLACK, BLACK_TRANSPARENT_00, BLACK_TRANSPARENT_10, BLACK_TRANSPARENT_50, BLACK_TRANSPARENT_90, CONSOLE_FONT_YELLOW, ENGINE_BASIC_COLOR_DARK_THEME, GREY_DARK, GREY_EXTREME_DARK, GREY_HEAVY, GREY_LIGHT, WHITE, WHITE_TRANSPARENT_50, WHITE_TRANSPARENT_90, YELLOW, YELLOW_DARK_1, YELLOW_DARK_2, YELLOW_LIGHT_1, YELLOW_LIGHT_3} from "../utilities/CONSTANTS_COLOR";
import {INDEX} from "../utilities/CONSTANTS_NUMBER";
import BaseModelWithStateAndShape from "../classes/BaseModelWithStateAndShape";

export type appStateType = {
    appModel: BaseModelWithStateAndShape,
    appMaximumRefreshingTimeGap: number,
    appMouseMoveEventTimeStamp: number,

    themeIndex: number,
    appBackgroundColor: string,
    appFontColor: string,
    subPanelsBackgroundColor: string,
    subPanelsBorderColor: string,
    iconColorDefault: string,
    iconColorSelectedPrimary: string,
    iconColorSelectedSecondary: string,
    iconColorDarkThemeSelected: string,
    iconColorYellowThemeSelected: string,
    iconColorBrightThemeSelected: string,
    lightUpEffectColor: string,

    mainMenuItemBackgroundColor_default: string,
    mainMenuItemBackgroundColor_hover: string,
    mainMenuItemBackgroundColor_selected: string,

    engineBasicColor: string,
}

const appDefaultState: appStateType = {
    appModel: new BaseModelWithStateAndShape(APP_NAME, numberIdGenerator.generateId(), 0, 0, 0, window.innerWidth, window.innerHeight),
    appMaximumRefreshingTimeGap: APP_REFRESHING_TIME_GAP,
    appMouseMoveEventTimeStamp: 0,

    themeIndex: INDEX.THEME_DARK,
    appBackgroundColor: GREY_DARK,
    appFontColor: WHITE_TRANSPARENT_90,
    subPanelsBackgroundColor: BLACK_TRANSPARENT_00,
    subPanelsBorderColor: GREY_HEAVY,
    iconColorDefault: GREY_HEAVY,
    iconColorSelectedPrimary: WHITE_TRANSPARENT_90,
    iconColorSelectedSecondary: WHITE_TRANSPARENT_50,
    iconColorDarkThemeSelected: GREY_LIGHT,
    iconColorYellowThemeSelected: CONSOLE_FONT_YELLOW,
    iconColorBrightThemeSelected: WHITE,
    lightUpEffectColor: YELLOW_LIGHT_1,

    mainMenu_contentPanel_backgroundColor: BLACK,
    mainMenuItemBackgroundColor_default: BLACK_TRANSPARENT_00,
    mainMenuItemBackgroundColor_hover: GREY_DARK,
    mainMenuItemBackgroundColor_selected: GREY_DARK,

    engine_contentPanel_backgroundColor: GREY_DARK,

    engineBasicColor: ENGINE_BASIC_COLOR_DARK_THEME,
};

const appAction_updateAppSize_handler = (state: appStateType, action) =>
{
    let nextState: appStateType = deepCopy(state);
    nextState.appModel.setWidth(action.newAppWidth);
    nextState.appModel.setHeight(action.newAppHeight);
    return nextState;
};

const appAction_updateAppMaximumRefreshingTimeGap_handler = (state: appStateType, action) =>
{
    // No deepCopy here because I don't want the change of refreshing time gap to cause re-render of the appComponent
    state.appMaximumRefreshingTimeGap = action.appMaximumRefreshingTimeGap;
    return state;
};

// This handler ensures a stable graphics performance across different browsers as they have different rates for firing mouse move events,
const appAction_updateAppMouseMoveEventTimeStamp_handler = (state: appStateType, action) =>
{
    // No deepCopy here because I don't want the change of mouse move event timestamp to cause re-render of the appComponent
    state.appMouseMoveEventTimeStamp = action.mouseMoveEventTimeStamp;
    return state;
};

const appAction_changeAppTheme_handler = (state: appStateType, action) =>
{
    let nextState: appStateType = deepCopy(state);

    nextState.themeIndex = action.themeIndex;
    if (action.themeIndex === INDEX.THEME_DARK)
    {
        nextState.appBackgroundColor = GREY_DARK;
        nextState.appFontColor = WHITE_TRANSPARENT_90;
        nextState.subPanelsBackgroundColor = BLACK_TRANSPARENT_00;
        nextState.subPanelsBorderColor = GREY_HEAVY;
        nextState.iconColorDefault = GREY_HEAVY;
        nextState.iconColorSelectedPrimary = WHITE_TRANSPARENT_90;
        nextState.iconColorSelectedSecondary = WHITE_TRANSPARENT_50;
        nextState.iconColorDarkThemeSelected = GREY_LIGHT;
        nextState.iconColorYellowThemeSelected = CONSOLE_FONT_YELLOW;
        nextState.iconColorBrightThemeSelected = WHITE_TRANSPARENT_90;
        nextState.lightUpEffectColor = YELLOW_LIGHT_1;
        nextState.engineBasicColor = ENGINE_BASIC_COLOR_DARK_THEME;
    }
    else if (action.themeIndex === INDEX.THEME_BRIGHT)
    {
        nextState.appBackgroundColor = GREY_LIGHT;
        nextState.appFontColor = GREY_DARK;
        nextState.subPanelsBackgroundColor = BLACK_TRANSPARENT_00;
        nextState.subPanelsBorderColor = GREY_DARK;
        nextState.iconColorDefault = GREY_HEAVY;
        nextState.iconColorSelectedPrimary = BLACK_TRANSPARENT_90;
        nextState.iconColorSelectedSecondary = BLACK_TRANSPARENT_50;
        nextState.iconColorDarkThemeSelected = GREY_DARK;
        nextState.iconColorYellowThemeSelected = YELLOW_DARK_1;
        nextState.iconColorBrightThemeSelected = WHITE;
        nextState.lightUpEffectColor = YELLOW_LIGHT_3;
        nextState.engineBasicColor = BLACK_TRANSPARENT_50;
    }
    else if (action.themeIndex === INDEX.THEME_YELLOW)
    {
        nextState.appBackgroundColor = WHITE;
        nextState.appFontColor = WHITE_TRANSPARENT_90;
        nextState.subPanelsBackgroundColor = BLACK_TRANSPARENT_10;
        nextState.subPanelsBorderColor = BLACK_TRANSPARENT_00;
        nextState.iconColorDefault = GREY_HEAVY;
        nextState.iconColorSelectedPrimary = WHITE_TRANSPARENT_90;
        nextState.iconColorSelectedSecondary = WHITE_TRANSPARENT_50;
        nextState.iconColorDarkThemeSelected = GREY_LIGHT;
        nextState.iconColorYellowThemeSelected = YELLOW_DARK_2;
        nextState.iconColorBrightThemeSelected = WHITE;
        nextState.lightUpEffectColor = YELLOW;
        nextState.engineBasicColor = BLACK_TRANSPARENT_90;
    }

    return nextState;
};

// Check reducerCreator for explanation of handlers
const appReducerHandlers = {
    [APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_SIZE]: appAction_updateAppSize_handler,
    [APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_MAXIMUM_REFRESHING_TIME_GAP]: appAction_updateAppMaximumRefreshingTimeGap_handler,
    [APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_MOUSE_MOVE_EVENT_TIME_STAMP]: appAction_updateAppMouseMoveEventTimeStamp_handler,
    [APP_ACTION_TYPE.APP_ACTION_CHANGE_APP_THEME]: appAction_changeAppTheme_handler,
};

export default createReducer(appDefaultState, appReducerHandlers);