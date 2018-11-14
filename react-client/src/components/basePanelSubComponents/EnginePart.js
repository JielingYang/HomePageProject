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
import {WHITE_TRANSPARENT_10, WHITE_TRANSPARENT_80} from "../../utilities/CONSTANTS_COLOR";
import {getEngineSideFaceCircuitSvg} from "../../utilities/svgIcons";

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
    let enginePartInitialMiddlePosition: string = "calc(50% - " + enginePartSize / 2 + "px)";
    let mouseHoverOnThisEnginePart: boolean = stateModel.getMouseHover();
    let enginePartBlurLevel: BLUR_LEVEL = props.mouseHoverOnAnyEnginePart && !mouseHoverOnThisEnginePart
                                          ? BLUR_LEVEL.LIGHT
                                          : BLUR_LEVEL.NONE;
    let enginePartOpacity: BLUR_LEVEL = props.mouseHoverOnAnyEnginePart && !mouseHoverOnThisEnginePart
                                        ? 0.5
                                        : 1;
    let hoverTranslation: number = mouseHoverOnThisEnginePart
                                   ? enginePartSize * 0.7
                                   : enginePartSize * 0.5;

    let enginePartContainerDivStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics(enginePartSize, enginePartSize, enginePartInitialMiddlePosition, enginePartInitialMiddlePosition)
        .setPointerEvents("none")
        .addRotationX(props.engineRotationX)
        .addRotationY(props.engineRotationY)
        .addTranslationX(stateModel.getPosition())
        .setTransformStyle("preserve-3d");

    let numberOfEngineSideFaces: number = props.bottomRightPanelState.numberOfEngineSideFaces;
    let engineSideFacesExteriorAngle: number = props.bottomRightPanelState.engineSideFacesExteriorAngle;
    let enginePartFaceDivCommonStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics("100%", props.bottomRightPanelState.engineSideFaceHeightPercentage, 0, props.bottomRightPanelState.engineSideFaceTopPercentage)
        .setPointerEvents("auto")
        .setBlur(enginePartBlurLevel)
        .setOpacity(enginePartOpacity)
        .addTransition("filter", TRANSITION_TIME_NORMAL)
        .addTransition("opacity", TRANSITION_TIME_NORMAL)
        .addTransition("transform", TRANSITION_TIME_NORMAL);
    let enginePartSideFacesStyleObjects = [];
    for (let i = 0; i < numberOfEngineSideFaces; i++)
    {
        enginePartSideFacesStyleObjects.push(enginePartFaceDivCommonStyleObject.clone()
            .addRotationX(engineSideFacesExteriorAngle * i)
            .addTranslationZ(hoverTranslation));
    }

    let enginePartFrontFaceDivStyleObject: StyleObject = enginePartFaceDivCommonStyleObject.clone()
        .setHeight("100%")
        .setTop(0)
        .addRotationY(-90)
        .addTranslationZ(hoverTranslation);

    return <div id={stateModel.getStringId()} style={enginePartContainerDivStyleObject.getStyle()}
                onMouseEnter={() => props.bottomRightPanelAction_requestToSetMouseHoverOnEnginePart(props.engineIndex, true)}
                onMouseLeave={() => props.bottomRightPanelAction_requestToSetMouseHoverOnEnginePart(props.engineIndex, false)}>
        {enginePartSideFacesStyleObjects.map((so: StyleObject, i: number) =>
        {
            return <div key={i} style={so.getStyle()}>
                {getEngineSideFaceCircuitSvg(WHITE_TRANSPARENT_80)}
            </div>
        })}
        <div style={enginePartFrontFaceDivStyleObject.getStyle()}>
            <svg width="100%" height="100%">
                <circle cx="50%" cy="50%" r="50%" stroke="white" strokeWidth="3" fill="none"/>
            </svg>
        </div>
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