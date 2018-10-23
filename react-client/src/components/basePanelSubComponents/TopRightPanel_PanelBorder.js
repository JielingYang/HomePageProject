import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";
import {TRANSITION_TIME_NORMAL} from "../../utilities/CONSTANTS_TIME";
import type {appStateType} from "../../reducers/appReducer";
import type {topRightPanelStateType} from "../../reducers/topRightPanelReducer";

type TopRightPanel_PanelBorderPropsType = {
    appState: appStateType,
    topRightPanelState: topRightPanelStateType,
}

const TopRightPanel_PanelBorder = (props: TopRightPanel_PanelBorderPropsType) =>
{
    let appState = props.appState;
    let topRightPanelState = props.topRightPanelState;

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
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(TopRightPanel_PanelBorder);