import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import StyleObject from "../../classes/StyleObject";
import type {bottomRightPanelStateType} from "../../reducers/bottomRightPanelReducer";
import {TRANSITION_TIME_NORMAL} from "../../utilities/CONSTANTS_TIME";
import {COMMON_TYPE} from "../../utilities/CONSTANTS_STRING";
import {bottomRightPanelAction_requestToSetMouseHoverOnEnginePart, bottomRightPanelAction_requestToToggleIsSelectedOnEnginePart} from "../../actionCreators/bottomRightPanelActions";
import EngineStateModel from "../../classes/StateModelClasses/EngineStateModel";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";
import type {basePanelStateType} from "../../reducers/basePanelReducer";
import {getEngineCoreFaceSvg, getEngineFrontFaceSvg} from "../../utilities/svgIcons";
import {isEven} from "../../utilities/UTILITIES";
import type {appStateType} from "../../reducers/appReducer";

type EnginePropsType = {
    appState: appStateType,
    basePanelState: basePanelStateType,
    bottomRightPanelState: bottomRightPanelStateType,
    stateModel: EngineStateModel,
    engineRotationX: number,
    engineRotationY: number,
    mouseHoverOnAnyEnginePart: boolean,

    bottomRightPanelAction_requestToSetMouseHoverOnEnginePart: Function,
    bottomRightPanelAction_requestToToggleIsSelectedOnEnginePart: Function,
}

const Engine = (props: EnginePropsType) =>
{
    let stateModel: EngineStateModel = props.stateModel;
    let basePanelState: basePanelStateType = props.basePanelState;
    let engineBasicColor: string = props.appState.engineBasicColor;
    let engineSize = props.bottomRightPanelState.engineSize;
    let engineInitialMiddlePosition: string = "calc(50% - " + engineSize / 2 + "px)";
    let mouseHoverOnThisEnginePart: boolean = stateModel.getMouseHover();
    let isThisEnginePartSelected: boolean = stateModel.getIsSelected();
    let engineSideFacesDefaultTranslation: number = engineSize * 0.5;
    let engineFrontFacesDefaultRotation: number = 180;
    let basePanelRotationX: number = basePanelState.basePanelRotationX;
    let basePanelRotationY: number = basePanelState.basePanelRotationY;
    let numberOfEngineSides: number = props.bottomRightPanelState.numberOfEngineSides;
    let numberOfEngineSideFaces: number = props.bottomRightPanelState.numberOfEngineSideFaces;
    let stfRatio: number = numberOfEngineSides / numberOfEngineSideFaces;
    let engineSideFacesExteriorAngle: number = props.bottomRightPanelState.engineSideFacesExteriorAngle;
    let engineSideFacesStyleObjects: Array<StyleObject> = [];
    let frontFaceSvg: Array = getEngineFrontFaceSvg(engineBasicColor);
    let coreFaceSvg: Array = getEngineCoreFaceSvg(engineBasicColor);
    let numberOfCoreFaceSvg: number = coreFaceSvg.length;
    let frontFaceHoverTranslation: number = engineSize * 0.13;
    let frontFaceSelectTranslation: number = engineSize * 0.2;
    let coreFaceDefaultTranslation: number = frontFaceSelectTranslation * 0.8;
    let coreFaceSelectTranslation: number = frontFaceSelectTranslation * 1.2;
    let engineBlurLevel: BLUR_LEVEL = props.mouseHoverOnAnyEnginePart && !mouseHoverOnThisEnginePart
                                          ? BLUR_LEVEL.LIGHT
                                          : BLUR_LEVEL.NONE;
    let engineOpacity: BLUR_LEVEL = props.mouseHoverOnAnyEnginePart && !mouseHoverOnThisEnginePart
                                        ? 0.5
                                        : 1;

    let engineContainerDivStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics(engineSize, engineSize, engineInitialMiddlePosition, engineInitialMiddlePosition)
        .setPointerEvents("none")
        .addRotationX(props.engineRotationX + basePanelRotationX)
        .addRotationY(props.engineRotationY + basePanelRotationY)
        .addTranslationX(stateModel.getPosition())
        .setTransformStyle("preserve-3d");
    let engineFaceDivCommonStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics("100%", props.bottomRightPanelState.engineSideFaceHeightPercentage, 0, props.bottomRightPanelState.engineSideFaceTopPercentage)
        .setPointerEvents("auto")
        .setBlur(engineBlurLevel)
        .setOpacity(engineOpacity)
        .addTransition("filter", TRANSITION_TIME_NORMAL)
        .addTransition("opacity", TRANSITION_TIME_NORMAL);
    let engineFrontFaceDivStyleObject: StyleObject = engineFaceDivCommonStyleObject.clone()
        .setHeight("100%")
        .setTop(0)
        .addRotationY(-90)
        .addRotationZ(engineFrontFacesDefaultRotation)
        .addTranslationZ(engineSideFacesDefaultTranslation)
        .addTransition("transform", TRANSITION_TIME_NORMAL);
    let engineCoreFaceDivStyleObject: StyleObject = engineFaceDivCommonStyleObject.clone()
        .setHeight("100%")
        .setTop(0)
        .addRotationY(-90)
        .addTransition("transform", TRANSITION_TIME_NORMAL);
    for (let i = 0; i < numberOfEngineSideFaces; i++)
    {
        engineSideFacesStyleObjects.push(engineFaceDivCommonStyleObject.clone()
            .addRotationX(engineSideFacesExteriorAngle * i * stfRatio)
            .addTranslationZ(engineSideFacesDefaultTranslation));
    }

    let engineSideFaces: Array = engineSideFacesStyleObjects.map((so: StyleObject, i: number) =>
    {
        return <div key={i} style={so.getStyle()}>
            <svg width="100%" height="100%">
                <rect x="10%" y="10%" width="80%" height="80%" stroke="rgba(255,255,255,1)" strokeWidth="1"
                      fill="none"/>
                <circle cx="50%" cy="50%" r="10%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none"/>
            </svg>
        </div>
    });

    let engineFrontFace: Array = frontFaceSvg.map((svg, i) =>
    {
        let tz: number = isThisEnginePartSelected
                         ? frontFaceSelectTranslation * (i + 1)
                         : mouseHoverOnThisEnginePart
                           ? frontFaceHoverTranslation * (i + 1)
                           : 0;
        let rz: number = isThisEnginePartSelected
                         ? 90
                         : mouseHoverOnThisEnginePart
                           ? 30
                           : 0;
        let so = engineFrontFaceDivStyleObject.clone()
            .addRotationZ(rz)
            .addTranslationZ(tz);
        return <div key={i} style={so.getStyle()}>{svg}</div>
    });

    let engineCoreFace: Array = coreFaceSvg.map((svg, i) =>
    {
        let tz: number = (isThisEnginePartSelected
                          ? coreFaceSelectTranslation
                          : coreFaceDefaultTranslation) * (numberOfCoreFaceSvg / 2 - i);
        let rz: number = isThisEnginePartSelected
                         ? 180
                         : mouseHoverOnThisEnginePart
                           ? 90
                           : 0;
        let s: number = isThisEnginePartSelected
                        ? 1.3
                        : 1;
        tz = isEven(i)
             ? -tz
             : tz;
        let so: StyleObject = engineCoreFaceDivStyleObject.clone()
            .addScale(s, s)
            .addRotationZ(rz)
            .addTranslationZ(tz);
        return <div key={i} style={so.getStyle()}>{svg}</div>
    });

    return <div id={stateModel.getStringId()} style={engineContainerDivStyleObject.getStyle()}>
                {/*onClick={() => props.bottomRightPanelAction_requestToToggleIsSelectedOnEnginePart(props.engineIndex)}*/}
                {/*onMouseEnter={() => props.bottomRightPanelAction_requestToSetMouseHoverOnEnginePart(props.engineIndex, true)}*/}
                {/*onMouseLeave={() => props.bottomRightPanelAction_requestToSetMouseHoverOnEnginePart(props.engineIndex, false)}>*/}
        {engineSideFaces}
        {engineFrontFace}
        {engineCoreFace}
    </div>;
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

export default connect(mapStateToProps, matchDispatchToProps)(Engine);