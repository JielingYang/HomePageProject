import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import StyleObject from "../../classes/StyleObject";
import type {bottomRightPanelStateType} from "../../reducers/bottomRightPanelReducer";
import {TRANSITION_TIME_NORMAL} from "../../utilities/CONSTANTS_TIME";
import {COMMON_TYPE, ENGINE_PART_IDS} from "../../utilities/CONSTANTS_STRING";
import {bottomRightPanelAction_requestToSetMouseHoverOnEnginePart, bottomRightPanelAction_requestToToggleIsSelectedOnEnginePart} from "../../actionCreators/bottomRightPanelActions";
import EnginePartStateModel from "../../classes/StateModelClasses/EnginePartStateModel";
import {BLUR_LEVEL, INDEX} from "../../utilities/CONSTANTS_NUMBER";
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
    bottomRightPanelAction_requestToToggleIsSelectedOnEnginePart: Function,
}

const EnginePart = (props: EnginePartPropsType) =>
{
    let stateModel: EnginePartStateModel = props.stateModel;
    let basePanelState: basePanelStateType = props.basePanelState;
    let enginePartSize = props.bottomRightPanelState.enginePartSize;
    let enginePartInitialMiddlePosition: string = "calc(50% - " + enginePartSize / 2 + "px)";
    let mouseHoverOnThisEnginePart: boolean = stateModel.getMouseHover();
    let isThisEnginePartSelected: boolean = stateModel.getIsSelected();
    let isFrontEnginePart: boolean = stateModel.getStringId() === ENGINE_PART_IDS[INDEX.ENGINE_PART_FRONT];
    // let isBackEnginePart: boolean = stateModel.getStringId() === ENGINE_PART_IDS[INDEX.ENGINE_PART_BACK];
    let engineSideFacesDefaultTranslation: number = enginePartSize * 0.5;
    let engineFrontFacesDefaultRotation: number = 180;
    let basePanelRotationX: number = basePanelState.basePanelRotationX;
    let basePanelRotationY: number = basePanelState.basePanelRotationY;
    let numberOfEngineSides: number = props.bottomRightPanelState.numberOfEngineSides;
    let numberOfEngineSideFaces: number = props.bottomRightPanelState.numberOfEngineSideFaces;
    let stfRatio: number = numberOfEngineSides / numberOfEngineSideFaces;
    let engineSideFacesExteriorAngle: number = props.bottomRightPanelState.engineSideFacesExteriorAngle;
    let enginePartSideFacesStyleObjects = [];
    let hoverTranslation = enginePartSize * 0.05;
    let selectTranslation = enginePartSize * 0.13;
    let allEnginePartFrontFaceSvg = getAllEngineFrontFaceSvg(WHITE_TRANSPARENT_80);
    let enginePartBlurLevel: BLUR_LEVEL = props.mouseHoverOnAnyEnginePart && !mouseHoverOnThisEnginePart
                                          ? BLUR_LEVEL.LIGHT
                                          : BLUR_LEVEL.NONE;
    let enginePartOpacity: BLUR_LEVEL = props.mouseHoverOnAnyEnginePart && !mouseHoverOnThisEnginePart
                                        ? 0.5
                                        : 1;

    let enginePartContainerDivStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics(enginePartSize, enginePartSize, enginePartInitialMiddlePosition, enginePartInitialMiddlePosition)
        .setPointerEvents("none")
        .addRotationX(props.engineRotationX + basePanelRotationX)
        .addRotationY(props.engineRotationY + basePanelRotationY)
        .addTranslationX(stateModel.getPosition())
        .setTransformStyle("preserve-3d");
    let enginePartFaceDivCommonStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics("100%", props.bottomRightPanelState.engineSideFaceHeightPercentage, 0, props.bottomRightPanelState.engineSideFaceTopPercentage)
        .setPointerEvents("auto")
        .setBlur(enginePartBlurLevel)
        .setOpacity(enginePartOpacity)
        .addTransition("filter", TRANSITION_TIME_NORMAL)
        .addTransition("opacity", TRANSITION_TIME_NORMAL);
    for (let i = 0; i < numberOfEngineSideFaces; i++)
    {
        enginePartSideFacesStyleObjects.push(enginePartFaceDivCommonStyleObject.clone()
            .addRotationX(engineSideFacesExteriorAngle * i * stfRatio)
            .addTranslationZ(engineSideFacesDefaultTranslation));
    }

    let enginePartSideFaces = enginePartSideFacesStyleObjects.map((so: StyleObject, i: number) =>
    {
        return <div key={i} style={so.getStyle()}>
            <svg width="100%" height="100%">
                <rect x="10%" y="10%" width="80%" height="80%" stroke="rgba(255,255,255,1)" strokeWidth="1"
                      fill="none"/>
                <circle cx="50%" cy="50%" r="10%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none"/>
            </svg>
        </div>
    });

    let enginePartFrontFace = isFrontEnginePart
                              ? allEnginePartFrontFaceSvg.map((svg, i) =>
        {
            let enginePartFrontFaceDivStyleObject: StyleObject = enginePartFaceDivCommonStyleObject.clone()
                .setHeight("100%")
                .setTop(0)
                .addRotationY(-90)
                .addRotationZ(engineFrontFacesDefaultRotation)
                .addTranslationZ(engineSideFacesDefaultTranslation)
                .addTransition("transform", TRANSITION_TIME_NORMAL);
            let tz = isThisEnginePartSelected
                     ? selectTranslation * (i + 1)
                     : mouseHoverOnThisEnginePart
                       ? hoverTranslation * (i + 1)
                       : 0;
            let selectRotation = isThisEnginePartSelected
                                 ? 90
                                 : mouseHoverOnThisEnginePart
                                   ? 30
                                   : 0;
            let so = enginePartFrontFaceDivStyleObject.clone()
                .addRotationZ(selectRotation)
                .addTranslationZ(tz);
            return <div key={i} style={so.getStyle()}>{svg}</div>
        })
                              : null;

    return <div id={stateModel.getStringId()} style={enginePartContainerDivStyleObject.getStyle()}
                onClick={() => props.bottomRightPanelAction_requestToToggleIsSelectedOnEnginePart(props.engineIndex)}
                onMouseEnter={() => props.bottomRightPanelAction_requestToSetMouseHoverOnEnginePart(props.engineIndex, true)}
                onMouseLeave={() => props.bottomRightPanelAction_requestToSetMouseHoverOnEnginePart(props.engineIndex, false)}>
        {enginePartSideFaces}
        {enginePartFrontFace}
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
        bottomRightPanelAction_requestToToggleIsSelectedOnEnginePart: bottomRightPanelAction_requestToToggleIsSelectedOnEnginePart,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(EnginePart);