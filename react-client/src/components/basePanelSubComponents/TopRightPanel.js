import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/shapeClasses/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL, INDEX} from "../../utilities/CONSTANTS_NUMBER";
import {TRANSITION_TIME_NORMAL} from "../../utilities/CONSTANTS_TIME";
import {topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem, topRightPanelAction_selectSingleSelectionModelItem, topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems, topRightPanelAction_setTopRightPanelFocusOn} from "../../actionCreators/topRightPanelActions";
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
}

const TopRightPanel = (props: TopRightPanelPropsType) =>
{
    let topRightPanelShapeModel: Shape2d_Rectangle = props.topRightPanelState.topRightPanelShapeModel;
    let settingsTabsStateModel: SingleSelectionModel = props.topRightPanelState.settingsTabsStateModel;
    let settingsTabsStateModelStringId = settingsTabsStateModel.getStringId();
    let isMouseHoverSettingsTabs = settingsTabsStateModel.getMouseHover();

    let topRightPanelStyleObject = new StyleObject().setBasics(topRightPanelShapeModel.getWidth(), topRightPanelShapeModel.getHeight(), topRightPanelShapeModel.getTopLeftPoint().getX(), topRightPanelShapeModel.getTopLeftPoint().getY())
        .setBlur(props.topRightPanelState.topRightPanelFocusOn
                 ? BLUR_LEVEL.NONE
                 : BLUR_LEVEL.MEDIUM)
        .addTransition("filter", TRANSITION_TIME_NORMAL);

    /**
     * Panel border
     */
    let topRightPanelBorderDivStyleObject = new StyleObject()
        .setBasics(props.topRightPanelState.topRightPanelBorderWidth, props.topRightPanelState.topRightPanelBorderHeight, props.topRightPanelState.topRightPanelPadding, props.topRightPanelState.topRightPanelPadding)
        .setBackgroundColor(props.appState.mainPanelsBackgroundColor)
        .setBorder(props.topRightPanelState.topRightPanelBorderSize, "solid", props.appState.mainPanelsBorderColor)
        .setBorderRadius(props.topRightPanelState.topRightPanelBorderRadius)
        .setPointerEvents("none")
        .setBlur(isMouseHoverSettingsTabs
                 ? BLUR_LEVEL.EXTREMELY_LIGHT
                 : BLUR_LEVEL.VERY_LIGHT)
        .addTransition("filter", TRANSITION_TIME_NORMAL);

    let panelBorder = <div style={topRightPanelBorderDivStyleObject.getStyle()}/>;

    /**
     * Tabs
     */
    let settingsTabsDivStyleObject = new StyleObject().setBasics(props.topRightPanelState.topRightPanelBorderWidth, props.topRightPanelState.settingsTabsHeight, props.topRightPanelState.topRightPanelPadding, props.topRightPanelState.topRightPanelPadding);
    let settingsTabs = <div style={settingsTabsDivStyleObject.getStyle()}
                            onMouseEnter={() => props.topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems(true, settingsTabsStateModelStringId)}
                            onMouseLeave={() => props.topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems(false, settingsTabsStateModelStringId)}>
        {settingsTabsStateModel.getItems().map((title: string, index: number) =>
        {
            let isThisTabSelected = settingsTabsStateModel.getSelectedItemIndex() === index;
            let mouseHoverThisTab = settingsTabsStateModel.getMouseHoveredItemIndex() === index;
            let isTheFirst = index === 0;
            let isTheLast = index === settingsTabsStateModel.getNumberOfItems() - 1;
            let blurLevel = BLUR_LEVEL.VERY_LIGHT;
            let iconColor = props.appState.iconColorDefault;
            if (isThisTabSelected || mouseHoverThisTab)
            {
                blurLevel = BLUR_LEVEL.NONE;
                iconColor = props.appState.iconColorSelectedPrimary;
            }
            else if (isMouseHoverSettingsTabs)
            {
                blurLevel = BLUR_LEVEL.EXTREMELY_LIGHT;
                iconColor = props.appState.iconColorSelectedSecondary;
            }

            let individualTabDivStyleObject = new StyleObject()
                .setBasics(props.topRightPanelState.settingsTabsWidth, props.topRightPanelState.settingsTabsHeight, index * props.topRightPanelState.settingsTabsWidth, 0)
                .setDisplay("flex")
                .setFlexDirection("column")
                .setBlur(blurLevel)
                .addTransition("background-color", TRANSITION_TIME_NORMAL)
                .addTransition("filter", TRANSITION_TIME_NORMAL);
            let tabIconWrapperDivStyleObject = new StyleObject()
                .setPosition("relative")
                .setHeight(props.topRightPanelState.settingsTabsHeight * 0.4)
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
                individualTabDivStyleObject.setBorderRadius(props.topRightPanelState.topRightPanelBorderRadius, 0, 0, 0);
            }
            else if (isTheLast)
            {
                individualTabDivStyleObject.setBorderRadius(0, props.topRightPanelState.topRightPanelBorderRadius, 0, 0);
            }

            return <div key={index} style={individualTabDivStyleObject.getStyle()}
                        onClick={() => props.topRightPanelAction_selectSingleSelectionModelItem(index, settingsTabsStateModelStringId)}
                        onMouseEnter={() => props.topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem(index, settingsTabsStateModelStringId)}>
                <div style={tabIconWrapperDivStyleObject.getStyle()}>
                    {getSettingsTabsSvgIcon(iconColor, index)}
                </div>
                <div style={tabTextWrapperDivStyleObject.getStyle()}>
                    {title}
                </div>
            </div>
        })}
    </div>;

    /**
     * Settings contents
     */
    /* Theme setting content */
    let themesSettingStateModel = props.topRightPanelState.themesSettingStateModel;
    let themesSettingStateModelStringId = themesSettingStateModel.getStringId();
    let themesSettingsOptions = themesSettingStateModel.getItems();
    let themesSettingOptionsSize = props.topRightPanelState.themesSettingOptionsSize;
    let themesDescriptionWidth = props.topRightPanelState.themesDescriptionWidth;
    let themesSettingContent = themesSettingsOptions.map((title: string, index: number) =>
    {
        let isThisOptionSelected = themesSettingStateModel.getSelectedItemIndex() === index;
        let mouseHoverThisOption = themesSettingStateModel.getMouseHoveredItemIndex() === index;
        let themeTitleBlurLevel = BLUR_LEVEL.HEAVY;
        let themeTitleFontColor = BLACK_TRANSPARENT_00;
        let themesTitleStartingY = themesSettingOptionsSize * 2;
        let themesOptionBlurLevel = BLUR_LEVEL.LIGHT;
        let themesDescriptionBlurLevel = BLUR_LEVEL.HEAVY;
        let themesDescriptionFontColor = props.appState.appBackgroundColor;
        let iconColor = props.appState.iconColorDefault;
        let lightBulbEffectColor = WHITE_TRANSPARENT_00;
        let scale = 0.7;
        let themesSettingOptionX = props.topRightPanelState.themesSettingOptionsStartingX + index * (themesSettingOptionsSize + props.topRightPanelState.themesSettingOptionsGap);
        let themesDescriptionX = themesSettingOptionX + (themesSettingOptionsSize - themesDescriptionWidth) / 2;
        if (isThisOptionSelected || mouseHoverThisOption)
        {
            themesOptionBlurLevel = BLUR_LEVEL.NONE;
            scale = 1;

            if (index === INDEX.THEME_DARK)
            {
                iconColor = props.appState.iconColorDarkThemeSelected;
            }
            else if (index === INDEX.THEME_YELLOW)
            {
                iconColor = props.appState.iconColorYellowThemeSelected;
            }
            else if (index === INDEX.THEME_BRIGHT)
            {
                iconColor = props.appState.iconColorBrightThemeSelected;
                lightBulbEffectColor = props.appState.lightUpEffectColor;
            }

            if (mouseHoverThisOption)
            {
                themesDescriptionBlurLevel = BLUR_LEVEL.NONE;
                themesDescriptionFontColor = props.appState.appFontColor;
            }

            if (isThisOptionSelected)
            {
                themeTitleBlurLevel = BLUR_LEVEL.NONE;
                themeTitleFontColor = props.appState.appFontColor;
                themesTitleStartingY = props.topRightPanelState.themesTitleStartingY
            }
        }

        let themesTitleDivStyleObject = new StyleObject()
            .setBasics(topRightPanelShapeModel.getWidth(), 0, 0, themesTitleStartingY)
            .setPointerEvents("none")
            .setFontColor(themeTitleFontColor)
            .setBlur(themeTitleBlurLevel)
            .addTransition("filter", TRANSITION_TIME_NORMAL)
            .addTransition("color", TRANSITION_TIME_NORMAL)
            .addTransition("top", TRANSITION_TIME_NORMAL)
            .setTextAlign("center");
        let themeSettingOptionDivStyleObject = new StyleObject()
            .setBasics(themesSettingOptionsSize, themesSettingOptionsSize, themesSettingOptionX, props.topRightPanelState.themesSettingOptionsStartingY)
            .setBlur(themesOptionBlurLevel)
            .addScale(scale, scale)
            .addTransition("filter", TRANSITION_TIME_NORMAL)
            .addTransition("transform", TRANSITION_TIME_NORMAL);
        let lightBulbEffectStyleObject = new StyleObject()
            .setBasics("80%", "80%", "10%", "0%")
            .setBackgroundColor(lightBulbEffectColor)
            .setBlur(BLUR_LEVEL.HEAVY)
            .setPointerEvents("none")
            .addTransition("background-color", TRANSITION_TIME_NORMAL);
        let themesDescriptionDivStyleObject = new StyleObject()
            .setBasics(themesDescriptionWidth, 0, themesDescriptionX, props.topRightPanelState.themesDescriptionStartingY)
            .setPointerEvents("none")
            .setTextAlign("center")
            .setFontColor(themesDescriptionFontColor)
            .setBlur(themesDescriptionBlurLevel)
            .addTransition("filter", TRANSITION_TIME_NORMAL)
            .addTransition("color", TRANSITION_TIME_NORMAL);

        return <div key={index} style={{position: "static"}}>
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
    });

    /**
     * Result to return
     */
    console.log(LEVEL2_CONSOLE_PREFIX + topRightPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return <div id={topRightPanelShapeModel.getStringId()} style={topRightPanelStyleObject.getStyle()}
                onMouseEnter={() => props.topRightPanelAction_setTopRightPanelFocusOn(true)}
                onMouseLeave={() => props.topRightPanelAction_setTopRightPanelFocusOn(false)}>
        {settingsTabs}
        {themesSettingContent}
        {panelBorder}
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
        topRightPanelAction_setTopRightPanelFocusOn: topRightPanelAction_setTopRightPanelFocusOn,
        topRightPanelAction_selectSingleSelectionModelItem: topRightPanelAction_selectSingleSelectionModelItem,
        topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem: topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem,
        topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems: topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(TopRightPanel);