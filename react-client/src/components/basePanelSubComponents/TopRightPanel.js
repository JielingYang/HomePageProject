import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/shapeClasses/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";
import {TRANSITION_TIME_NORMAL} from "../../utilities/CONSTANTS_TIME";
import {topRightPanelAction_requestToMouseHoversIndividualSettingsTab, topRightPanelAction_requestToSelectSettingsTab, topRightPanelAction_requestToSetIsMouseHoversSettingsTabs, topRightPanelAction_setTopRightPanelFocusOn} from "../../actionCreators/topRightPanelActions";
import {GREY_HEAVY} from "../../utilities/CONSTANTS_COLOR";
import SingleSelectionModel from "../../classes/StateModelClasses/SingleSelectionModel";
import {settingsTabsSvgIcons} from "../../utilities/svgIcons";

type TopRightPanelPropsType = {
    topRightPanelShapeModel: Shape2d_Rectangle,
    topRightPanelFocusOn: boolean,
    topRightPanelPadding: number,

    settingsTabsStateModel: SingleSelectionModel,
    settingsTabsWidth: number,
    settingsTabsHeight: number,

    topRightPanelBorderSize: number,
    topRightPanelBorderRadius: number,
    topRightPanelBorderWidth: number,
    topRightPanelBorderHeight: number,

    topRightPanelAction_setTopRightPanelFocusOn: Function,
    topRightPanelAction_requestToSelectSettingsTab: Function,
    topRightPanelAction_requestToMouseHoversIndividualSettingsTab: Function,
    topRightPanelAction_requestToSetIsMouseHoversSettingsTabs: Function,

}

const TopRightPanel = (props: TopRightPanelPropsType) =>
{
    let topRightPanelShapeModel: Shape2d_Rectangle = props.topRightPanelShapeModel;
    let settingsTabsStateModel: SingleSelectionModel = props.settingsTabsStateModel;

    let topRightPanelStyleObject = new StyleObject().setBasics(topRightPanelShapeModel.getWidth(), topRightPanelShapeModel.getHeight(), topRightPanelShapeModel.getTopLeftPoint().getX(), topRightPanelShapeModel.getTopLeftPoint().getY())
        .setBlur(props.topRightPanelFocusOn
                 ? BLUR_LEVEL.NONE
                 : BLUR_LEVEL.MEDIUM)
        .addTransition("filter", TRANSITION_TIME_NORMAL);

    let settingsTabsDivStyleObject = new StyleObject().setBasics(props.topRightPanelBorderWidth, props.settingsTabsHeight, props.topRightPanelPadding, props.topRightPanelPadding);
    let isMouseHoverSettingsTabs = settingsTabsStateModel.getIsMouseHover();

    let topRightPanelBorderDivStyleObject = new StyleObject().setBasics(props.topRightPanelBorderWidth, props.topRightPanelBorderHeight, props.topRightPanelPadding, props.topRightPanelPadding)
        .setBorder(props.topRightPanelBorderSize, "solid", GREY_HEAVY)
        .setBorderRadius(props.topRightPanelBorderRadius)
        .setPointerEvents("none")
        .setBlur(isMouseHoverSettingsTabs
                 ? BLUR_LEVEL.EXTREMELY_LIGHT
                 : BLUR_LEVEL.VERY_LIGHT)
        .addTransition("filter", TRANSITION_TIME_NORMAL);

    console.log(LEVEL2_CONSOLE_PREFIX + topRightPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <div id={topRightPanelShapeModel.getStringId()} style={topRightPanelStyleObject.getStyle()}
             onMouseEnter={() => props.topRightPanelAction_setTopRightPanelFocusOn(true)}
             onMouseLeave={() => props.topRightPanelAction_setTopRightPanelFocusOn(false)}>

            {/* Tabs */}
            <div style={settingsTabsDivStyleObject.getStyle()}
                 onMouseEnter={() => props.topRightPanelAction_requestToSetIsMouseHoversSettingsTabs(true)}
                 onMouseLeave={() => props.topRightPanelAction_requestToSetIsMouseHoversSettingsTabs(false)}>
                {settingsTabsStateModel.getItems().map((title: string, index: number) =>
                {
                    let isThisTabSelected = settingsTabsStateModel.getSelectedItemIndex() === index;
                    let isMouseHoverThisTab = settingsTabsStateModel.getMouseHoveredItemIndex() === index;
                    let isTheFirst = index === 0;
                    let isTheLast = index === settingsTabsStateModel.getNumberOfItems() - 1;
                    let blurLevel = BLUR_LEVEL.VERY_LIGHT;

                    if(isThisTabSelected || isMouseHoverThisTab)
                    {
                        blurLevel = BLUR_LEVEL.NONE;
                    }
                    else if(isMouseHoverSettingsTabs)
                    {
                        blurLevel = BLUR_LEVEL.EXTREMELY_LIGHT;
                    }

                    let individualTabDivStyleObject = new StyleObject().setBasics(props.settingsTabsWidth, props.settingsTabsHeight, index * props.settingsTabsWidth, 0)
                        .setDisplay("flex")
                        .setBlur(blurLevel)
                        .addTransition("background-color", TRANSITION_TIME_NORMAL)
                        .addTransition("filter", TRANSITION_TIME_NORMAL);
                    let iconWrapperDivStyleObject = new StyleObject().setWidth(props.settingsTabsHeight * 0.8).setHeight(props.settingsTabsHeight * 0.8)
                        .setMargin("auto")
                        .setBlur(blurLevel)
                        .addTransition("filter", TRANSITION_TIME_NORMAL);

                    if (isTheFirst)
                    {
                        individualTabDivStyleObject.setBorderRadius(props.topRightPanelBorderRadius, 0, 0, 0);
                    }
                    else if (isTheLast)
                    {
                        individualTabDivStyleObject.setBorderRadius(0, props.topRightPanelBorderRadius, 0, 0);
                    }

                    let icon = settingsTabsSvgIcons[index];

                    return (
                        <div key={index} style={individualTabDivStyleObject.getStyle()}
                             onClick={() => props.topRightPanelAction_requestToSelectSettingsTab(index)}
                             onMouseEnter={() => props.topRightPanelAction_requestToMouseHoversIndividualSettingsTab(index)}>
                            <div style={iconWrapperDivStyleObject.getStyle()}>
                                {icon}
                            </div>
                        </div>)
                })}
            </div>

            {/* Panel border */}
            <div style={topRightPanelBorderDivStyleObject.getStyle()}/>

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