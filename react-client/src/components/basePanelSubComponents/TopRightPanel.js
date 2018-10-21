import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/shapeClasses/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL, INDEX} from "../../utilities/CONSTANTS_NUMBER";
import {TRANSITION_TIME_NORMAL} from "../../utilities/CONSTANTS_TIME";
import {topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem, topRightPanelAction_selectSingleSelectionModelItem, topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems, topRightPanelAction_setTopRightPanelFocusOn} from "../../actionCreators/topRightPanelActions";
import {WHITE_TRANSPARENT_00} from "../../utilities/CONSTANTS_COLOR";
import SingleSelectionModel from "../../classes/StateModelClasses/SingleSelectionModel";
import {getSettingsTabsSvgIcon, getThemesSvgIcon} from "../../utilities/svgIcons";
import type {appStateType} from "../../reducers/appReducer";
import {appAction_changeAppTheme} from "../../actionCreators/appActions";

type TopRightPanelPropsType = {
    appState: appStateType,

    topRightPanelShapeModel: Shape2d_Rectangle, topRightPanelFocusOn: boolean, topRightPanelPadding: number,

    settingsTabsStateModel: SingleSelectionModel, settingsTabsWidth: number, settingsTabsHeight: number,

    themesSettingStateModel: SingleSelectionModel, themesSettingOptionsSize: number, themesSettingOptionsGap: number, themesSettingOptionsStartingX: number,

    topRightPanelBorderSize: number, topRightPanelBorderRadius: number, topRightPanelBorderWidth: number, topRightPanelBorderHeight: number,

    appAction_changeAppTheme: Function, topRightPanelAction_setTopRightPanelFocusOn: Function, topRightPanelAction_selectSingleSelectionModelItem: Function, topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem: Function, topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems: Function,

}

const TopRightPanel = (props: TopRightPanelPropsType) =>
{
    let topRightPanelShapeModel: Shape2d_Rectangle = props.topRightPanelShapeModel;
    let settingsTabsStateModel: SingleSelectionModel = props.settingsTabsStateModel;
    let settingsTabsStateModelStringId = settingsTabsStateModel.getStringId();
    let isMouseHoverSettingsTabs = settingsTabsStateModel.getMouseHover();

    // Panel border
    let topRightPanelBorderDivStyleObject = new StyleObject()
        .setBasics(props.topRightPanelBorderWidth, props.topRightPanelBorderHeight, props.topRightPanelPadding, props.topRightPanelPadding)
        .setBackgroundColor(props.appState.mainPanelsBackgroundColor)
        .setBorder(props.topRightPanelBorderSize, "solid", props.appState.mainPanelsBorderColor)
        .setBorderRadius(props.topRightPanelBorderRadius)
        .setPointerEvents("none")
        .setBlur(isMouseHoverSettingsTabs
                 ? BLUR_LEVEL.EXTREMELY_LIGHT
                 : BLUR_LEVEL.VERY_LIGHT)
        .addTransition("filter", TRANSITION_TIME_NORMAL);

    let panelBorder = <div style={topRightPanelBorderDivStyleObject.getStyle()}/>;

    // Tabs
    let settingsTabsDivStyleObject = new StyleObject().setBasics(props.topRightPanelBorderWidth, props.settingsTabsHeight, props.topRightPanelPadding, props.topRightPanelPadding);
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
                .setBasics(props.settingsTabsWidth, props.settingsTabsHeight, index * props.settingsTabsWidth, 0)
                .setDisplay("flex")
                .setFlexDirection("column")
                .setBlur(blurLevel)
                .addTransition("background-color", TRANSITION_TIME_NORMAL)
                .addTransition("filter", TRANSITION_TIME_NORMAL);
            let tabIconWrapperDivStyleObject = new StyleObject()
                .setHeight(props.settingsTabsHeight * 0.4)
                .setPointerEvents("none")
                .setMargin("auto")
                .setBlur(blurLevel)
                .addTransition("filter", TRANSITION_TIME_NORMAL);
            let tabTextWrapperDivStyleObject = new StyleObject()
                .setPointerEvents("none")
                .setMargin("auto")
                .setBlur(blurLevel)
                .setFontColor(iconColor)
                .addTransition("filter", TRANSITION_TIME_NORMAL)
                .addTransition("color", TRANSITION_TIME_NORMAL);
            if (isTheFirst)
            {
                individualTabDivStyleObject.setBorderRadius(props.topRightPanelBorderRadius, 0, 0, 0);
            }
            else if (isTheLast)
            {
                individualTabDivStyleObject.setBorderRadius(0, props.topRightPanelBorderRadius, 0, 0);
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

    // Settings contents
    // Theme setting content
    let themesSettingStateModel = props.themesSettingStateModel;
    let themesSettingStateModelStringId = themesSettingStateModel.getStringId();
    let themesSettingsOptions = themesSettingStateModel.getItems();
    let themesSettingOptionsSize = props.themesSettingOptionsSize;
    let themesSettingContent = themesSettingsOptions.map((title: string, index: number) =>
    {
        let isThisOptionSelected = themesSettingStateModel.getSelectedItemIndex() === index;
        let mouseHoverThisOption = themesSettingStateModel.getMouseHoveredItemIndex() === index;
        let blurLevel = BLUR_LEVEL.LIGHT;
        let iconColor = props.appState.iconColorDefault;
        let lightBulbEffectColor = WHITE_TRANSPARENT_00;
        let scale = 0.7;
        if (isThisOptionSelected || mouseHoverThisOption)
        {
            blurLevel = BLUR_LEVEL.NONE;
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
        }

        let themeSettingOptionDivStyleObject = new StyleObject()
            .setBasics(themesSettingOptionsSize, themesSettingOptionsSize, props.themesSettingOptionsStartingX + index * (themesSettingOptionsSize + props.themesSettingOptionsGap), "45%")
            .setBlur(blurLevel)
            .addScale(scale, scale)
            .addTransition("filter", TRANSITION_TIME_NORMAL)
            .addTransition("transform", TRANSITION_TIME_NORMAL);
        let lightBulbEffectStyleObject = new StyleObject()
            .setBasics("80%", "80%", "10%", "0%")
            .setBackgroundColor(lightBulbEffectColor)
            .setBlur(BLUR_LEVEL.HEAVY)
            .addTransition("background-color", TRANSITION_TIME_NORMAL);

        return <div key={index} style={themeSettingOptionDivStyleObject.getStyle()}
                    onClick={() =>
                    {
                        props.topRightPanelAction_selectSingleSelectionModelItem(index, themesSettingStateModelStringId);
                        props.appAction_changeAppTheme(index);
                    }}
                    onMouseEnter={() => props.topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem(index, themesSettingStateModelStringId)}
                    onMouseLeave={() => props.topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem(null, themesSettingStateModelStringId)}>
            <div style={lightBulbEffectStyleObject.getStyle()}/>
            {getThemesSvgIcon(iconColor, index)}
        </div>
    });

    let topRightPanelStyleObject = new StyleObject().setBasics(topRightPanelShapeModel.getWidth(), topRightPanelShapeModel.getHeight(), topRightPanelShapeModel.getTopLeftPoint().getX(), topRightPanelShapeModel.getTopLeftPoint().getY())
        .setBlur(props.topRightPanelFocusOn
                 ? BLUR_LEVEL.NONE
                 : BLUR_LEVEL.MEDIUM)
        .addTransition("filter", TRANSITION_TIME_NORMAL);

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

        topRightPanelShapeModel: store.topRightPanelState.topRightPanelShapeModel,
        topRightPanelFocusOn: store.topRightPanelState.topRightPanelFocusOn,
        topRightPanelPadding: store.topRightPanelState.topRightPanelPadding,

        settingsTabsStateModel: store.topRightPanelState.settingsTabsStateModel,
        settingsTabsWidth: store.topRightPanelState.settingsTabsWidth,
        settingsTabsHeight: store.topRightPanelState.settingsTabsHeight,

        themesSettingStateModel: store.topRightPanelState.themesSettingStateModel,
        themesSettingOptionsSize: store.topRightPanelState.themesSettingOptionsSize,
        themesSettingOptionsGap: store.topRightPanelState.themesSettingOptionsGap,
        themesSettingOptionsStartingX: store.topRightPanelState.themesSettingOptionsStartingX,

        topRightPanelBorderSize: store.topRightPanelState.topRightPanelBorderSize,
        topRightPanelBorderRadius: store.topRightPanelState.topRightPanelBorderRadius,
        topRightPanelBorderWidth: store.topRightPanelState.topRightPanelBorderWidth,
        topRightPanelBorderHeight: store.topRightPanelState.topRightPanelBorderHeight,
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