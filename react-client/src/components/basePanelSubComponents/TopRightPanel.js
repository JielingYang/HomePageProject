import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/shapeClasses/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";
import {TRANSITION_TIME_NORMAL} from "../../utilities/CONSTANTS_TIME";
import {topRightPanelAction_requestToSelectSettingsTab, topRightPanelAction_setTopRightPanelFocusOn} from "../../actionCreators/topRightPanelActions";
import {BLACK_TRANSPARENT_00, GREY_HEAVY} from "../../utilities/CONSTANTS_COLOR";
import Tabs from "../../classes/widgetClasses/Tabs";

type TopRightPanelPropsType = {
    topRightPanelShapeModel: Shape2d_Rectangle,
    topRightPanelFocusOn: boolean,
    topRightPanelPadding: number,

    settingsTabsStateModel: Tabs,
    settingsTabsWidth: number,
    settingsTabsHeight: number,

    topRightPanelBorderSize: number,
    topRightPanelBorderRadius: number,
    topRightPanelBorderWidth: number,
    topRightPanelBorderHeight: number,

    topRightPanelAction_setTopRightPanelFocusOn: Function,
    topRightPanelAction_requestToSelectSettingsTab: Function,
}

const TopRightPanel = (props: TopRightPanelPropsType) =>
{
    let topRightPanelShapeModel: Shape2d_Rectangle = props.topRightPanelShapeModel;
    let settingsTabsStateModel: Tabs = props.settingsTabsStateModel;

    let topRightPanelStyleObject = new StyleObject().setBasics(topRightPanelShapeModel.getWidth(), topRightPanelShapeModel.getHeight(), topRightPanelShapeModel.getTopLeftPoint().getX(), topRightPanelShapeModel.getTopLeftPoint().getY())
        .setBlur(props.topRightPanelFocusOn
                 ? BLUR_LEVEL.NONE
                 : BLUR_LEVEL.MEDIUM)
        .addTransition("filter", TRANSITION_TIME_NORMAL);

    let topRightPanelBorderDivStyleObject = new StyleObject().setBasics(props.topRightPanelBorderWidth, props.topRightPanelBorderHeight, props.topRightPanelPadding, props.topRightPanelPadding)
        .setBorder(props.topRightPanelBorderSize, "solid", GREY_HEAVY)
        .setBorderRadius(props.topRightPanelBorderRadius);

    console.log(LEVEL2_CONSOLE_PREFIX + topRightPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <div id={topRightPanelShapeModel.getStringId()} style={topRightPanelStyleObject.getStyle()}
             onMouseEnter={() => props.topRightPanelAction_setTopRightPanelFocusOn(true)}
             onMouseLeave={() => props.topRightPanelAction_setTopRightPanelFocusOn(false)}>

            {/* Panel border */}
            <div style={topRightPanelBorderDivStyleObject.getStyle()}/>

            {/* Tabs */}
            {settingsTabsStateModel.getTabsTitles().map((title: string, index: number) =>
            {
                let isSelected = settingsTabsStateModel.getSelectedTabIndex() === index;
                let isTheFirst = index === 0;
                let isTheLast = index === settingsTabsStateModel.getNumberOfTabs() - 1;

                let settingsTabsDivStyleObject = new StyleObject().setBasics(props.settingsTabsWidth, props.settingsTabsHeight, props.topRightPanelPadding + index * props.settingsTabsWidth, props.topRightPanelPadding)
                    .setBackgroundColor(isSelected
                                        ? BLACK_TRANSPARENT_00
                                        : GREY_HEAVY)
                    .addTransition("background-color", TRANSITION_TIME_NORMAL);

                if (isTheFirst)
                {
                    settingsTabsDivStyleObject.setBorderRadius(props.topRightPanelBorderRadius, 0, 0, 0);
                }
                else if (isTheLast)
                {
                    settingsTabsDivStyleObject.setBorderRadius(0, props.topRightPanelBorderRadius, 0, 0);
                }

                return <div key={index} style={settingsTabsDivStyleObject.getStyle()}
                            onClick={() => props.topRightPanelAction_requestToSelectSettingsTab(index)}/>
            })}

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
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(TopRightPanel);