import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/shapeClasses/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";
import {TRANSITION_TIME_NORMAL} from "../../utilities/CONSTANTS_TIME";
import {topRightPanelAction_requestToMouseHoversIndividualSettingsTab, topRightPanelAction_requestToSelectSettingsTab, topRightPanelAction_requestToSetIsMouseHoversSettingsTabs, topRightPanelAction_setTopRightPanelFocusOn} from "../../actionCreators/topRightPanelActions";
import {GREY_HEAVY, WHITE_TRANSPARENT_50, WHITE_TRANSPARENT_90} from "../../utilities/CONSTANTS_COLOR";
import SingleSelectionModel from "../../classes/StateModelClasses/SingleSelectionModel";
import {getSettingsTabsSvgIcon} from "../../utilities/svgIcons";

type TopRightPanelPropsType = {
    topRightPanelShapeModel: Shape2d_Rectangle, topRightPanelFocusOn: boolean, topRightPanelPadding: number,

    settingsTabsStateModel: SingleSelectionModel, settingsTabsWidth: number, settingsTabsHeight: number,

    themesSettingStateModel: SingleSelectionModel, themesSettingOptionsSize: number, themesSettingOptionsGap: number, themesSettingOptionsStartingX: number,

    topRightPanelBorderSize: number, topRightPanelBorderRadius: number, topRightPanelBorderWidth: number, topRightPanelBorderHeight: number,

    topRightPanelAction_setTopRightPanelFocusOn: Function, topRightPanelAction_requestToSelectSettingsTab: Function, topRightPanelAction_requestToMouseHoversIndividualSettingsTab: Function, topRightPanelAction_requestToSetIsMouseHoversSettingsTabs: Function,

}

const TopRightPanel = (props: TopRightPanelPropsType) =>
{
    let topRightPanelShapeModel: Shape2d_Rectangle = props.topRightPanelShapeModel;
    let settingsTabsStateModel: SingleSelectionModel = props.settingsTabsStateModel;
    let isMouseHoverSettingsTabs = settingsTabsStateModel.getIsMouseHover();
    let topRightPanelStyleObject = new StyleObject().setBasics(topRightPanelShapeModel.getWidth(), topRightPanelShapeModel.getHeight(), topRightPanelShapeModel.getTopLeftPoint().getX(), topRightPanelShapeModel.getTopLeftPoint().getY())
        .setBlur(props.topRightPanelFocusOn
                 ? BLUR_LEVEL.NONE
                 : BLUR_LEVEL.MEDIUM)
        .addTransition("filter", TRANSITION_TIME_NORMAL);

    // Tabs
    let settingsTabsDivStyleObject = new StyleObject().setBasics(props.topRightPanelBorderWidth, props.settingsTabsHeight, props.topRightPanelPadding, props.topRightPanelPadding);
    let settingsTabs = <div style={settingsTabsDivStyleObject.getStyle()}
                            onMouseEnter={() => props.topRightPanelAction_requestToSetIsMouseHoversSettingsTabs(true)}
                            onMouseLeave={() => props.topRightPanelAction_requestToSetIsMouseHoversSettingsTabs(false)}>
        {settingsTabsStateModel.getItems().map((title: string, index: number) =>
        {
            let isThisTabSelected = settingsTabsStateModel.getSelectedItemIndex() === index;
            let isMouseHoverThisTab = settingsTabsStateModel.getMouseHoveredItemIndex() === index;
            let isTheFirst = index === 0;
            let isTheLast = index === settingsTabsStateModel.getNumberOfItems() - 1;
            let blurLevel = BLUR_LEVEL.VERY_LIGHT;
            let iconColor = GREY_HEAVY;
            if (isThisTabSelected || isMouseHoverThisTab)
            {
                blurLevel = BLUR_LEVEL.NONE;
                iconColor = WHITE_TRANSPARENT_90;
            }
            else if (isMouseHoverSettingsTabs)
            {
                blurLevel = BLUR_LEVEL.EXTREMELY_LIGHT;
                iconColor = WHITE_TRANSPARENT_50;
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
            return (<div key={index} style={individualTabDivStyleObject.getStyle()}
                         onClick={() => props.topRightPanelAction_requestToSelectSettingsTab(index)}
                         onMouseEnter={() => props.topRightPanelAction_requestToMouseHoversIndividualSettingsTab(index)}>
                <div style={tabIconWrapperDivStyleObject.getStyle()}>
                    {getSettingsTabsSvgIcon(iconColor, index)}
                </div>
                <div style={tabTextWrapperDivStyleObject.getStyle()}>
                    {title}
                </div>
            </div>)
        })}
    </div>;

    // Settings contents
    // Theme setting content
    let themesSettingsOptions = props.themesSettingStateModel.getItems();
    let themesSettingOptionsSize = props.themesSettingOptionsSize;
    let themesSettingContent = themesSettingsOptions.map((title: string, index: number) =>
    {
        let themeSettingOptionDivStyleObject = new StyleObject()
            .setBasics(themesSettingOptionsSize, themesSettingOptionsSize, props.themesSettingOptionsStartingX + index * (themesSettingOptionsSize + props.themesSettingOptionsGap), "40%")
            // .setBlur(blurLevel)
            .setBackgroundColor(WHITE_TRANSPARENT_90)
            .addTransition("background-color", TRANSITION_TIME_NORMAL)
            .addTransition("filter", TRANSITION_TIME_NORMAL);
        return <div key={index} style={themeSettingOptionDivStyleObject.getStyle()}></div>
    });


    // Panel border
    let topRightPanelBorderDivStyleObject = new StyleObject().setBasics(props.topRightPanelBorderWidth, props.topRightPanelBorderHeight, props.topRightPanelPadding, props.topRightPanelPadding)
        .setBorder(props.topRightPanelBorderSize, "solid", GREY_HEAVY)
        .setBorderRadius(props.topRightPanelBorderRadius)
        .setPointerEvents("none")
        .setBlur(isMouseHoverSettingsTabs
                 ? BLUR_LEVEL.EXTREMELY_LIGHT
                 : BLUR_LEVEL.VERY_LIGHT)
        .addTransition("filter", TRANSITION_TIME_NORMAL);
    let panelBorder = <div style={topRightPanelBorderDivStyleObject.getStyle()}/>;

    console.log(LEVEL2_CONSOLE_PREFIX + topRightPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (<div id={topRightPanelShapeModel.getStringId()} style={topRightPanelStyleObject.getStyle()}
                 onMouseEnter={() => props.topRightPanelAction_setTopRightPanelFocusOn(true)}
                 onMouseLeave={() => props.topRightPanelAction_setTopRightPanelFocusOn(false)}>
        {settingsTabs}
        {themesSettingContent}
        {panelBorder}
    </div>);
};

const mapStateToProps = (store) =>
{
    return {
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
        topRightPanelAction_setTopRightPanelFocusOn: topRightPanelAction_setTopRightPanelFocusOn,
        topRightPanelAction_requestToSelectSettingsTab: topRightPanelAction_requestToSelectSettingsTab,
        topRightPanelAction_requestToMouseHoversIndividualSettingsTab: topRightPanelAction_requestToMouseHoversIndividualSettingsTab,
        topRightPanelAction_requestToSetIsMouseHoversSettingsTabs: topRightPanelAction_requestToSetIsMouseHoversSettingsTabs,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(TopRightPanel);