import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/shapeClasses/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";
import {TRANSITION_TIME_NORMAL} from "../../utilities/CONSTANTS_TIME";
import {bottomRightPanelAction_setBottomRightPanelFocusOn} from "../../actionCreators/bottomRightPanelActions";
import type {bottomRightPanelStateType} from "../../reducers/bottomRightPanelReducer";
import SubPanelBorder from "./SubPanelBorder";
import EngineStateModel from "../../classes/StateModelClasses/EngineStateModel";
import {COMMON_TYPE} from "../../utilities/CONSTANTS_STRING";
import Engine from "./Engine";

type BottomRightPanelPropsType = {
    bottomRightPanelState: bottomRightPanelStateType,
    bottomRightPanelAction_setBottomRightPanelFocusOn: Function,
}

const BottomRightPanel = (props: BottomRightPanelPropsType) =>
{
    let bottomRightPanelShapeModel: Shape2d_Rectangle = props.bottomRightPanelState.bottomRightPanelShapeModel;
    let bottomRightPanelStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics(bottomRightPanelShapeModel.getWidth(), bottomRightPanelShapeModel.getHeight(), bottomRightPanelShapeModel.getTopLeftPoint().getX(), bottomRightPanelShapeModel.getTopLeftPoint().getY())
        .setPerspective(props.bottomRightPanelState.bottomRightPanelPerspective)
        .addTransition("filter", TRANSITION_TIME_NORMAL)
        .setBlur(props.bottomRightPanelState.bottomRightPanelFocusOn
                 ? BLUR_LEVEL.NONE
                 : BLUR_LEVEL.MEDIUM);

    let engineModel: EngineStateModel = props.bottomRightPanelState.engineStateModel;
    let mouseHoverOnAny: boolean = engineModel.getMouseHover();

    console.log(LEVEL2_CONSOLE_PREFIX + bottomRightPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <div id={bottomRightPanelShapeModel.getStringId()} style={bottomRightPanelStyleObject.getStyle()}
             onMouseEnter={() => props.bottomRightPanelAction_setBottomRightPanelFocusOn(true)}
             onMouseLeave={() => props.bottomRightPanelAction_setBottomRightPanelFocusOn(false)}>
            <SubPanelBorder subPanelState={props.bottomRightPanelState} borderBlurLevel={BLUR_LEVEL.LIGHT}/>
            <Engine stateModel={engineModel}
                    engineRotationX={props.bottomRightPanelState.engineRotationX}
                    engineRotationY={props.bottomRightPanelState.engineRotationY}
                    mouseHoverOnAnyEnginePart={mouseHoverOnAny}/>
        </div>);
};

const mapStateToProps = (store) =>
{
    return {
        bottomRightPanelState: store.bottomRightPanelState,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
        bottomRightPanelAction_setBottomRightPanelFocusOn: bottomRightPanelAction_setBottomRightPanelFocusOn,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(BottomRightPanel);