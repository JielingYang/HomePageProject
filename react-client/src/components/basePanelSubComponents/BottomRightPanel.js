import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/shapeClasses/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";
import {TRANSITION_TIME_NORMAL} from "../../utilities/CONSTANTS_TIME";
import {bottomRightPanelAction_requestToSetMouseHoverOnEnginePart, bottomRightPanelAction_setBottomRightPanelFocusOn} from "../../actionCreators/bottomRightPanelActions";
import type {bottomRightPanelStateType} from "../../reducers/bottomRightPanelReducer";
import SubPanelBorder from "./SubPanelBorder";
import {WHITE_TRANSPARENT_50} from "../../utilities/CONSTANTS_COLOR";
import EnginePartStateModel from "../../classes/StateModelClasses/EnginePartStateModel";

type BottomRightPanelPropsType = {
    bottomRightPanelState: bottomRightPanelStateType,
    bottomRightPanelAction_setBottomRightPanelFocusOn: Function,
    bottomRightPanelAction_requestToSetMouseHoverOnEnginePart: Function,
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

    let isLandscape: boolean = bottomRightPanelShapeModel.getWidth() >= bottomRightPanelShapeModel.getHeight();
    let engineContainerDivSize: number = 20 * bottomRightPanelShapeModel.getUnitLengthSmall();
    let engineContainerDivStyleObject: StyleObject = new StyleObject().setBasics(engineContainerDivSize, engineContainerDivSize, "50%", "50%").setTransformStyle("preserve-3d");
    if (isLandscape)
    {
        engineContainerDivStyleObject.addRotationY(-90)
            .addTranslationX(3 * engineContainerDivSize)
        .addRotationY(10);
            // .addTranslationX(props.bottomRightPanelState.engineDistance)
        // .addRotationY(props.bottomRightPanelState.engineRotation);
    }
    else
    {
        engineContainerDivStyleObject.addRotationX(90).addTranslationY(props.bottomRightPanelState.engineDistance).addRotationX(-props.bottomRightPanelState.engineRotation);
    }

    let enginePartModels: Array<EnginePartStateModel> = props.bottomRightPanelState.enginePartStateModels;
    let mouseHoverOnAny: boolean = enginePartModels.some((m: EnginePartStateModel) => m.getMouseHover());
    let enginePartBlurLevel: BLUR_LEVEL = mouseHoverOnAny
                                          ? BLUR_LEVEL.LIGHT
                                          : BLUR_LEVEL.NONE;

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
                        .setBlur(enginePartBlurLevel)
                        .addTranslationZ(model.getZPosition())
                        .addTransition("filter", TRANSITION_TIME_NORMAL);
                    return index === 2 ? <div key={index} style={enginePartStyleObject.getStyle()}
                                onMouseEnter={() => props.bottomRightPanelAction_requestToSetMouseHoverOnEnginePart(index, true)}
                                onMouseLeave={() => props.bottomRightPanelAction_requestToSetMouseHoverOnEnginePart(index, false)}/>:null;
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
        bottomRightPanelAction_setBottomRightPanelFocusOn: bottomRightPanelAction_setBottomRightPanelFocusOn,
        bottomRightPanelAction_requestToSetMouseHoverOnEnginePart: bottomRightPanelAction_requestToSetMouseHoverOnEnginePart,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(BottomRightPanel);