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

    ENGINE_FRONT_FACE_SVG_1: 0,
    ENGINE_FRONT_FACE_SVG_2: 1,
    ENGINE_FRONT_FACE_SVG_3: 2,
    ENGINE_FRONT_FACE_SVG_4: 3,
    ENGINE_FRONT_FACE_SVG_5: 4,
    ENGINE_FRONT_FACE_SVG_6: 5,

    ENGINE_MIDDLE_FACE_SVG_1: 0,
    ENGINE_MIDDLE_FACE_SVG_2: 1,
    ENGINE_MIDDLE_FACE_SVG_3: 2,
    ENGINE_MIDDLE_FACE_SVG_4: 3,
    ENGINE_MIDDLE_FACE_SVG_5: 4,
    ENGINE_MIDDLE_FACE_SVG_6: 5,
    ENGINE_MIDDLE_FACE_SVG_7: 6,

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
export const enginePartMenuItemsPositions = [];
enginePartMenuItemsPositions[INDEX.ENGINE_PART_FRONT] = [
    {
        left: "80%",
        top: "35%"
    },
    {
        left: "45%",
        top: "35%"
    },
    {
        left: "25%",
        top: "50%"
    },
    {
        left: "20%",
        top: "65%"
    }];
enginePartMenuItemsPositions[INDEX.ENGINE_PART_MIDDLE] = [
    {
        left: "67.5%",
        top: "50%"
    },
    {
        left: "32.5%",
        top: "50%"
    },
    {
        left: "7.5%",
        top: "70%"
    },
    {
        left: "32.5%",
        top: "90%"
    },
    {
        left: "67.5%",
        top: "90%"
    },
    {
        left: "87.5%",
        top: "70%"
    }];
enginePartMenuItemsPositions[INDEX.ENGINE_PART_BACK] = [
    {
        left: "32.5%",
        top: "55%"
    },
    {
        left: "60%",
        top: "72.5%"
    },
    {
        left: "32.5%",
        top: "90%"
    }];
export const ENGINE_PART_MENU_ITEMS_POSITIONS = enginePartMenuItemsPositions;