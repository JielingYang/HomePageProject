export const BLUR_LEVEL = Object.freeze({
    NONE: 0,
    EXTREMELY_LIGHT: 2,
    VERY_LIGHT: 4,
    LIGHT: 6,
    MEDIUM: 12,
    HEAVY: 18
});

export const INDEX = Object.freeze({
    SETTINGS_TABS_THEME: 0,
    SETTINGS_TABS_VIEW: 1,
    SETTINGS_TABS_PLAYGROUND: 2,
    SETTINGS_TABS_COLOR: 3,
    SETTINGS_TABS_SHAPE: 4,

    THEME_DARK: 0,
    THEME_BRIGHT: 1,
    THEME_YELLOW: 2,

    ENGINE_PART_FRONT: 2,
    ENGINE_PART_MIDDLE: 1,
    ENGINE_PART_BACK: 0,

    TICK_SVG: 0,
    CANCEL_SVG: 1,

    ENGINE_FRONT_FACE_SVG_1: 0,
    ENGINE_FRONT_FACE_SVG_2: 1,
    ENGINE_FRONT_FACE_SVG_3: 2,
    ENGINE_FRONT_FACE_SVG_4: 3,

    ENGINE_MIDDLE_FACE_SVG_1: 0,
    ENGINE_MIDDLE_FACE_SVG_2: 1,
    ENGINE_MIDDLE_FACE_SVG_3: 2,
    ENGINE_MIDDLE_FACE_SVG_4: 3,
    ENGINE_MIDDLE_FACE_SVG_5: 4,

    ENGINE_BACK_FACE_SVG_1: 0,
    ENGINE_BACK_FACE_SVG_2: 1,
    ENGINE_BACK_FACE_SVG_3: 2,
});

export const BASE_PANEL_MAX_ROTATION_DEGREE_VALUE = 20;
export const BASE_PANEL_MAX_TRANSLATE_PERCENTAGE_VALUE = 0;
export const NUMBER_OF_ENGINE_PART_SIDES = 8;
export const NUMBER_OF_ENGINE_PART_SIDE_FACES = 3;
export const DEFAULT_ENGINE_ROTATION_X_VALUE = -10;
export const DEFAULT_ENGINE_ROTATION_Y_VALUE = 45;

export const ENGINE_PART_MENU_BASE_DIV_SIZE = "200%";
export const ENGINE_PART_MENU_BASE_DIV_POSITION = "-100%";
export const ENGINE_PART_MENU_ITEM_WIDTH = "30%";
export const ENGINE_PART_MENU_ITEM_HEIGHT = "10%";
let enginePartMenuItemsPositions = [];
let enginePartFrontMenuItemsPositions = [];
let enginePartMiddleMenuItemsPositions = [];
let enginePartBackMenuItemsPositions = [];
enginePartFrontMenuItemsPositions[INDEX.ENGINE_FRONT_FACE_SVG_1] = {left: "70%", top: "32.5%"};
enginePartFrontMenuItemsPositions[INDEX.ENGINE_FRONT_FACE_SVG_2] = {left: "90%", top: "50%"};
enginePartFrontMenuItemsPositions[INDEX.ENGINE_FRONT_FACE_SVG_3] = {left: "105%", top: "67.5%"};
enginePartFrontMenuItemsPositions[INDEX.ENGINE_FRONT_FACE_SVG_4] = {left: "105%", top: "85%"};
enginePartFrontMenuItemsPositions.push({left: "20%", top: "85%"});
enginePartMiddleMenuItemsPositions[INDEX.ENGINE_MIDDLE_FACE_SVG_1] = {left: "32.5%", top: "47.5%"};
enginePartMiddleMenuItemsPositions[INDEX.ENGINE_MIDDLE_FACE_SVG_2] = {left: "67.5%", top: "47.5%"};
enginePartMiddleMenuItemsPositions[INDEX.ENGINE_MIDDLE_FACE_SVG_3] = {left: "97.5%", top: "70%"};
enginePartMiddleMenuItemsPositions[INDEX.ENGINE_MIDDLE_FACE_SVG_4] = {left: "67.5%", top: "95%"};
enginePartMiddleMenuItemsPositions[INDEX.ENGINE_MIDDLE_FACE_SVG_5] = {left: "32.5%", top: "95%"};
enginePartMiddleMenuItemsPositions.push({left: "2.5%", top: "70%"});
enginePartBackMenuItemsPositions[INDEX.ENGINE_BACK_FACE_SVG_1] = {left: "40%", top: "50%"};
enginePartBackMenuItemsPositions[INDEX.ENGINE_BACK_FACE_SVG_2] = {left: "68%", top: "70%"};
enginePartBackMenuItemsPositions[INDEX.ENGINE_BACK_FACE_SVG_3] = {left: "40%", top: "87.5%"};
enginePartBackMenuItemsPositions.push({left: "12%", top: "70%"});
enginePartMenuItemsPositions[INDEX.ENGINE_PART_FRONT] = enginePartFrontMenuItemsPositions;
enginePartMenuItemsPositions[INDEX.ENGINE_PART_MIDDLE] = enginePartMiddleMenuItemsPositions;
enginePartMenuItemsPositions[INDEX.ENGINE_PART_BACK] = enginePartBackMenuItemsPositions;
export const ENGINE_PART_MENU_ITEMS_POSITIONS = enginePartMenuItemsPositions;