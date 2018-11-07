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
import {WHITE_TRANSPARENT_10, WHITE_TRANSPARENT_50} from "../../utilities/CONSTANTS_COLOR";
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
        .setPerspective(props.bottomRightPanelState.bottomRightPanelPerspective)
        .addTransition("filter", TRANSITION_TIME_NORMAL)
        .setBlur(props.bottomRightPanelState.bottomRightPanelFocusOn
                 ? BLUR_LEVEL.NONE
                 : BLUR_LEVEL.MEDIUM);

    let enginePartSize: number = props.bottomRightPanelState.enginePartSize;
    let engineContainerDivStyleObject: StyleObject = new StyleObject()
        .setBasics("100%", "100%", enginePartSize, 0)
        .setPointerEvents("none")
        .addRotationY(45)
        .setTransformStyle("preserve-3d");

    let enginePartModels: Array<EnginePartStateModel> = props.bottomRightPanelState.enginePartStateModels;
    let enginePartTopPosition: number = "calc(50% - " + enginePartSize / 2 + "px)";
    let mouseHoverOnAny: boolean = enginePartModels.some((m: EnginePartStateModel) => m.getMouseHover());

    console.log(LEVEL2_CONSOLE_PREFIX + bottomRightPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <div id={bottomRightPanelShapeModel.getStringId()} style={bottomRightPanelStyleObject.getStyle()}
             onMouseEnter={() => props.bottomRightPanelAction_setBottomRightPanelFocusOn(true)}
             onMouseLeave={() => props.bottomRightPanelAction_setBottomRightPanelFocusOn(false)}>
            <SubPanelBorder subPanelState={props.bottomRightPanelState} borderBlurLevel={BLUR_LEVEL.LIGHT}/>
            <div style={engineContainerDivStyleObject.getStyle()}>
                {enginePartModels.map((model: EnginePartStateModel, index: number) =>
                {
                    let mouseHoverOnThis: boolean = model.getMouseHover();
                    let enginePartBlurLevel: BLUR_LEVEL = mouseHoverOnAny && !mouseHoverOnThis
                                                          ? BLUR_LEVEL.LIGHT
                                                          : BLUR_LEVEL.NONE;
                    let enginePartOpacity: BLUR_LEVEL = mouseHoverOnAny && !mouseHoverOnThis
                                                        ? 0.8
                                                        : 1;

                    let enginePartWrapperStyle = new StyleObject()
                        .setBasics(enginePartSize, enginePartSize, model.getZPosition(), enginePartTopPosition)
                        .setPointerEvents("auto")
                        .setBlur(enginePartBlurLevel)
                        .setOpacity(enginePartOpacity)
                        .addRotationY(90)
                        .addTransition("filter", TRANSITION_TIME_NORMAL)
                        .addTransition("opacity", TRANSITION_TIME_NORMAL);
                    let enginePartStyleObject = new StyleObject()
                        .setBasics("100%", "100%", 0, 0)
                        .setBackgroundColor(WHITE_TRANSPARENT_10);

                    return <div key={index} style={enginePartWrapperStyle.getStyle()}
                                onMouseEnter={() => props.bottomRightPanelAction_requestToSetMouseHoverOnEnginePart(index, true)}
                                onMouseLeave={() => props.bottomRightPanelAction_requestToSetMouseHoverOnEnginePart(index, false)}>
                        <div id={model.getStringId()} style={enginePartStyleObject.getStyle()}/>
                    </div>;
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