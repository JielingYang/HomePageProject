import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/shapeClasses/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL, INDEX} from "../../utilities/CONSTANTS_NUMBER";
import {TRANSITION_TIME_NORMAL} from "../../utilities/CONSTANTS_TIME";
import {topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem, topRightPanelAction_selectSingleSelectionModelItem, topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems, topRightPanelAction_setTopRightPanelFocusOn, topRightPanelAction_requestToRemoveThemesTabContent, topRightPanelAction_setSettingsTabsContentDisplayValue} from "../../actionCreators/topRightPanelActions";
import {BLACK_TRANSPARENT_00, WHITE_TRANSPARENT_00} from "../../utilities/CONSTANTS_COLOR";
import SingleSelectionModel from "../../classes/StateModelClasses/SingleSelectionModel";
import {getSettingsTabsSvgIcon, getThemesSvgIcon} from "../../utilities/svgIcons";
import type {appStateType} from "../../reducers/appReducer";
import {appAction_changeAppTheme} from "../../actionCreators/appActions";
import type {topRightPanelStateType} from "../../reducers/topRightPanelReducer";
import {THEMES_DESCRIPTIONS, THEMES_TITLES} from "../../utilities/CONSTANTS_STRING";

type TopRightPanelPropsType = {
    appState: appStateType,
    topRightPanelState: topRightPanelStateType,

    appAction_changeAppTheme: Function,
    topRightPanelAction_setTopRightPanelFocusOn: Function,
    topRightPanelAction_selectSingleSelectionModelItem: Function,
    topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem: Function,
    topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems: Function,
    topRightPanelAction_requestToRemoveThemesTabContent: Function,
    topRightPanelAction_setSettingsTabsContentDisplayValue: Function,
}

const TopRightPanel = (props: TopRightPanelPropsType) =>
{
    let topRightPanelShapeModel: Shape2d_Rectangle = props.topRightPanelState.topRightPanelShapeModel;

    let topRightPanelStyleObject = new StyleObject().setBasics(topRightPanelShapeModel.getWidth(), topRightPanelShapeModel.getHeight(), topRightPanelShapeModel.getTopLeftPoint().getX(), topRightPanelShapeModel.getTopLeftPoint().getY())
        .setBlur(props.topRightPanelState.topRightPanelFocusOn
                 ? BLUR_LEVEL.NONE
                 : BLUR_LEVEL.MEDIUM)
        .addTransition("filter", TRANSITION_TIME_NORMAL);

    console.log(LEVEL2_CONSOLE_PREFIX + topRightPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return <div id={topRightPanelShapeModel.getStringId()} style={topRightPanelStyleObject.getStyle()}
                onMouseEnter={() => props.topRightPanelAction_setTopRightPanelFocusOn(true)}
                onMouseLeave={() => props.topRightPanelAction_setTopRightPanelFocusOn(false)}>
        {topRightPanelBorder(props.appState, props.topRightPanelState)}
        {themesSettingContent(props.appState, props.topRightPanelState, props.topRightPanelAction_selectSingleSelectionModelItem, props.topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem, props.appAction_changeAppTheme, props.topRightPanelAction_requestToRemoveThemesTabContent)}
        {settingsTabs(props.appState, props.topRightPanelState, props.topRightPanelAction_selectSingleSelectionModelItem, props.topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem, props.topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems, props.topRightPanelAction_setSettingsTabsContentDisplayValue)}
    </div>;
};

const settingsTabs = (appState: appStateType, topRightPanelState: topRightPanelStateType,
                      topRightPanelAction_selectSingleSelectionModelItem: Function,
                      topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem: Function,
                      topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems: Function,
                      topRightPanelAction_setSettingsTabsContentDisplayValue: Function) =>
{
    let settingsTabsDivStyleObject: StyleObject = new StyleObject().setBasics(topRightPanelState.topRightPanelBorderWidth, topRightPanelState.settingsTabsHeight, topRightPanelState.topRightPanelPadding, topRightPanelState.topRightPanelPadding);
    let settingsTabsStateModel: SingleSelectionModel = topRightPanelState.settingsTabsStateModel;
    let settingsTabsStateModelStringId: string = settingsTabsStateModel.getStringId();

    return <div style={settingsTabsDivStyleObject.getStyle()}
                onMouseEnter={() => topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems(true, settingsTabsStateModelStringId)}
                onMouseLeave={() => topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems(false, settingsTabsStateModelStringId)}>
        {settingsTabsStateModel.getItems().map((title: string, index: number) =>
        {
            let isThisTabSelected: boolean = settingsTabsStateModel.getSelectedItemIndex() === index;
            let mouseHoverThisTab: boolean = settingsTabsStateModel.getMouseHoveredItemIndex() === index;
            let isTheFirst: boolean = index === 0;
            let isTheLast: boolean = index === settingsTabsStateModel.getNumberOfItems() - 1;
            let blurLevel: BLUR_LEVEL = BLUR_LEVEL.VERY_LIGHT;
            let iconColor: string = appState.iconColorDefault;
            if (isThisTabSelected || mouseHoverThisTab)
            {
                blurLevel = BLUR_LEVEL.NONE;
                iconColor = appState.iconColorSelectedPrimary;
            }
            else if (settingsTabsStateModel.getMouseHover())
            {
                blurLevel = BLUR_LEVEL.EXTREMELY_LIGHT;
                iconColor = appState.iconColorSelectedSecondary;
            }

            let individualTabDivStyleObject = new StyleObject()
                .setBasics(topRightPanelState.settingsTabsWidth, topRightPanelState.settingsTabsHeight, index * topRightPanelState.settingsTabsWidth, 0)
                .setDisplay("flex")
                .setFlexDirection("column")
                .setBlur(blurLevel)
                .addTransition("background-color", TRANSITION_TIME_NORMAL)
                .addTransition("filter", TRANSITION_TIME_NORMAL);
            let tabIconWrapperDivStyleObject = new StyleObject()
                .setPosition("relative")
                .setHeight(topRightPanelState.settingsTabsHeight * 0.4)
                .setPointerEvents("none")
                .setMargin("auto")
                .setBlur(blurLevel)
                .addTransition("filter", TRANSITION_TIME_NORMAL);
            let tabTextWrapperDivStyleObject = new StyleObject()
                .setPosition("relative")
                .setPointerEvents("none")
                .setMargin("auto")
                .setBlur(blurLevel)
                .setFontColor(iconColor)
                .addTransition("filter", TRANSITION_TIME_NORMAL)
                .addTransition("color", TRANSITION_TIME_NORMAL);
            if (isTheFirst)
            {
                individualTabDivStyleObject.setBorderRadius(topRightPanelState.topRightPanelBorderRadius, 0, 0, 0);
            }
            else if (isTheLast)
            {
                individualTabDivStyleObject.setBorderRadius(0, topRightPanelState.topRightPanelBorderRadius, 0, 0);
            }

            return <div key={index} style={individualTabDivStyleObject.getStyle()}
                        onClick={() =>
                        {
                            topRightPanelAction_selectSingleSelectionModelItem(index, settingsTabsStateModelStringId);
                            topRightPanelAction_setSettingsTabsContentDisplayValue(index, "block");
                        }}
                        onMouseEnter={() => topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem(index, settingsTabsStateModelStringId)}>
                <div style={tabIconWrapperDivStyleObject.getStyle()}>
                    {getSettingsTabsSvgIcon(iconColor, index)}
                </div>
                <div style={tabTextWrapperDivStyleObject.getStyle()}>
                    {title}
                </div>
            </div>
        })}
    </div>;
};

const themesSettingContent = (appState: appStateType, topRightPanelState: topRightPanelStateType,
                              topRightPanelAction_selectSingleSelectionModelItem: Function,
                              topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem: Function,
                              appAction_changeAppTheme: Function,
                              topRightPanelAction_requestToRemoveThemesTabContent: Function) =>
{
    let topRightPanelShapeModel: Shape2d_Rectangle = topRightPanelState.topRightPanelShapeModel;
    let showContent: boolean = topRightPanelState.settingsTabsStateModel.getSelectedItemIndex() === INDEX.SETTINGS_TABS_THEME;
    let themesSettingStateModel: SingleSelectionModel = topRightPanelState.themesSettingStateModel;
    let themesSettingStateModelStringId: string = themesSettingStateModel.getStringId();
    let themesSettingsOptions: Array<string> = themesSettingStateModel.getItems();
    let themesSettingOptionsSize: number = topRightPanelState.themesSettingOptionsSize;
    let themesDescriptionWidth: number = topRightPanelState.themesDescriptionWidth;
    let displayValue: string = topRightPanelState.settingsTabsContentDisplayValues[INDEX.SETTINGS_TABS_THEME];
    let themesSettingContentOpacity: number = 0;
    let themesSettingContentY: string = "-50%";
    if (showContent)
    {
        themesSettingContentOpacity = 1;
        themesSettingContentY = "0%";
    }

    let themesSettingContentWrapperDivStyleObject = new StyleObject()
        .setBasics(topRightPanelShapeModel.getWidth(), topRightPanelShapeModel.getHeight(), 0, themesSettingContentY)
        .setOpacity(themesSettingContentOpacity)
        .setDisplay(displayValue)
        .addTransition("opacity", TRANSITION_TIME_NORMAL)
        .addTransition("top", TRANSITION_TIME_NORMAL);

    return <div style={themesSettingContentWrapperDivStyleObject.getStyle()} onTransitionEnd={(e) => topRightPanelAction_requestToRemoveThemesTabContent(e.propertyName, themesSettingContentOpacity, 0)}>
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
                             topRightPanelAction_selectSingleSelectionModelItem(index, themesSettingStateModelStringId);
                             appAction_changeAppTheme(index);
                         }
                     }}
                     onMouseEnter={() => topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem(index, themesSettingStateModelStringId)}
                     onMouseLeave={() => topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem(null, themesSettingStateModelStringId)}>
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

const topRightPanelBorder = (appState: appStateType, topRightPanelState: topRightPanelStateType) =>
{
    let topRightPanelBorderDivStyleObject: StyleObject = new StyleObject()
        .setBasics(topRightPanelState.topRightPanelBorderWidth, topRightPanelState.topRightPanelBorderHeight, topRightPanelState.topRightPanelPadding, topRightPanelState.topRightPanelPadding)
        .setBackgroundColor(appState.mainPanelsBackgroundColor)
        .setBorder(topRightPanelState.topRightPanelBorderSize, "solid", appState.mainPanelsBorderColor)
        .setBorderRadius(topRightPanelState.topRightPanelBorderRadius)
        .setPointerEvents("none")
        .setBlur(topRightPanelState.settingsTabsStateModel.getMouseHover()
                 ? BLUR_LEVEL.EXTREMELY_LIGHT
                 : BLUR_LEVEL.VERY_LIGHT)
        .addTransition("filter", TRANSITION_TIME_NORMAL);

    return <div style={topRightPanelBorderDivStyleObject.getStyle()}/>;
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
        topRightPanelAction_setTopRightPanelFocusOn: topRightPanelAction_setTopRightPanelFocusOn,
        topRightPanelAction_selectSingleSelectionModelItem: topRightPanelAction_selectSingleSelectionModelItem,
        topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem: topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem,
        topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems: topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems,
        topRightPanelAction_requestToRemoveThemesTabContent: topRightPanelAction_requestToRemoveThemesTabContent,
        topRightPanelAction_setSettingsTabsContentDisplayValue: topRightPanelAction_setSettingsTabsContentDisplayValue,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(TopRightPanel);