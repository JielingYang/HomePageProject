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
import EnginePartStateModel from "../../classes/StateModelClasses/EnginePartStateModel";
import {COMMON_TYPE} from "../../utilities/CONSTANTS_STRING";
import EnginePart from "./EnginePart";

type BottomRightPanelPropsType = {
    bottomRightPanelState: bottomRightPanelStateType,
    bottomRightPanelAction_setBottomRightPanelFocusOn: Function,
}

const BottomRightPanel = (props: BottomRightPanelPropsType) =>
{
    let bottomRightPanelShapeModel: Shape2d_Rectangle = props.bottomRightPanelState.bottomRightPanelShapeModel;
    let bottomRightPanelStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT).setBasics(bottomRightPanelShapeModel.getWidth(), bottomRightPanelShapeModel.getHeight(), bottomRightPanelShapeModel.getTopLeftPoint().getX(), bottomRightPanelShapeModel.getTopLeftPoint().getY())
        .setPerspective(props.bottomRightPanelState.bottomRightPanelPerspective)
        .addTransition("filter", TRANSITION_TIME_NORMAL)
        .setBlur(props.bottomRightPanelState.bottomRightPanelFocusOn
                 ? BLUR_LEVEL.NONE
                 : BLUR_LEVEL.MEDIUM);

    let enginePartModels: Array<EnginePartStateModel> = props.bottomRightPanelState.enginePartStateModels;
    let mouseHoverOnAny: boolean = enginePartModels.some((m: EnginePartStateModel) => m.getMouseHover());

    console.log(LEVEL2_CONSOLE_PREFIX + bottomRightPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <div id={bottomRightPanelShapeModel.getStringId()} style={bottomRightPanelStyleObject.getStyle()}
             onMouseEnter={() => props.bottomRightPanelAction_setBottomRightPanelFocusOn(true)}
             onMouseLeave={() => props.bottomRightPanelAction_setBottomRightPanelFocusOn(false)}>
            <SubPanelBorder subPanelState={props.bottomRightPanelState} borderBlurLevel={BLUR_LEVEL.LIGHT}/>
            {enginePartModels.map((model: EnginePartStateModel, index: number) =>
            {
                return <EnginePart key={index} stateModel={model} engineIndex={index} rotation={props.bottomRightPanelState.engineRotation}
                                   mouseHoverOnAnyEnginePart={mouseHoverOnAny}/>
            })}
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