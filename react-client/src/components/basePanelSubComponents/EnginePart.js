import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import StyleObject from "../../classes/StyleObject";
import type {bottomRightPanelStateType} from "../../reducers/bottomRightPanelReducer";
import {TRANSITION_TIME_NORMAL} from "../../utilities/CONSTANTS_TIME";
import {COMMON_TYPE} from "../../utilities/CONSTANTS_STRING";
import {bottomRightPanelAction_requestToSetMouseHoverOnEnginePart} from "../../actionCreators/bottomRightPanelActions";
import EnginePartStateModel from "../../classes/StateModelClasses/EnginePartStateModel";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";
import {WHITE_TRANSPARENT_10} from "../../utilities/CONSTANTS_COLOR";

type EnginePartPropsType = {
    bottomRightPanelState: bottomRightPanelStateType,
    stateModel: EnginePartStateModel,
    engineIndex: number,
    engineRotationX: number,
    engineRotationY: number,
    mouseHoverOnAnyEnginePart: boolean,

    bottomRightPanelAction_requestToSetMouseHoverOnEnginePart: Function,
}

const EnginePart = (props: EnginePartPropsType) =>
{
    let stateModel: EnginePartStateModel = props.stateModel;
    let enginePartSize = props.bottomRightPanelState.enginePartSize;
    let enginePartInitialMiddlePosition: number = "calc(50% - " + enginePartSize / 2 + "px)";
    let mouseHoverOnThisEnginePart: boolean = stateModel.getMouseHover();
    let enginePartBlurLevel: BLUR_LEVEL = props.mouseHoverOnAnyEnginePart && !mouseHoverOnThisEnginePart
                                          ? BLUR_LEVEL.LIGHT
                                          : BLUR_LEVEL.NONE;
    let enginePartOpacity: BLUR_LEVEL = props.mouseHoverOnAnyEnginePart && !mouseHoverOnThisEnginePart
                                        ? 0.5
                                        : 1;

    let enginePartContainerDivStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics(enginePartSize, enginePartSize, enginePartInitialMiddlePosition, enginePartInitialMiddlePosition)
        .setPointerEvents("none")
        .addRotationX(props.engineRotationX)
        .addRotationY(props.engineRotationY)
        .addTranslationX(stateModel.getPosition())
        .setTransformStyle("preserve-3d");

    let enginePartCoreDivStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics("200%", "100%", "-100%", 0)
        .setBackgroundColor(WHITE_TRANSPARENT_10)
        .setPointerEvents("auto")
        .setBlur(enginePartBlurLevel)
        .setOpacity(enginePartOpacity)
        .addTransition("filter", TRANSITION_TIME_NORMAL)
        .addTransition("opacity", TRANSITION_TIME_NORMAL)
        .addTranslationZ(-enginePartSize / 2)

    let testStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics("200%", "100%",  "-100%", 0)
        .setBackgroundColor(WHITE_TRANSPARENT_10)
        .setPointerEvents("auto")
        .setBlur(enginePartBlurLevel)
        .setOpacity(enginePartOpacity)
        .addTransition("filter", TRANSITION_TIME_NORMAL)
        .addTransition("opacity", TRANSITION_TIME_NORMAL)
        .addTranslationZ(enginePartSize / 2)

    let testStyleObject1: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics("200%", "100%",  "-100%", 0)
        .setBackgroundColor(WHITE_TRANSPARENT_10)
        .setPointerEvents("auto")
        .setBlur(enginePartBlurLevel)
        .setOpacity(enginePartOpacity)
        .addTransition("filter", TRANSITION_TIME_NORMAL)
        .addTransition("opacity", TRANSITION_TIME_NORMAL)
        .addTranslationY(enginePartSize / 2)
        .addRotationX(-90)

    let testStyleObject2: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics("200%", "100%",  "-100%", 0)
        .setBackgroundColor(WHITE_TRANSPARENT_10)
        .setPointerEvents("auto")
        .setBlur(enginePartBlurLevel)
        .setOpacity(enginePartOpacity)
        .addTransition("filter", TRANSITION_TIME_NORMAL)
        .addTransition("opacity", TRANSITION_TIME_NORMAL)
        .addTranslationY(-enginePartSize / 2)
        .addRotationX(90)

    return <div id={stateModel.getStringId()} style={enginePartContainerDivStyleObject.getStyle()}
                onMouseEnter={() => props.bottomRightPanelAction_requestToSetMouseHoverOnEnginePart(props.engineIndex, true)}
                onMouseLeave={() => props.bottomRightPanelAction_requestToSetMouseHoverOnEnginePart(props.engineIndex, false)}>
        <div style={enginePartCoreDivStyleObject.getStyle()}/>
        <div style={testStyleObject.getStyle()}/>
        <div style={testStyleObject1.getStyle()}/>
        <div style={testStyleObject2.getStyle()}/>
    </div>;
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
        bottomRightPanelAction_requestToSetMouseHoverOnEnginePart: bottomRightPanelAction_requestToSetMouseHoverOnEnginePart,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(EnginePart);