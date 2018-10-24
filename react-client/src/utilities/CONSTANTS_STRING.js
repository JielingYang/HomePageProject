import {INDEX} from "./CONSTANTS_NUMBER";

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
    CLOSE_PARENTHESIS: ")"
});

let settingsTabsTitles = [];
settingsTabsTitles[INDEX.SETTINGS_TABS_THEME] = "theme setting";
settingsTabsTitles[INDEX.SETTINGS_TABS_COLOR] = "color setting";
settingsTabsTitles[INDEX.SETTINGS_TABS_SHAPE] = "shape setting";
settingsTabsTitles[INDEX.SETTINGS_TABS_VIEW] = "view setting";
settingsTabsTitles[INDEX.SETTINGS_TABS_PLAYGROUND] = "playground setting";
export const SETTINGS_TABS_TITLES = settingsTabsTitles;

let themesTitles = [];
themesTitles[INDEX.THEME_DARK] = "DARK THEME";
themesTitles[INDEX.THEME_YELLOW] = "YELLOW THEME";
themesTitles[INDEX.THEME_BRIGHT] = "BRIGHT THEME";
export const THEMES_TITLES = themesTitles;

let themesDescriptions = [];
themesDescriptions[INDEX.THEME_DARK] = "Come to the DARK side, we have cookies...";
themesDescriptions[INDEX.THEME_YELLOW] = "Boring...zZ... let's add some YELLOW!";
themesDescriptions[INDEX.THEME_BRIGHT] = "BRIGHT it up!!! (under construction...)";
export const THEMES_DESCRIPTIONS = themesDescriptions;