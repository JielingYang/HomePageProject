import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import StyleObject from "../../classes/StyleObject";
import {TRANSITION_TIME_SLOW} from "../../utilities/CONSTANTS_TIME";
import {COMMON_TYPE, SVG_IMAGE_NAME} from "../../utilities/CONSTANTS_STRING";
import {BLUR_LEVEL, ENGINE_PART_INDICES} from "../../utilities/CONSTANTS_NUMBER";
import {getEngineMiddleFaceSvg, getEngineFrontFaceSvg, getEngineBackFaceSvg} from "../../utilities/svgIcons";
import EnginePartMenu from "./EnginePartMenu";
import BaseModelWithStateAndShape from "../../classes/BaseModelWithStateAndShape";
import type {engineReducerType} from "../../reducers/engineReducer";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX, LEVEL3_CONSOLE_FONT, LEVEL3_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import EnginePartActionComponent from "./EnginePartActionComponent";

type EnginePartPropsType = {
    /* Values from parent */
    enginePartIndex: number,
    /* Values from mapStateToProps() */
    engineBasicColor: string,
    engineState: engineReducerType
}

const EnginePart = (props: EnginePartPropsType) =>
{
    let enginePartModels: Array<BaseModelWithStateAndShape> = props.engineState.enginePartModels;
    let enginePartModel: BaseModelWithStateAndShape = enginePartModels[props.enginePartIndex];
    let enginePartStringId: string = enginePartModel.getStringId();

    let mouseHoverOnAnyEnginePart: boolean = enginePartModels.some((m: BaseModelWithStateAndShape) => m.getMouseHover());
    let mouseHoverOnThisEnginePart: boolean = enginePartModel.getMouseHover();
    let isAnyEnginePartSelected: boolean = enginePartModels.some((m: BaseModelWithStateAndShape) => m.getIsSelected());
    let isThisEnginePartSelected: boolean = enginePartModel.getIsSelected();
    let shouldFocus: boolean = isThisEnginePartSelected || mouseHoverOnThisEnginePart || (!mouseHoverOnAnyEnginePart && !isAnyEnginePartSelected);
    let actualEngineRotationX: number = props.engineState.engineInitialRotationX + props.engineState.engineRotationX;
    let actualEngineRotationY: number = props.engineState.engineInitialRotationY + props.engineState.engineRotationY;
    let enginePartBlur: BLUR_LEVEL = shouldFocus
                                     ? BLUR_LEVEL.NONE
                                     : BLUR_LEVEL.LIGHT;
    let enginePartOpacity: number = shouldFocus
                                    ? 1
                                    : 0.4;

    let enginePartContainerDivStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics(enginePartModel.getWidth(), enginePartModel.getHeight(), enginePartModel.getX(), enginePartModel.getY())
        .setPointerEvents("none")
        .setBorder(0.5, "solid", "rgba(0,255,255,0.1)")
        .addRotationX(actualEngineRotationX)
        .addRotationY(actualEngineRotationY)
        .addTranslationX(enginePartModel.getZ())
        .setTransformStyle("preserve-3d");

    console.log(LEVEL2_CONSOLE_PREFIX + enginePartStringId, LEVEL2_CONSOLE_FONT);
    return <div id={enginePartStringId} style={enginePartContainerDivStyleObject.getStyle()}>
        {getEnginePartFaces(enginePartStringId, props.enginePartIndex, enginePartModel.getWidth(), mouseHoverOnThisEnginePart, isThisEnginePartSelected, enginePartBlur, enginePartOpacity, props.engineBasicColor)}
        <EnginePartActionComponent enginePartStringId={enginePartStringId}
                                   enginePartIndex={props.enginePartIndex}
                                   disableMouse={isAnyEnginePartSelected && !isThisEnginePartSelected}/>
        <EnginePartMenu enginePartStringId={enginePartStringId}
                        engineIndex={props.enginePartIndex}
                        numberOfEngineParts={enginePartModels.length}
                        enginePartSize={enginePartModel.getWidth()}
                        engineRotationX={actualEngineRotationX}
                        engineRotationY={actualEngineRotationY}
                        mouseHoverOnThisEnginePart={mouseHoverOnThisEnginePart}
                        isThisEnginePartSelected={isThisEnginePartSelected}/>
    </div>;
};

const getEnginePartFaces: Array = (enginePartStringId: string, enginePartIndex: number, enginePartSize: number, mouseHoverOnThisEnginePart: boolean, isThisEnginePartSelected: boolean, enginePartBlurLevel: BLUR_LEVEL, enginePartOpacity: number, engineBasicColor: string) =>
{
    let isFrontPart: boolean = enginePartIndex === ENGINE_PART_INDICES.ENGINE_PART_FRONT;
    let isMiddlePart: boolean = enginePartIndex === ENGINE_PART_INDICES.ENGINE_PART_MIDDLE;
    let isBackPart: boolean = enginePartIndex === ENGINE_PART_INDICES.ENGINE_PART_BACK;
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

    console.log(LEVEL3_CONSOLE_PREFIX + enginePartStringId + SVG_IMAGE_NAME, LEVEL3_CONSOLE_FONT);
    return <span>{svgFaces.map((svg, i) =>
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
    })}</span>;
};

const mapStateToProps = (store) =>
{
    return {
        engineBasicColor: store.appState.engineBasicColor,
        engineState: store.engineState,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(EnginePart);