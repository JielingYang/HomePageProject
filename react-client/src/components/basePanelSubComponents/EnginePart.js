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
import type {basePanelStateType} from "../../reducers/basePanelReducer";
import {getAllEngineFrontFaceSvg} from "../../utilities/svgIcons";
import {WHITE_TRANSPARENT_80} from "../../utilities/CONSTANTS_COLOR";

type EnginePartPropsType = {
    basePanelState: basePanelStateType,
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
    let basePanelState: basePanelStateType = props.basePanelState;
    let enginePartSize = props.bottomRightPanelState.enginePartSize;
    let enginePartInitialMiddlePosition: string = "calc(50% - " + enginePartSize / 2 + "px)";
    let mouseHoverOnThisEnginePart: boolean = stateModel.getMouseHover();
    let enginePartBlurLevel: BLUR_LEVEL = props.mouseHoverOnAnyEnginePart && !mouseHoverOnThisEnginePart
                                          ? BLUR_LEVEL.LIGHT
                                          : BLUR_LEVEL.NONE;
    let enginePartOpacity: BLUR_LEVEL = props.mouseHoverOnAnyEnginePart && !mouseHoverOnThisEnginePart
                                        ? 0.5
                                        : 1;
    let engineFacesDefaultTranslation: number = enginePartSize * 0.5;
    let engineFrontFacesDefaultRotation: number = 180;

    let basePanelRotationX: number = basePanelState.basePanelRotationX;
    let basePanelRotationY: number = basePanelState.basePanelRotationY;

    let enginePartContainerDivStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics(enginePartSize, enginePartSize, enginePartInitialMiddlePosition, enginePartInitialMiddlePosition)
        .setPointerEvents("none")
        .addRotationX(props.engineRotationX + basePanelRotationX)
        .addRotationY(props.engineRotationY + basePanelRotationY)
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
        .addTransition("opacity", TRANSITION_TIME_NORMAL);
    let enginePartSideFacesStyleObjects = [];
    for (let i = 0; i < numberOfEngineSideFaces; i++)
    {
        enginePartSideFacesStyleObjects.push(enginePartFaceDivCommonStyleObject.clone()
            .addRotationX(engineSideFacesExteriorAngle * i)
            .addTranslationZ(engineFacesDefaultTranslation));
    }

    let allEnginePartFrontFaceSvg = getAllEngineFrontFaceSvg(WHITE_TRANSPARENT_80);
    let enginePartFrontFaceDivStyleObject: StyleObject = enginePartFaceDivCommonStyleObject.clone()
        .setHeight("100%")
        .setTop(0)
        .addRotationY(-90)
        .addRotationZ(engineFrontFacesDefaultRotation)
        .addTranslationZ(engineFacesDefaultTranslation)
        .addTransition("transform", TRANSITION_TIME_NORMAL);

    return <div id={stateModel.getStringId()} style={enginePartContainerDivStyleObject.getStyle()}
                onMouseEnter={() => props.bottomRightPanelAction_requestToSetMouseHoverOnEnginePart(props.engineIndex, true)}
                onMouseLeave={() => props.bottomRightPanelAction_requestToSetMouseHoverOnEnginePart(props.engineIndex, false)}>
        {enginePartSideFacesStyleObjects.map((so: StyleObject, i: number) =>
        {
            return <div key={i} style={so.getStyle()}>
                <svg width="100%" height="100%">
                    <rect x="10%" y="10%" width="80%" height="80%" stroke="rgba(255,255,255,0.5)" strokeWidth="1"
                          fill="none"/>
                    <circle cx="50%" cy="50%" r="10%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none"/>
                </svg>
            </div>
        })}
        {allEnginePartFrontFaceSvg.map((svg, i) =>
        {
            let hoverTranslation = mouseHoverOnThisEnginePart
                                   ? enginePartSize * 0.13 * (i + 1)
                                   : 0;
            let hoverRotation = mouseHoverOnThisEnginePart
                                   ? 90
                                   : 0;
            let so = enginePartFrontFaceDivStyleObject.clone()
                .addRotationZ(hoverRotation)
                .addTranslationZ(hoverTranslation);
            return <div key={i} style={so.getStyle()}>{svg}</div>
        })}
    </div>;
};

const mapStateToProps = (store) =>
{
    return {
        basePanelState: store.basePanelState,
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