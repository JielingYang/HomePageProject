import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";
import {FOCUS_IN_TIME} from "../../utilities/CONSTANTS_TIME";
import {topRightPanelAction_setTopRightPanelFocusOn} from "../../actionCreators/topRightPanelActions";
import {BLACK_TRANSPARENT_00, GREY_HEAVY} from "../../utilities/CONSTANTS_COLOR";

type TopRightPanelPropsType = {
    topRightPanelShapeModel: Shape2d_Rectangle,
    topRightPanelFocusOn: boolean,
    topRightPanelPadding: number,

    settingsTabsTitles: Array<string>,
    numberOfSettingsTabs: number,
    settingsTabsWidth: number,
    settingsTabsHeight: number,
    selectedTabIndex: number,

    topRightPanelBorderSize: number,
    topRightPanelBorderRadius: number,
    topRightPanelBorderWidth: number,
    topRightPanelBorderHeight: number,

    topRightPanelAction_setTopRightPanelFocusOn: Function,
}

const TopRightPanel = (props: TopRightPanelPropsType) =>
{
    let topRightPanelShapeModel: Shape2d_Rectangle = props.topRightPanelShapeModel;

    let topRightPanelStyleObject = new StyleObject().setBasics(topRightPanelShapeModel.getWidth(), topRightPanelShapeModel.getHeight(), topRightPanelShapeModel.getTopLeftPoint().getX(), topRightPanelShapeModel.getTopLeftPoint().getY())
        .setBlur(props.topRightPanelFocusOn
                 ? BLUR_LEVEL.NONE
                 : BLUR_LEVEL.MEDIUM)
        .addTransition("filter", FOCUS_IN_TIME);

    let topRightPanelBorderDivStyleObject = new StyleObject().setBasics(props.topRightPanelBorderWidth, props.topRightPanelBorderHeight, props.topRightPanelPadding, props.topRightPanelPadding)
        .setBorder(props.topRightPanelBorderSize, "solid", GREY_HEAVY)
        .setBorderRadius(props.topRightPanelBorderRadius);

    let tabIndex = 0;

    console.log(LEVEL2_CONSOLE_PREFIX + topRightPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (<div id={topRightPanelShapeModel.getStringId()} style={topRightPanelStyleObject.getStyle()}
                 onMouseEnter={() => props.topRightPanelAction_setTopRightPanelFocusOn(true)}
                 onMouseLeave={() => props.topRightPanelAction_setTopRightPanelFocusOn(false)}>

        {/* Panel border */}
        <div style={topRightPanelBorderDivStyleObject.getStyle()}/>

        {/* Tabs */}
        {props.settingsTabsTitles.map((title: string) =>
        {
            let settingsTabsDivStyleObject = new StyleObject().setBasics(props.settingsTabsWidth, props.settingsTabsHeight, props.topRightPanelPadding + tabIndex * props.settingsTabsWidth, props.topRightPanelPadding)
                .setBackgroundColor(props.selectedTabIndex === tabIndex
                                    ? BLACK_TRANSPARENT_00
                                    : GREY_HEAVY);

            if (tabIndex === 0)
            {
                settingsTabsDivStyleObject.setBorderRadius(props.topRightPanelBorderRadius, 0, 0, 0);
            }
            else if (tabIndex === props.numberOfSettingsTabs - 1)
            {
                settingsTabsDivStyleObject.setBorderRadius(0, props.topRightPanelBorderRadius, 0, 0);
            }

            tabIndex++;

            return <div key={tabIndex} style={settingsTabsDivStyleObject.getStyle()}/>
        })}

    </div>);
};

const mapStateToProps = (store) =>
{
    return {
        topRightPanelShapeModel: store.topRightPanelState.topRightPanelShapeModel,
        topRightPanelFocusOn: store.topRightPanelState.topRightPanelFocusOn,
        topRightPanelPadding: store.topRightPanelState.topRightPanelPadding,

        settingsTabsTitles: store.topRightPanelState.settingsTabsTitles,
        numberOfSettingsTabs: store.topRightPanelState.numberOfSettingsTabs,
        settingsTabsWidth: store.topRightPanelState.settingsTabsWidth,
        settingsTabsHeight: store.topRightPanelState.settingsTabsHeight,
        selectedTabIndex: store.topRightPanelState.selectedTabIndex,

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
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(TopRightPanel);