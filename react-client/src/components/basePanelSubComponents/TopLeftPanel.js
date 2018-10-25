import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/shapeClasses/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";
import {TRANSITION_TIME_NORMAL} from "../../utilities/CONSTANTS_TIME";
import {topLeftPanelAction_setTopLeftPanelFocusOn} from "../../actionCreators/topLeftPanelActions";
import SubPanelBorder from "./SubPanelBorder";
import type {topLeftPanelStateType} from "../../reducers/topLeftPanelReducer";

type TopLeftPanelPropsType = {
    topLeftPanelState: topLeftPanelStateType,
    topLeftPanelAction_setTopLeftPanelFocusOn: Function,
}

const TopLeftPanel = (props: TopLeftPanelPropsType) =>
{
    let topLeftPanelShapeModel: Shape2d_Rectangle = props.topLeftPanelState.topLeftPanelShapeModel;

    let topLeftPanelStyleObject = new StyleObject().setBasics(topLeftPanelShapeModel.getWidth(), topLeftPanelShapeModel.getHeight(), topLeftPanelShapeModel.getTopLeftPoint().getX(), topLeftPanelShapeModel.getTopLeftPoint().getY())
        .addTransition("filter", TRANSITION_TIME_NORMAL)
        .setBlur(props.topLeftPanelState.topLeftPanelFocusOn
                 ? BLUR_LEVEL.NONE
                 : BLUR_LEVEL.MEDIUM);

    console.log(LEVEL2_CONSOLE_PREFIX + topLeftPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <div id={topLeftPanelShapeModel.getStringId()} style={topLeftPanelStyleObject.getStyle()}
             onMouseEnter={() => props.topLeftPanelAction_setTopLeftPanelFocusOn(true)}
             onMouseLeave={() => props.topLeftPanelAction_setTopLeftPanelFocusOn(false)}>
            <SubPanelBorder subPanelState={props.topLeftPanelState} borderBlurLevel={BLUR_LEVEL.LIGHT}/>
        </div>);
};

const mapStateToProps = (store) =>
{
    return {
        topLeftPanelState: store.topLeftPanelState,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
        topLeftPanelAction_setTopLeftPanelFocusOn: topLeftPanelAction_setTopLeftPanelFocusOn,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(TopLeftPanel);