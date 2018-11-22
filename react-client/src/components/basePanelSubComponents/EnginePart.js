import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import StyleObject from "../../classes/StyleObject";
import type {bottomRightPanelStateType} from "../../reducers/bottomRightPanelReducer";
import {TRANSITION_TIME_NORMAL, TRANSITION_TIME_SLOW} from "../../utilities/CONSTANTS_TIME";
import {COMMON_TYPE, ENGINE_PART_IDS, UTILITY_STRING} from "../../utilities/CONSTANTS_STRING";
import {bottomRightPanelAction_requestToSetMouseHoverOnEnginePart, bottomRightPanelAction_requestToToggleIsSelectedOnEnginePart} from "../../actionCreators/bottomRightPanelActions";
import EnginePartStateModel from "../../classes/StateModelClasses/EnginePartStateModel";
import {BLUR_LEVEL, DEFAULT_ENGINE_ROTATION_Y_VALUE, INDEX} from "../../utilities/CONSTANTS_NUMBER";
import type {basePanelStateType} from "../../reducers/basePanelReducer";
import {getEngineMiddleFaceSvg, getEngineFrontFaceSvg, getEngineBackFaceSvg} from "../../utilities/svgIcons";
import type {appStateType} from "../../reducers/appReducer";
import EnginePartMenu from "./EnginePartMenu";

type EnginePartPropsType = {
    appState: appStateType,
    basePanelState: basePanelStateType,
    bottomRightPanelState: bottomRightPanelStateType,

    engineIndex: number,
    engineRotationX: number,
    engineRotationY: number,
    mouseHoverOnAnyEnginePart: boolean,
    isAnyEnginePartSelected: boolean,

    bottomRightPanelAction_requestToSetMouseHoverOnEnginePart: Function,
    bottomRightPanelAction_requestToToggleIsSelectedOnEnginePart: Function,
}

const EnginePart = (props: EnginePartPropsType) =>
{
    let enginePartStateModels: Array<EnginePartStateModel> = props.bottomRightPanelState.enginePartStateModels;
    let numberOfEngineParts: number = enginePartStateModels.length;
    let stateModel: EnginePartStateModel = enginePartStateModels[props.engineIndex];
    let basePanelState: basePanelStateType = props.basePanelState;
    let engineBasicColor: string = props.appState.engineBasicColor;
    let enginePartSize = props.bottomRightPanelState.enginePartSize;
    let basePanelRotationX: number = basePanelState.basePanelRotationX;
    let basePanelRotationY: number = basePanelState.basePanelRotationY;

    let enginePartInitialMiddlePosition: string = "calc(50% - " + enginePartSize / 2 + "px)";
    let mouseHoverOnThisEnginePart: boolean = stateModel.getMouseHover();
    let isThisEnginePartSelected: boolean = stateModel.getIsSelected();
    let enginePartId: string = stateModel.getStringId();
    let enginePartBlurLevel: BLUR_LEVEL = props.mouseHoverOnAnyEnginePart && !mouseHoverOnThisEnginePart
                                          ? BLUR_LEVEL.LIGHT
                                          : BLUR_LEVEL.NONE;
    let enginePartOpacity: number = props.mouseHoverOnAnyEnginePart && !mouseHoverOnThisEnginePart
                                    ? 0.4
                                    : 1;

    let enginePartContainerDivStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics(enginePartSize, enginePartSize, enginePartInitialMiddlePosition, enginePartInitialMiddlePosition)
        .setPointerEvents("none")
        .addRotationX(props.engineRotationX + basePanelRotationX)
        .addRotationY(props.engineRotationY + basePanelRotationY)
        .addTranslationX(stateModel.getPosition())
        .setTransformStyle("preserve-3d");
    let enginePartActionDivStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics("100%", "100%", 0, 0)
        .setPointerEvents("auto");

    let enginePartFaces: Array = getEnginePartFaces(enginePartId, enginePartSize, mouseHoverOnThisEnginePart, isThisEnginePartSelected, enginePartBlurLevel, enginePartOpacity, engineBasicColor);

    return <div id={enginePartId} style={enginePartContainerDivStyleObject.getStyle()}>
        {enginePartFaces}
        <div id={enginePartId + UTILITY_STRING.ACTION_DIV} style={enginePartActionDivStyleObject.getStyle()}
             onClick={() => props.bottomRightPanelAction_requestToToggleIsSelectedOnEnginePart(props.engineIndex, isThisEnginePartSelected || !props.isAnyEnginePartSelected)}
             onMouseEnter={() => props.bottomRightPanelAction_requestToSetMouseHoverOnEnginePart(props.engineIndex, !props.isAnyEnginePartSelected, true)}
             onMouseLeave={() => props.bottomRightPanelAction_requestToSetMouseHoverOnEnginePart(props.engineIndex, !props.isAnyEnginePartSelected, false)}/>
        {getEnginePartMenus(enginePartId, props.engineIndex, numberOfEngineParts, enginePartSize, props.engineRotationX + basePanelRotationX, props.engineRotationY + basePanelRotationY, mouseHoverOnThisEnginePart, isThisEnginePartSelected)}
    </div>;
};

const getEnginePartFaces: Array = (enginePartId: string, enginePartSize: number, mouseHoverOnThisEnginePart: boolean, isThisEnginePartSelected: boolean, enginePartBlurLevel: BLUR_LEVEL, enginePartOpacity: number, engineBasicColor: string) =>
{
    let isFrontPart: boolean = enginePartId === ENGINE_PART_IDS[INDEX.ENGINE_PART_FRONT];
    let isMiddlePart: boolean = enginePartId === ENGINE_PART_IDS[INDEX.ENGINE_PART_MIDDLE];
    let isBackPart: boolean = enginePartId === ENGINE_PART_IDS[INDEX.ENGINE_PART_BACK];
    let initialTranslationZ: number = 0;
    let initialRotationZ: number = 0;
    let individualRotationZ: number = 0;
    let selectTranslationZ: number = 0;
    let hoverTranslationZ: number = 0;
    let svgFaces: Array = isFrontPart
                          ? getEngineFrontFaceSvg(engineBasicColor)
                          : isMiddlePart
                            ? getEngineMiddleFaceSvg(engineBasicColor)
                            : isBackPart
                              ? getEngineBackFaceSvg(engineBasicColor)
                              : [];
    let numberOfSvg: number = svgFaces.length;
    let svgGap: number = enginePartSize / (numberOfSvg + 1);

    if (isFrontPart)
    {
        initialTranslationZ = isThisEnginePartSelected
                              ? 0
                              : -enginePartSize / 2;
        initialRotationZ = 180;
        hoverTranslationZ = svgGap / 2;
        selectTranslationZ = svgGap;
    }
    else if (isMiddlePart)
    {
        initialRotationZ = 0;
        hoverTranslationZ = 0;
        selectTranslationZ = svgGap / 2;
    }
    else if (isBackPart)
    {
        initialTranslationZ = enginePartSize / 2;
        hoverTranslationZ = -svgGap / 2;
        selectTranslationZ = -svgGap;
    }

    return svgFaces.map((svg, i) =>
    {
        let indexVariant: number = i + 1;
        if (isMiddlePart)
        {
            indexVariant = i - (numberOfSvg - 1) / 2;
            initialTranslationZ = svgGap * indexVariant;
            individualRotationZ = 180 * (i - 1);
        }
        let transitionTranslationZ: number = initialTranslationZ + (isThisEnginePartSelected
                                                                    ? selectTranslationZ * indexVariant
                                                                    : mouseHoverOnThisEnginePart
                                                                      ? hoverTranslationZ * indexVariant
                                                                      : 0);
        let transitionRotationZ: number = initialRotationZ + (isThisEnginePartSelected
                                                              ? 270
                                                              : mouseHoverOnThisEnginePart
                                                                ? 270
                                                                : individualRotationZ);
        let transitionRotationY: number = isThisEnginePartSelected
                                          ? 0
                                          : -90;

        let enginePartFaceDivStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
            .setBasics("100%", "100%", 0, 0)
            .addRotationY(transitionRotationY)
            .setBlur(enginePartBlurLevel)
            .setOpacity(enginePartOpacity)
            .addRotationZ(transitionRotationZ)
            .addTranslationZ(transitionTranslationZ)
            .addTransition("filter", TRANSITION_TIME_SLOW)
            .addTransition("opacity", TRANSITION_TIME_SLOW)
            .addTransition("transform", TRANSITION_TIME_SLOW);

        return <div key={i} style={enginePartFaceDivStyleObject.getStyle()}>{svg}</div>
    });
};

const getEnginePartMenus: Array = (enginePartId: string, engineIndex: number, numberOfEngineParts: number, enginePartSize: number, engineRotationX: number, engineRotationY: number, mouseHoverOnThisEnginePart: boolean, isThisEnginePartSelected: boolean) =>
{
    let menuTranslationZ: number = enginePartSize * Math.sin(DEFAULT_ENGINE_ROTATION_Y_VALUE * Math.PI / 180) * (numberOfEngineParts - 1 - engineIndex);
    let menuOpacity: number = isThisEnginePartSelected
                              ? 1
                              : 0;
    let menuDisplayValue: string = mouseHoverOnThisEnginePart
                                   ? "block"
                                   : "none";
    let menuPointerEvents: string = isThisEnginePartSelected
                                    ? "auto"
                                    : "none";

    let enginePartMenuBaseDivStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics("200%", "200%", "-100%", "-100%")
        .setDisplay(menuDisplayValue)
        // .setPointerEvents(menuPointerEvents)
        .setBorder(1, "solid", "rgb(0,255,255)")
        .addRotationY(-engineRotationY)
        .addRotationX(-engineRotationX)
        .addTranslationZ(menuTranslationZ)
        .setOpacity(menuOpacity)
        .addTransition("opacity", TRANSITION_TIME_NORMAL);

    return <div id={enginePartId + UTILITY_STRING.MENU_BASE_DIV} style={enginePartMenuBaseDivStyleObject.getStyle()}>
        <EnginePartMenu engineIndex={enginePartId} enginePartSize={enginePartSize}/>
    </div>
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