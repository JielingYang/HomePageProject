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
import {WHITE_TRANSPARENT_50} from "../../utilities/CONSTANTS_COLOR";
import EnginePartStateModel from "../../classes/StateModelClasses/EnginePartStateModel";

type BottomRightPanelPropsType = {
    bottomRightPanelState: bottomRightPanelStateType,
    bottomRightPanelAction_setBottomRightPanelFocusOn: Function,
}

const BottomRightPanel = (props: BottomRightPanelPropsType) =>
{
    let bottomRightPanelShapeModel: Shape2d_Rectangle = props.bottomRightPanelState.bottomRightPanelShapeModel;
    let bottomRightPanelStyleObject: StyleObject = new StyleObject().setBasics(bottomRightPanelShapeModel.getWidth(), bottomRightPanelShapeModel.getHeight(), bottomRightPanelShapeModel.getTopLeftPoint().getX(), bottomRightPanelShapeModel.getTopLeftPoint().getY())
        .setPerspective(props.bottomRightPanelState.bottomRightPanelPerspective, undefined)
        .addTransition("filter", TRANSITION_TIME_NORMAL)
        .setBlur(props.bottomRightPanelState.bottomRightPanelFocusOn
                 ? BLUR_LEVEL.NONE
                 : BLUR_LEVEL.MEDIUM);

    let bottomRightPanelUnitLength: number = bottomRightPanelShapeModel.getUnitLengthSmall();
    let engineContainerDivSize: number = 100 * bottomRightPanelUnitLength;
    let engineContainerDivStyleObject: StyleObject = new StyleObject().setBasics(engineContainerDivSize, engineContainerDivSize, (bottomRightPanelShapeModel.getWidth() - engineContainerDivSize) / 2, 0)
        .setTransformStyle("preserve-3d")
        .addRotationY(-90)
        .addTranslationX(props.bottomRightPanelState.engineDistance)
        .addRotationY(props.bottomRightPanelState.engineRotation);

    let enginePartModels: Array<EnginePartStateModel> = props.bottomRightPanelState.enginePartStateModels;
    console.log(LEVEL2_CONSOLE_PREFIX + bottomRightPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <div id={bottomRightPanelShapeModel.getStringId()} style={bottomRightPanelStyleObject.getStyle()}
             onMouseEnter={() => props.bottomRightPanelAction_setBottomRightPanelFocusOn(true)}
             onMouseLeave={() => props.bottomRightPanelAction_setBottomRightPanelFocusOn(false)}>
            <SubPanelBorder subPanelState={props.bottomRightPanelState} borderBlurLevel={BLUR_LEVEL.LIGHT}/>
            <div style={engineContainerDivStyleObject.getStyle()}>
                {enginePartModels.map((model: EnginePartStateModel, index: number) =>
                {
                    let enginePartStyleObject = new StyleObject().setBasics("100%", "100%", 0, 0)
                        .setBackgroundColor(WHITE_TRANSPARENT_50)
                        .addTranslationZ(model.getZPosition());
                    return <div key={index} style={enginePartStyleObject.getStyle()}/>;
                })}
            </div>
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
        bottomRightPanelAction_setBottomRightPanelFocusOn: bottomRightPanelAction_setBottomRightPanelFocusOn
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(BottomRightPanel);