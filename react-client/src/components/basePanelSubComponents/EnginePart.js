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
import {getEngineMiddleFaceSvg, getEngineFrontFaceSvg, getEngineBackFaceSvg} from "../../utilities/svgIcons";
import type {appStateType} from "../../reducers/appReducer";

type EnginePartPropsType = {
    appState: appStateType,
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
    let engineBasicColor: string = props.appState.engineBasicColor;
    let enginePartSize = props.bottomRightPanelState.enginePartSize;
    let basePanelRotationX: number = basePanelState.basePanelRotationX;
    let basePanelRotationY: number = basePanelState.basePanelRotationY;
    let numberOfEngineSides: number = props.bottomRightPanelState.numberOfEngineSides;
    let numberOfEngineSideFaces: number = props.bottomRightPanelState.numberOfEngineSideFaces;
    let engineSideFacesExteriorAngle: number = props.bottomRightPanelState.engineSideFacesExteriorAngle;

    let enginePartInitialMiddlePosition: string = "calc(50% - " + enginePartSize / 2 + "px)";
    let mouseHoverOnThisEnginePart: boolean = stateModel.getMouseHover();
    let isThisEnginePartSelected: boolean = stateModel.getIsSelected();
    let enginePartId: string = stateModel.getStringId();
    let engineSideFacesDefaultTranslation: number = enginePartSize * 0.5;
    let engineFrontFacesDefaultRotation: number = 180;
    let stfRatio: number = numberOfEngineSides / numberOfEngineSideFaces;
    let enginePartSideFacesStyleObjects: Array<StyleObject> = [];
    // let numberOfMiddleFaceSvg: number = middleFaceSvg.length;
    // let frontFaceHoverTranslation: number = enginePartSize * 0.13;
    // let frontFaceSelectTranslation: number = enginePartSize * 0.2;
    // let coreFaceDefaultTranslation: number = frontFaceSelectTranslation * 0.8;
    // let coreFaceSelectTranslation: number = frontFaceSelectTranslation * 1.2;
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
    // let enginePartFaceDivCommonStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
    //     .setBasics("100%", props.bottomRightPanelState.engineSideFaceHeightPercentage, 0, props.bottomRightPanelState.engineSideFaceTopPercentage)
    //     .setPointerEvents("auto")
    //     .setBlur(enginePartBlurLevel)
    //     .setOpacity(enginePartOpacity)
    //     .addTransition("filter", TRANSITION_TIME_NORMAL)
    //     .addTransition("opacity", TRANSITION_TIME_NORMAL);
    // let enginePartFrontCoreFaceDivStyleObject: StyleObject = enginePartFaceDivCommonStyleObject.clone()
    //     .setHeight("100%")
    //     .setTop(0)
    //     .addRotationY(-90)
    //     .addTransition("transform", TRANSITION_TIME_NORMAL);
    // for (let i = 0; i < numberOfEngineSideFaces; i++)
    // {
    //     enginePartSideFacesStyleObjects.push(enginePartFaceDivCommonStyleObject.clone()
    //         .addRotationX(engineSideFacesExteriorAngle * i * stfRatio)
    //         .addTranslationZ(engineSideFacesDefaultTranslation));
    // }

    // let enginePartSideFaces: Array = enginePartSideFacesStyleObjects.map((so: StyleObject, i: number) =>
    // {
    //     return <div key={i} style={so.getStyle()}>
    //         <svg width="100%" height="100%">
    //             <rect x="10%" y="10%" width="80%" height="80%" stroke="rgba(255,255,255,1)" strokeWidth="1"
    //                   fill="none"/>
    //             <circle cx="50%" cy="50%" r="10%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none"/>
    //         </svg>
    //     </div>
    // });

    let enginePartFaces: Array = getEnginePartFaces(enginePartId, enginePartSize, mouseHoverOnThisEnginePart, isThisEnginePartSelected, enginePartBlurLevel, enginePartOpacity, engineBasicColor);

    return <div id={enginePartId} style={enginePartContainerDivStyleObject.getStyle()}
                onClick={() => props.bottomRightPanelAction_requestToToggleIsSelectedOnEnginePart(props.engineIndex)}
                onMouseEnter={() => props.bottomRightPanelAction_requestToSetMouseHoverOnEnginePart(props.engineIndex, true)}
                onMouseLeave={() => props.bottomRightPanelAction_requestToSetMouseHoverOnEnginePart(props.engineIndex, false)}>
        {/*{enginePartSideFaces}*/}
        {enginePartFaces}
    </div>;
};

const getEnginePartFaces: Array = (enginePartId: string, enginePartSize: number, mouseHoverOnThisEnginePart: boolean, isThisEnginePartSelected: boolean, enginePartBlurLevel: BLUR_LEVEL, enginePartOpacity: number, engineBasicColor: string) =>
{
    let isFrontPart: boolean = enginePartId === ENGINE_PART_IDS[INDEX.ENGINE_PART_FRONT];
    let isMiddlePart: boolean = enginePartId === ENGINE_PART_IDS[INDEX.ENGINE_PART_MIDDLE];
    let isBackPart: boolean = enginePartId === ENGINE_PART_IDS[INDEX.ENGINE_PART_BACK];
    let initialTranslation: number = 0;
    let initialRotation: number = 0;
    let selectTranslation: number = 0;
    let hoverTranslation: number = 0;

    if (isFrontPart)
    {
        initialTranslation = -enginePartSize / 2;
        initialRotation = 180;
        hoverTranslation = enginePartSize * 0.1;
        selectTranslation = enginePartSize * 0.2;
    }
    else if (isMiddlePart)
    {
        initialRotation = 0;
        hoverTranslation = 0;
        selectTranslation = enginePartSize * 0.1;
    }
    else if (isBackPart)
    {
        initialTranslation = enginePartSize / 2;
        hoverTranslation = -enginePartSize * 0.13;
        selectTranslation = -enginePartSize * 0.2;
    }

    let svgFaces: Array = isFrontPart
                          ? getEngineFrontFaceSvg(engineBasicColor)
                          : isMiddlePart
                            ? getEngineMiddleFaceSvg(engineBasicColor)
                            : isBackPart
                              ? getEngineBackFaceSvg(engineBasicColor)
                              : [];
    let numberOfFaces: number = svgFaces.length;

    return svgFaces.map((svg, i) =>
    {
        let indexVariant: number = i + 1;
        if (isMiddlePart)
        {
            indexVariant = i - numberOfFaces / 2;
            initialTranslation = enginePartSize * 0.15 * indexVariant;
        }
        else if (isBackPart)
        {
            initialTranslation = selectTranslation * i;
        }
        let transitionTranslation: number = initialTranslation + (isThisEnginePartSelected
                                                                  ? selectTranslation * indexVariant
                                                                  : mouseHoverOnThisEnginePart
                                                                    ? hoverTranslation * indexVariant
                                                                    : 0);
        let transitionRotation: number = initialRotation + (isThisEnginePartSelected
                                                            ? 225
                                                            : mouseHoverOnThisEnginePart
                                                              ? 225
                                                              : 30 * indexVariant);
        let enginePartFaceDivStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
            .setBasics("100%", "100%", 0, 0)
            .setPointerEvents("auto")
            .addRotationY(-90)
            .setBlur(enginePartBlurLevel)
            .setOpacity(enginePartOpacity)
            .addRotationZ(transitionRotation)
            .addTranslationZ(transitionTranslation)
            .addTransition("filter", TRANSITION_TIME_NORMAL)
            .addTransition("opacity", TRANSITION_TIME_NORMAL)
            .addTransition("transform", TRANSITION_TIME_NORMAL);

        return <div key={i} style={enginePartFaceDivStyleObject.getStyle()}>{svg}</div>
    });
};

const mapStateToProps = (store) =>
{
    return {
        appState: store.appState,
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