import {ENGINE_PART_INDICES, INDEX, MAIN_MENU_ITEMS_INDICES, THEME_INDICES} from "./CONSTANTS_NUMBER";

export const ID = Object.freeze({
    APP_ID: "appComponent",

    /**
     *
     */
    BASE_PANEL_ID: "basePanelComponent",
    BASE_PANEL_SVG_ID: "basePanelComponent_svg",
    BASE_PANEL_SUB_COMPONENTS_WRAPPER_ID: "basePanel_subComponentsWrapper",
    BASE_PANEL_BLUR_FILTER_ID: "basePanel_blurFilter",
    BASE_PANEL_FOCUS_GRADIENT_ID: "basePanel_focusGradient",
    BASE_PANEL_FOCUS_MASK_ID: "basePanel_focusMask",
    BASE_PANEL_SUB_COMPONENTS_INVISIBLE_WRAPPER_ID: "basePanel_subComponentsInvisibleWrapper",

    /**
     *
     */
    CENTER_CIRCLE_ID: "centerCircleComponent",
    TOP_LEFT_PANEL_ID: "topLeftPanelComponent",
    TOP_RIGHT_PANEL_ID: "topRightPanelComponent",
    BOTTOM_LEFT_PANEL_ID: "bottomLeftPanelComponent",
    BOTTOM_RIGHT_PANEL_ID: "bottomRightPanelComponent",

    /**
     *
     */
    SETTINGS_TABS_ID: "settingsTabs",
    THEMES_SETTING_ID: "themesSetting",

    /**
     *
     */

    // Animate IDs
    CENTER_COMPONENT_ANIMATE_LOADING_BAR_WIDTH: "centerComponent_animateLoadingBarWidth",
    CENTER_COMPONENT_ANIMATE_FADE_OUT: "centerComponent_animateCenterComponentFadeOut",
    CENTER_COMPONENT_ANIMATE_PARTIAL_CIRCLE_TO_FULL: "centerComponent_animatePartialCircleToFull",
    CENTER_COMPONENT_ANIMATE_FULL_CIRCLE_TO_FINAL: "centerComponent_animateFullCircleToFinal",
    CENTER_COMPONENT_ANIMATE_DASH_CIRCLE_TO_NONE: "centerComponent_animateDashCircleToNone"
});

export const UTILITY_STRING = Object.freeze({
    SHARP: "#",
    SVG_URL_PREFIX: "url(#",
    CLOSE_PARENTHESIS: ")",
    ACTION_DIV: "ActionDiv",
    MENU_BASE_DIV: "MenuBaseDiv"
});

let settingsTabsTitles = [];
settingsTabsTitles[INDEX.SETTINGS_TABS_THEME] = "theme setting";
settingsTabsTitles[INDEX.SETTINGS_TABS_VIEW] = "view setting";
settingsTabsTitles[INDEX.SETTINGS_TABS_PLAYGROUND] = "playground setting";
// settingsTabsTitles[INDEX.SETTINGS_TABS_COLOR] = "color setting";
// settingsTabsTitles[INDEX.SETTINGS_TABS_SHAPE] = "shape setting";
export const SETTINGS_TABS_TITLES = settingsTabsTitles;


/******************/
/* Single strings */
/******************/

export const APP_NAME = "appComponent";

export const CONTENT_PANEL_NAME = "contentPanel";

export const ENGINE_PART_NAME = "enginePart";

export const ENGINE_PART_MENU_NAME = "enginePartMenu";

export const ENGINE_PART_ACTION_DIV_NAME = "enginePartActionDiv";

export const ENGINE_PART_MENU_ITEM_NAME = "enginePartMenuItem";

export const SVG_IMAGE_NAME = "svgImage";

export const MAIN_MENU_NAME = "maniMenu";

/*****************************/
/* Strings grouped by object */
/*****************************/

export const COMMON_TYPE = Object.freeze({
    DEFAULT: "default",
    EMPTY: "empty",
});

/****************************/
/* Strings grouped by array */
/****************************/

let enginePartNames = [];
enginePartNames[ENGINE_PART_INDICES.ENGINE_PART_FRONT] = "engineFront";
enginePartNames[ENGINE_PART_INDICES.ENGINE_PART_MIDDLE] = "engineMiddle";
enginePartNames[ENGINE_PART_INDICES.ENGINE_PART_BACK] = "engineBack";
export const ENGINE_PART_NAMES = enginePartNames;

let themesTitles = [];
themesTitles[THEME_INDICES.THEME_DARK] = "DARK THEME";
themesTitles[THEME_INDICES.THEME_BRIGHT] = "BRIGHT THEME";
themesTitles[THEME_INDICES.THEME_YELLOW] = "YELLOW THEME";
export const THEMES_TITLES = themesTitles;

let themesDescriptions = [];
themesDescriptions[THEME_INDICES.THEME_DARK] = "Come to the DARK side, we have cookies...";
themesDescriptions[THEME_INDICES.THEME_BRIGHT] = "BRIGHT it up!!!";
themesDescriptions[THEME_INDICES.THEME_YELLOW] = "Under construction..."; // Boring...zZ... let's add some YELLOW!
export const THEMES_DESCRIPTIONS = themesDescriptions;

let mainMenuItemsNames = [];
mainMenuItemsNames[MAIN_MENU_ITEMS_INDICES.MAIN_MENU_ITEM_ENGINE] = "3D ENGINE";
mainMenuItemsNames[MAIN_MENU_ITEMS_INDICES.MAIN_MENU_ITEM_ABOUT] = "ABOUT";
mainMenuItemsNames[MAIN_MENU_ITEMS_INDICES.MAIN_MENU_ITEM_SETTINGS] = "SETTINGS";
mainMenuItemsNames[MAIN_MENU_ITEMS_INDICES.MAIN_MENU_ITEM_4] = "PLACEHOLDER";
export const MAIN_MENU_ITEMS_NAMES = mainMenuItemsNames;