import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/shapeClasses/Shape2d_Rectangle";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL, INDEX} from "../../utilities/CONSTANTS_NUMBER";
import {TRANSITION_TIME_NORMAL} from "../../utilities/CONSTANTS_TIME";
import {topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem, topRightPanelAction_selectSingleSelectionModelItem, topRightPanelAction_requestToRemoveThemesTabContent} from "../../actionCreators/topRightPanelActions";
import {BLACK_TRANSPARENT_00, WHITE_TRANSPARENT_00} from "../../utilities/CONSTANTS_COLOR";
import SingleSelectionModel from "../../classes/StateModelClasses/SingleSelectionModel";
import {getThemesSvgIcon} from "../../utilities/svgIcons";
import type {appStateType} from "../../reducers/appReducer";
import {appAction_changeAppTheme} from "../../actionCreators/appActions";
import type {topRightPanelStateType} from "../../reducers/topRightPanelReducer";
import {THEMES_DESCRIPTIONS, THEMES_TITLES} from "../../utilities/CONSTANTS_STRING";

type TopRightPanel_SettingsTabsThemesSettingPropsType = {
    appState: appStateType,
    topRightPanelState: topRightPanelStateType,
    appAction_changeAppTheme: Function,
    topRightPanelAction_selectSingleSelectionModelItem: Function,
    topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem: Function,
    topRightPanelAction_requestToRemoveThemesTabContent: Function,
}

const TopRightPanel_SettingsTabsThemesSetting = (props: TopRightPanel_SettingsTabsThemesSettingPropsType) =>
{
    let appState: appStateType = props.appState;
    let topRightPanelState: topRightPanelStateType = props.topRightPanelState;
    let topRightPanelShapeModel: Shape2d_Rectangle = topRightPanelState.topRightPanelShapeModel;
    let showContent: boolean = topRightPanelState.settingsTabsStateModel.getSelectedItemIndex() === INDEX.SETTINGS_TABS_THEME;
    let themesSettingStateModel: SingleSelectionModel = topRightPanelState.themesSettingStateModel;
    let themesSettingStateModelStringId: string = themesSettingStateModel.getStringId();
    let themesSettingsOptions: Array<string> = themesSettingStateModel.getItems();
    let themesSettingOptionsSize: number = topRightPanelState.themesSettingOptionsSize;
    let themesDescriptionWidth: number = topRightPanelState.themesDescriptionWidth;
    let displayValue: string = topRightPanelState.settingsTabsContentDisplayValues[INDEX.SETTINGS_TABS_THEME];
    let themesSettingContentOpacity: number = 0;
    let themesSettingContentY: number | string = topRightPanelState.settingsTabsContentHideY;
    if (showContent)
    {
        themesSettingContentOpacity = 1;
        themesSettingContentY = 0;
    }

    let themesSettingContentWrapperDivStyleObject = new StyleObject()
        .setBasics(topRightPanelShapeModel.getWidth(), topRightPanelShapeModel.getHeight(), 0, themesSettingContentY)
        .setOpacity(themesSettingContentOpacity)
        .setDisplay(displayValue)
        .addTransition("opacity", TRANSITION_TIME_NORMAL)
        .addTransition("top", TRANSITION_TIME_NORMAL);

    return <div style={themesSettingContentWrapperDivStyleObject.getStyle()}
                onTransitionEnd={(e) => props.topRightPanelAction_requestToRemoveThemesTabContent(e.propertyName, themesSettingContentOpacity, 0)}>
        {themesSettingsOptions.map((title: string, index: number) =>
        {
            let isThisOptionSelected: boolean = themesSettingStateModel.getSelectedItemIndex() === index;
            let mouseHoverThisOption: boolean = themesSettingStateModel.getMouseHoveredItemIndex() === index;
            let themeTitleBlurLevel: BLUR_LEVEL = BLUR_LEVEL.HEAVY;
            let themeTitleFontColor: string = BLACK_TRANSPARENT_00;
            let themesTitleStartingY: number = themesSettingOptionsSize * 2;
            let themesOptionBlurLevel: BLUR_LEVEL = BLUR_LEVEL.LIGHT;
            let themesDescriptionBlurLevel: BLUR_LEVEL = BLUR_LEVEL.HEAVY;
            let themesDescriptionFontColor: number = BLACK_TRANSPARENT_00;
            let iconColor: string = appState.iconColorDefault;
            let lightBulbEffectColor: string = WHITE_TRANSPARENT_00;
            let scale: number = 0.7;
            let themesSettingOptionsStartingX: number = topRightPanelState.themesSettingOptionsStartingX + index * (themesSettingOptionsSize + topRightPanelState.themesSettingOptionsGap);
            let themesDescriptionStartingX: number = themesSettingOptionsStartingX + (themesSettingOptionsSize - themesDescriptionWidth) / 2;

            if (showContent)
            {
                if (isThisOptionSelected || mouseHoverThisOption)
                {
                    themesOptionBlurLevel = BLUR_LEVEL.NONE;
                    scale = 1;

                    if (index === INDEX.THEME_DARK)
                    {
                        iconColor = appState.iconColorDarkThemeSelected;
                    }
                    else if (index === INDEX.THEME_YELLOW)
                    {
                        iconColor = appState.iconColorYellowThemeSelected;
                    }
                    else if (index === INDEX.THEME_BRIGHT)
                    {
                        iconColor = appState.iconColorBrightThemeSelected;
                        lightBulbEffectColor = appState.lightUpEffectColor;
                    }

                    if (mouseHoverThisOption)
                    {
                        themesDescriptionBlurLevel = BLUR_LEVEL.NONE;
                        themesDescriptionFontColor = appState.appFontColor;
                    }

                    if (isThisOptionSelected)
                    {
                        themeTitleBlurLevel = BLUR_LEVEL.NONE;
                        themeTitleFontColor = appState.appFontColor;
                        themesTitleStartingY = topRightPanelState.themesTitleStartingY
                    }
                }
            }

            let themesTitleDivStyleObject = new StyleObject()
                .setBasics(topRightPanelState.topRightPanelShapeModel.getWidth(), 0, 0, themesTitleStartingY)
                .setPointerEvents("none")
                .setFontColor(themeTitleFontColor)
                .setBlur(themeTitleBlurLevel)
                .addTransition("filter", TRANSITION_TIME_NORMAL)
                .addTransition("color", TRANSITION_TIME_NORMAL)
                .addTransition("top", TRANSITION_TIME_NORMAL)
                .setTextAlign("center");
            let themeSettingOptionDivStyleObject = new StyleObject()
                .setBasics(themesSettingOptionsSize, themesSettingOptionsSize, themesSettingOptionsStartingX, topRightPanelState.themesSettingOptionsStartingY)
                .setBlur(themesOptionBlurLevel)
                .addScale(scale, scale)
                .addTransition("filter", TRANSITION_TIME_NORMAL)
                .addTransition("top", TRANSITION_TIME_NORMAL)
                .addTransition("transform", TRANSITION_TIME_NORMAL);
            let lightBulbEffectStyleObject = new StyleObject()
                .setBasics("80%", "80%", "10%", "0%")
                .setBackgroundColor(lightBulbEffectColor)
                .setBlur(BLUR_LEVEL.HEAVY)
                .setPointerEvents("none")
                .addTransition("background-color", TRANSITION_TIME_NORMAL);
            let themesDescriptionDivStyleObject = new StyleObject()
                .setBasics(themesDescriptionWidth, 0, themesDescriptionStartingX, topRightPanelState.themesDescriptionStartingY)
                .setPointerEvents("none")
                .setTextAlign("center")
                .setFontColor(themesDescriptionFontColor)
                .setBlur(themesDescriptionBlurLevel)
                .addTransition("filter", TRANSITION_TIME_NORMAL)
                .addTransition("top", TRANSITION_TIME_NORMAL)
                .addTransition("color", TRANSITION_TIME_NORMAL);

            return <div key={index}>
                <div style={themesTitleDivStyleObject.getStyle()}>
                    {THEMES_TITLES[themesSettingStateModel.getSelectedItemIndex()]}
                </div>
                <div style={themeSettingOptionDivStyleObject.getStyle()}
                     onClick={() =>
                     {
                         if (index !== INDEX.THEME_BRIGHT) // TODO - bright theme not available for now
                         {
                             props.topRightPanelAction_selectSingleSelectionModelItem(index, themesSettingStateModelStringId);
                             props.appAction_changeAppTheme(index);
                         }
                     }}
                     onMouseEnter={() => props.topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem(index, themesSettingStateModelStringId)}
                     onMouseLeave={() => props.topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem(null, themesSettingStateModelStringId)}>
                    <div style={lightBulbEffectStyleObject.getStyle()}/>
                    {getThemesSvgIcon(iconColor, index)}
                </div>
                <div style={themesDescriptionDivStyleObject.getStyle()}>
                    {THEMES_DESCRIPTIONS[index]}
                </div>
            </div>
        })}
    </div>;
};

const mapStateToProps = (store) =>
{
    return {
        appState: store.appState,
        topRightPanelState: store.topRightPanelState,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
        appAction_changeAppTheme: appAction_changeAppTheme,
        topRightPanelAction_selectSingleSelectionModelItem: topRightPanelAction_selectSingleSelectionModelItem,
        topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem: topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem,
        topRightPanelAction_requestToRemoveThemesTabContent: topRightPanelAction_requestToRemoveThemesTabContent,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(TopRightPanel_SettingsTabsThemesSetting);