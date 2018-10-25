import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";
import {TRANSITION_TIME_NORMAL} from "../../utilities/CONSTANTS_TIME";
import type {appStateType} from "../../reducers/appReducer";
import type {topRightPanelStateType} from "../../reducers/topRightPanelReducer";

type SubPanelBorderPropsType = {
    appState: appStateType,
    subPanelState: topRightPanelStateType,
}

const SubPanelBorder = (props: SubPanelBorderPropsType) =>
{
    let appState = props.appState;
    let subPanelState = props.subPanelState;

    let subPanelBorderDivStyleObject: StyleObject = new StyleObject()
        .setBasics(subPanelState.panelBorderWidth, subPanelState.panelBorderHeight, subPanelState.panelPadding, subPanelState.panelPadding)
        .setBackgroundColor(appState.subPanelsBackgroundColor)
        .setBorder(subPanelState.panelBorderSize, "solid", appState.subPanelsBorderColor)
        .setBorderRadius(subPanelState.panelBorderRadius)
        .setPointerEvents("none")
        .setBlur(subPanelState.settingsTabsStateModel.getMouseHover()
                 ? BLUR_LEVEL.EXTREMELY_LIGHT
                 : BLUR_LEVEL.VERY_LIGHT)
        .addTransition("filter", TRANSITION_TIME_NORMAL);

    return <div style={subPanelBorderDivStyleObject.getStyle()}/>;
};

const mapStateToProps = (store) =>
{
    return {
        appState: store.appState,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(SubPanelBorder);