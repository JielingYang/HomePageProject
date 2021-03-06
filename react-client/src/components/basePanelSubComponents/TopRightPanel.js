import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/shapeClasses/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";
import {TRANSITION_TIME_NORMAL} from "../../utilities/CONSTANTS_TIME";
import {topRightPanelAction_setTopRightPanelFocusOn} from "../../actionCreators/topRightPanelActions";
import type {appStateType} from "../../reducers/appReducer";
import type {topRightPanelStateType} from "../../reducers/topRightPanelReducer";
import SubPanelBorder from "./SubPanelBorder";
import TopRightPanel_SettingsTabs from "./TopRightPanel_SettingsTabs";
import TopRightPanel_SettingsTabsThemesSetting from "./TopRightPanel_SettingsTabsThemesSetting";
import TopRightPanel_SettingsTabsViewSettings from "./TopRightPanel_SettingsTabsViewSettings";
import TopRightPanel_SettingsTabsPlaygroundSettings from "./TopRightPanel_SettingsTabsPlaygroundSettings";
import {COMMON_TYPE} from "../../utilities/CONSTANTS_STRING";

type TopRightPanelPropsType = {
    appState: appStateType,
    topRightPanelState: topRightPanelStateType,
    topRightPanelAction_setTopRightPanelFocusOn: Function,
}

const TopRightPanel = (props: TopRightPanelPropsType) =>
{
    let topRightPanelShapeModel: Shape2d_Rectangle = props.topRightPanelState.topRightPanelShapeModel;
    let borderBlurLevel = props.topRightPanelState.settingsTabsStateModel.getMouseHover()
                          ? BLUR_LEVEL.EXTREMELY_LIGHT
                          : BLUR_LEVEL.LIGHT;

    let topRightPanelStyleObject = new StyleObject(COMMON_TYPE.DEFAULT).setBasics(topRightPanelShapeModel.getWidth(), topRightPanelShapeModel.getHeight(), topRightPanelShapeModel.getTopLeftPoint().getX(), topRightPanelShapeModel.getTopLeftPoint().getY())
        .addTransition("filter", TRANSITION_TIME_NORMAL)
        .setBlur(props.topRightPanelState.topRightPanelFocusOn
                 ? BLUR_LEVEL.NONE
                 : BLUR_LEVEL.MEDIUM);

    console.log(LEVEL2_CONSOLE_PREFIX + topRightPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return <div id={topRightPanelShapeModel.getStringId()} style={topRightPanelStyleObject.getStyle()}
                onMouseEnter={() => props.topRightPanelAction_setTopRightPanelFocusOn(true)}
                onMouseLeave={() => props.topRightPanelAction_setTopRightPanelFocusOn(false)}>
        <SubPanelBorder subPanelState={props.topRightPanelState} borderBlurLevel={borderBlurLevel}/>
        <TopRightPanel_SettingsTabsThemesSetting/>
        <TopRightPanel_SettingsTabsViewSettings/>
        <TopRightPanel_SettingsTabsPlaygroundSettings/>
        <TopRightPanel_SettingsTabs/>
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
        topRightPanelAction_setTopRightPanelFocusOn: topRightPanelAction_setTopRightPanelFocusOn,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(TopRightPanel);