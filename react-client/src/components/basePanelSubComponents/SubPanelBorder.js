import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";
import {TRANSITION_TIME_NORMAL} from "../../utilities/CONSTANTS_TIME";
import type {appStateType} from "../../reducers/appReducer";
import type {topRightPanelStateType} from "../../reducers/topRightPanelReducer";
import type {topLeftPanelStateType} from "../../reducers/topLeftPanelReducer";

type SubPanelBorderPropsType = {
    appState: appStateType,
    subPanelState: topRightPanelStateType | topLeftPanelStateType,
    borderBlurLevel: BLUR_LEVEL,
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
        .setBlur(props.borderBlurLevel)
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