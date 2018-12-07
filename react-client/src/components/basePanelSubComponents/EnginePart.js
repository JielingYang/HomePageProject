import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import StyleObject from "../../classes/StyleObject";
import {TRANSITION_TIME_SLOW} from "../../utilities/CONSTANTS_TIME";
import {COMMON_TYPE, ENGINE_PART_MENU_NAME, SVG_IMAGE_NAME, UTILITY_STRING} from "../../utilities/CONSTANTS_STRING";
import {BLUR_LEVEL, DEFAULT_ENGINE_ROTATION_Y_VALUE, ENGINE_PART_INDICES, ENGINE_PART_MENU_BASE_DIV_POSITION, ENGINE_PART_MENU_BASE_DIV_SIZE} from "../../utilities/CONSTANTS_NUMBER";
import {getEngineMiddleFaceSvg, getEngineFrontFaceSvg, getEngineBackFaceSvg} from "../../utilities/svgIcons";
import EnginePartMenu from "./EnginePartMenu";
import BaseModelWithStateAndShape from "../../classes/BaseModelWithStateAndShape";
import type {engineReducerType} from "../../reducers/engineReducer";
import {engineAction_enginePartMouseClicks, engineAction_enginePartMouseEnters, engineAction_enginePartMouseLeaves} from "../../actionCreators/engineActions";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX, LEVEL3_CONSOLE_FONT, LEVEL3_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";

type EnginePartPropsType = {
    /* Values from parent */
    enginePartIndex: number,
    /* Values from mapStateToProps() */
    engineBasicColor: string,
    engineState: engineReducerType,
    /* Functions from matchDispatchToProps() */
    engineAction_enginePartMouseClicks: Function,
    engineAction_enginePartMouseEnters: Function,
    engineAction_enginePartMouseLeaves: Function,
}

const EnginePart = (props: EnginePartPropsType) =>
{
    let enginePartModels: Array<BaseModelWithStateAndShape> = props.engineState.enginePartModels;
    let enginePartModel: BaseModelWithStateAndShape = enginePartModels[props.enginePartIndex];
    let enginePartStringId: string = enginePartModel.getStringId();

    let mouseHoverOnThisEnginePart: boolean = enginePartModel.getMouseHover();
    let isAnyEnginePartSelected: boolean = enginePartModels.some((m: BaseModelWithStateAndShape) => m.getIsSelected());
    let isThisEnginePartSelected: boolean = enginePartModel.getIsSelected();
    let shouldFocus: boolean = isThisEnginePartSelected || mouseHoverOnThisEnginePart;
    let disableMouse: boolean = isAnyEnginePartSelected && !isThisEnginePartSelected;
    let actualEngineRotationX: number = props.engineState.engineInitialRotationX + props.engineState.engineRotationX;
    let actualEngineRotationY: number = props.engineState.engineInitialRotationY + props.engineState.engineRotationY;
    let enginePartBlur: BLUR_LEVEL = shouldFocus
                                     ? BLUR_LEVEL.NONE
                                     : BLUR_LEVEL.LIGHT;
    let enginePartOpacity: number = shouldFocus
                                    ? 1
                                    : 0.4;
    let enginePartPointerEvents: string = disableMouse
                                          ? "none"
                                          : "auto";

    let enginePartContainerDivStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics(enginePartModel.getWidth(), enginePartModel.getHeight(), enginePartModel.getX(), enginePartModel.getY())
        .setPointerEvents("none")
        .setBorder(0.5, "solid", "rgba(0,255,255,0.1)")
        .addRotationX(actualEngineRotationX)
        .addRotationY(actualEngineRotationY)
        .addTranslationX(enginePartModel.getZ())
        .setTransformStyle("preserve-3d");
    let enginePartActionDivStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics("100%", "100%", 0, 0)
        .setPointerEvents(enginePartPointerEvents);

    console.log(LEVEL2_CONSOLE_PREFIX + enginePartStringId, LEVEL2_CONSOLE_FONT);
    return <div id={enginePartStringId} style={enginePartContainerDivStyleObject.getStyle()}>
        {getEnginePartFaces(enginePartStringId, props.enginePartIndex, enginePartModel.getWidth(), mouseHoverOnThisEnginePart, isThisEnginePartSelected, enginePartBlur, enginePartOpacity, props.engineBasicColor)}
        <div id={enginePartStringId + UTILITY_STRING.ACTION_DIV} style={enginePartActionDivStyleObject.getStyle()}
             onClick={() => props.engineAction_enginePartMouseClicks(props.enginePartIndex)}
             onMouseEnter={() => props.engineAction_enginePartMouseEnters(props.enginePartIndex)}
             onMouseLeave={() => props.engineAction_enginePartMouseLeaves(props.enginePartIndex)}/>
        {getEnginePartMenus(enginePartStringId, props.enginePartIndex, enginePartModels.length, enginePartModel.getWidth(), actualEngineRotationX, actualEngineRotationY, mouseHoverOnThisEnginePart, isThisEnginePartSelected)}
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

        console.log(LEVEL3_CONSOLE_PREFIX + enginePartStringId + SVG_IMAGE_NAME + i, LEVEL3_CONSOLE_FONT);
        return <div key={i} style={enginePartFaceDivStyleObject.getStyle()}>{svg}</div>
    });
};

const getEnginePartMenus: Array = (enginePartStringId: string, engineIndex: number, numberOfEngineParts: number, enginePartSize: number, engineRotationX: number, engineRotationY: number, mouseHoverOnThisEnginePart: boolean, isThisEnginePartSelected: boolean) =>
{
    let menuTranslationZ: number = enginePartSize * Math.sin(DEFAULT_ENGINE_ROTATION_Y_VALUE * Math.PI / 180) * (numberOfEngineParts - 2 - engineIndex);
    let menuDisplayValue: string = mouseHoverOnThisEnginePart || isThisEnginePartSelected
                                   ? "block"
                                   : "none";

    let enginePartMenuBaseDivStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics(ENGINE_PART_MENU_BASE_DIV_SIZE, ENGINE_PART_MENU_BASE_DIV_SIZE, ENGINE_PART_MENU_BASE_DIV_POSITION, ENGINE_PART_MENU_BASE_DIV_POSITION)
        .setDisplay(menuDisplayValue)
        .setBorder(1, "solid", "rgba(0,0,0,0)") // For unknown reason, Firefox won't render part menu base div properly without this
        .addRotationY(-engineRotationY)
        .addRotationX(-engineRotationX)
        .addTranslationZ(menuTranslationZ);

    console.log(LEVEL3_CONSOLE_PREFIX + enginePartStringId + ENGINE_PART_MENU_NAME + " display = " + menuDisplayValue, LEVEL3_CONSOLE_FONT);
    return <div id={enginePartStringId + UTILITY_STRING.MENU_BASE_DIV}
                style={enginePartMenuBaseDivStyleObject.getStyle()}>
        <EnginePartMenu enginePartStringId={enginePartStringId} engineIndex={engineIndex}
                        isThisEnginePartSelected={isThisEnginePartSelected}/>
    </div>
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
    return bindActionCreators({
        engineAction_enginePartMouseClicks: engineAction_enginePartMouseClicks,
        engineAction_enginePartMouseEnters: engineAction_enginePartMouseEnters,
        engineAction_enginePartMouseLeaves: engineAction_enginePartMouseLeaves,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(EnginePart);