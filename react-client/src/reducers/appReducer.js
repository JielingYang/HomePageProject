import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import Shape2d_Rectangle from "../classes/shapeClasses/Shape2d_Rectangle";
import {APP_ACTION_TYPE} from "../actionCreators/appActions";
import {APP_REFRESHING_TIME_GAP} from "../utilities/CONSTANTS_TIME";
import Shape2d_Point from "../classes/shapeClasses/Shape2d_Point";
import {ID} from "../utilities/CONSTANTS_STRING";
import numberIdGenerator from "../classes/NumberIdGenerator";
import {BLACK_TRANSPARENT_00, BLACK_TRANSPARENT_10, BLACK_TRANSPARENT_50, BLACK_TRANSPARENT_90, CONSOLE_FONT_YELLOW, GREY_DARK, GREY_HEAVY, GREY_LIGHT, WHITE, WHITE_TRANSPARENT_50, WHITE_TRANSPARENT_90, YELLOW, YELLOW_DARK_1, YELLOW_DARK_2, YELLOW_LIGHT_1} from "../utilities/CONSTANTS_COLOR";
import {INDEX} from "../utilities/CONSTANTS_NUMBER";

export type appStateType = {
    appShapeModel: Shape2d_Rectangle,
    appMaximumRefreshingTimeGap: number,
    appMouseMoveEventTimeStamp: number,

    appBackgroundColor: string,
    appFontColor: string,
    mainPanelsBackgroundColor: string,
    mainPanelsBorderColor: string,
    iconColorDefault: string,
    iconColorSelectedPrimary: string,
    iconColorSelectedSecondary: string,
    iconColorDarkThemeSelected: string,
    iconColorYellowThemeSelected: string,
    iconColorBrightThemeSelected: string,
    lightUpEffectColor: string,
}

const appDefaultState: appStateType = {
    appShapeModel: new Shape2d_Rectangle(numberIdGenerator.generateId(), ID.APP_ID, new Shape2d_Point(0, 0), window.innerWidth, window.innerHeight),
    appMaximumRefreshingTimeGap: APP_REFRESHING_TIME_GAP,
    appMouseMoveEventTimeStamp: 0,

    appBackgroundColor: GREY_DARK,
    appFontColor: WHITE_TRANSPARENT_90,
    mainPanelsBackgroundColor: BLACK_TRANSPARENT_00,
    mainPanelsBorderColor: GREY_HEAVY,
    iconColorDefault: GREY_HEAVY,
    iconColorSelectedPrimary: WHITE_TRANSPARENT_90,
    iconColorSelectedSecondary: WHITE_TRANSPARENT_50,
    iconColorDarkThemeSelected: GREY_LIGHT,
    iconColorYellowThemeSelected: CONSOLE_FONT_YELLOW,
    iconColorBrightThemeSelected: WHITE,
    lightUpEffectColor: YELLOW_LIGHT_1,
};

const appAction_updateAppSize_handler = (state: appStateType, action) =>
{
    let nextState: appStateType = deepCopy(state);
    nextState.appShapeModel.updateRectangleSize(action.newAppWidth, action.newAppHeight);
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

    if(action.themeIndex === INDEX.THEME_DARK)
    {
        nextState.appBackgroundColor = GREY_DARK;
        nextState.appFontColor = WHITE_TRANSPARENT_90;
        nextState.mainPanelsBackgroundColor = BLACK_TRANSPARENT_00;
        nextState.mainPanelsBorderColor = GREY_HEAVY;
        nextState.iconColorDefault = GREY_HEAVY;
        nextState.iconColorSelectedPrimary = WHITE_TRANSPARENT_90;
        nextState.iconColorSelectedSecondary = WHITE_TRANSPARENT_50;
        nextState.iconColorDarkThemeSelected = GREY_LIGHT;
        nextState.iconColorYellowThemeSelected = CONSOLE_FONT_YELLOW;
        nextState.iconColorBrightThemeSelected = WHITE_TRANSPARENT_90;
        nextState.lightUpEffectColor = YELLOW_LIGHT_1;
    }
    else if(action.themeIndex === INDEX.THEME_YELLOW)
    {
        nextState.appBackgroundColor = GREY_LIGHT;
        nextState.appFontColor = GREY_DARK;
        nextState.mainPanelsBackgroundColor = BLACK_TRANSPARENT_00;
        nextState.mainPanelsBorderColor = GREY_DARK;
        nextState.iconColorDefault = GREY_HEAVY;
        nextState.iconColorSelectedPrimary = BLACK_TRANSPARENT_90;
        nextState.iconColorSelectedSecondary = BLACK_TRANSPARENT_50;
        nextState.iconColorDarkThemeSelected = GREY_DARK;
        nextState.iconColorYellowThemeSelected = YELLOW_DARK_1;
        nextState.iconColorBrightThemeSelected = WHITE;
        nextState.lightUpEffectColor = YELLOW_LIGHT_1;
    }
    else if(action.themeIndex === INDEX.THEME_BRIGHT)
    {
        nextState.appBackgroundColor = WHITE;
        nextState.appFontColor = WHITE_TRANSPARENT_90;
        nextState.mainPanelsBackgroundColor = BLACK_TRANSPARENT_10;
        nextState.mainPanelsBorderColor = BLACK_TRANSPARENT_00;
        nextState.iconColorDefault = GREY_HEAVY;
        nextState.iconColorSelectedPrimary = WHITE_TRANSPARENT_90;
        nextState.iconColorSelectedSecondary = WHITE_TRANSPARENT_50;
        nextState.iconColorDarkThemeSelected = GREY_LIGHT;
        nextState.iconColorYellowThemeSelected = YELLOW_DARK_2;
        nextState.iconColorBrightThemeSelected = WHITE;
        nextState.lightUpEffectColor = YELLOW;
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