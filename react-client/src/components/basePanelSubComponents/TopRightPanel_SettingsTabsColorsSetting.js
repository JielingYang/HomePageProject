import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import type {appStateType} from "../../reducers/appReducer";
import type {topRightPanelStateType} from "../../reducers/topRightPanelReducer";
import Shape2d_Rectangle from "../../classes/shapeClasses/Shape2d_Rectangle";
import {INDEX} from "../../utilities/CONSTANTS_NUMBER";
import StyleObject from "../../classes/StyleObject";
import {TRANSITION_TIME_NORMAL} from "../../utilities/CONSTANTS_TIME";
import {topRightPanelAction_requestToSetSettingsTabsContentDisplayValueToNoneWhenTransitionEnd} from "../../actionCreators/topRightPanelActions";
import {COMMON_TYPE} from "../../utilities/CONSTANTS_STRING";

type TopRightPanel_SettingsTabsColorsSettingPropsType = {
    appState: appStateType,
    topRightPanelState: topRightPanelStateType,
    topRightPanelAction_requestToSetSettingsTabsContentDisplayValueToNoneWhenTransitionEnd: Function,
}
const TopRightPanel_SettingsTabsColorsSettings = (props: TopRightPanel_SettingsTabsColorsSettingPropsType) =>
{
    let appState: appStateType = props.appState;
    let topRightPanelState: topRightPanelStateType = props.topRightPanelState;
    let topRightPanelShapeModel: Shape2d_Rectangle = topRightPanelState.topRightPanelShapeModel;
    let showContent: boolean = topRightPanelState.settingsTabsStateModel.getSelectedItemIndex() === INDEX.SETTINGS_TABS_COLOR;
    let colorsSettingContentOpacity: number = 0;
    let colorsSettingContentY: number | string = topRightPanelState.settingsTabsContentHideY;
    let displayValue: string = topRightPanelState.settingsTabsContentDisplayValues[INDEX.SETTINGS_TABS_COLOR];
    if (showContent)
    {
        colorsSettingContentOpacity = 1;
        colorsSettingContentY = 0;
    }

    let colorsSettingContentWrapperDivStyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics(topRightPanelShapeModel.getWidth(), topRightPanelShapeModel.getHeight(), 0, colorsSettingContentY)
        .setOpacity(colorsSettingContentOpacity)
        .setDisplay(displayValue)
        .addTransition("opacity", TRANSITION_TIME_NORMAL)
        .addTransition("top", TRANSITION_TIME_NORMAL);

    return <div style={colorsSettingContentWrapperDivStyleObject.getStyle()}
                onTransitionEnd={(e) => props.topRightPanelAction_requestToSetSettingsTabsContentDisplayValueToNoneWhenTransitionEnd(INDEX.SETTINGS_TABS_COLOR, e.propertyName, colorsSettingContentOpacity, 0)}>
        <div style={{
            position: "absolute",
            left: "0%",
            top: "45%",
            width: "100%",
            height: "10%",
            textAlign: "center",
            color: appState.appFontColor,
        }}>
            Under construction...
        </div>
    </div>
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
        topRightPanelAction_requestToSetSettingsTabsContentDisplayValueToNoneWhenTransitionEnd: topRightPanelAction_requestToSetSettingsTabsContentDisplayValueToNoneWhenTransitionEnd,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(TopRightPanel_SettingsTabsColorsSettings);