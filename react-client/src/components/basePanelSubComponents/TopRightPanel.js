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
import {appAction_changeAppTheme} from "../../actionCreators/appActions";
import type {topRightPanelStateType} from "../../reducers/topRightPanelReducer";
import TopRightPanel_PanelBorder from "./TopRightPanel_PanelBorder";
import TopRightPanel_SettingsTabs from "./TopRightPanel_SettingsTabs";
import TopRightPanel_SettingsTabsThemesSetting from "./TopRightPanel_SettingsTabsThemesSetting";

type TopRightPanelPropsType = {
    appState: appStateType,
    topRightPanelState: topRightPanelStateType,
    appAction_changeAppTheme: Function,
    topRightPanelAction_setTopRightPanelFocusOn: Function,
}

const TopRightPanel = (props: TopRightPanelPropsType) =>
{
    let topRightPanelShapeModel: Shape2d_Rectangle = props.topRightPanelState.topRightPanelShapeModel;

    let topRightPanelStyleObject = new StyleObject().setBasics(topRightPanelShapeModel.getWidth(), topRightPanelShapeModel.getHeight(), topRightPanelShapeModel.getTopLeftPoint().getX(), topRightPanelShapeModel.getTopLeftPoint().getY())
        .setBlur(props.topRightPanelState.topRightPanelFocusOn
                 ? BLUR_LEVEL.NONE
                 : BLUR_LEVEL.MEDIUM)
        .addTransition("filter", TRANSITION_TIME_NORMAL);

    console.log(LEVEL2_CONSOLE_PREFIX + topRightPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return <div id={topRightPanelShapeModel.getStringId()} style={topRightPanelStyleObject.getStyle()}
                onMouseEnter={() => props.topRightPanelAction_setTopRightPanelFocusOn(true)}
                onMouseLeave={() => props.topRightPanelAction_setTopRightPanelFocusOn(false)}>
        <TopRightPanel_PanelBorder/>
        <TopRightPanel_SettingsTabsThemesSetting/>
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
        appAction_changeAppTheme: appAction_changeAppTheme,
        topRightPanelAction_setTopRightPanelFocusOn: topRightPanelAction_setTopRightPanelFocusOn,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(TopRightPanel);