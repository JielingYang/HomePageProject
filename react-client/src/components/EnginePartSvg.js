import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {COMMON_TYPE, SVG_IMAGE_NAME} from "../utilities/CONSTANTS_STRING";
import StyleObject from "../classes/StyleObject";
import {LEVEL3_CONSOLE_FONT, LEVEL3_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import {BLUR_LEVEL, ENGINE_PART_INDICES} from "../utilities/CONSTANTS_NUMBER";
import {getEngineBackFaceSvg, getEngineFrontFaceSvg, getEngineMiddleFaceSvg} from "../utilities/svgIcons";
import {TRANSITION_TIME_SLOW} from "../utilities/CONSTANTS_TIME";

type EnginePartSvgPropsType = {
    /* Values from parent */
    enginePartStringId: string,
    enginePartIndex: number,
    enginePartSize: number,
    isThisEnginePartSelected: boolean,
    mouseHoverOnThisEnginePart: boolean,
    shouldFocus: boolean,
    /* Values from mapStateToProps() */
    engineBasicColor: string,
}

const EnginePartSvg = (props: EnginePartSvgPropsType) =>
{
    let isFrontPart: boolean = props.enginePartIndex === ENGINE_PART_INDICES.ENGINE_PART_FRONT;
    let isMiddlePart: boolean = props.enginePartIndex === ENGINE_PART_INDICES.ENGINE_PART_MIDDLE;
    let isBackPart: boolean = props.enginePartIndex === ENGINE_PART_INDICES.ENGINE_PART_BACK;
    let initialTranslationZ: number = 0;
    let initialRotationZ: number = 0;
    let individualRotationZ: number = 0;
    let selectTranslationZ: number = 0;
    let hoverTranslationZ: number = 0;
    let enginePartBlur: BLUR_LEVEL = props.shouldFocus
                                     ? BLUR_LEVEL.NONE
                                     : BLUR_LEVEL.LIGHT;
    let enginePartOpacity: number = props.shouldFocus
                                    ? 1
                                    : 0.4;
    let svgFaces: Array = isFrontPart
                          ? getEngineFrontFaceSvg(props.engineBasicColor)
                          : isMiddlePart
                            ? getEngineMiddleFaceSvg(props.engineBasicColor)
                            : isBackPart
                              ? getEngineBackFaceSvg(props.engineBasicColor)
                              : [];
    let numberOfSvg: number = svgFaces.length;
    let svgGap: number = props.enginePartSize / (numberOfSvg + 1);

    if (isFrontPart)
    {
        initialTranslationZ = props.isThisEnginePartSelected
                              ? 0
                              : -props.enginePartSize / 2;
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
        initialTranslationZ = props.enginePartSize / 2;
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
        let transitionTranslationZ: number = initialTranslationZ + (props.isThisEnginePartSelected
                                                                    ? selectTranslationZ * indexVariant
                                                                    : props.mouseHoverOnThisEnginePart
                                                                      ? hoverTranslationZ * indexVariant
                                                                      : 0);
        let transitionRotationZ: number = initialRotationZ + (props.isThisEnginePartSelected
                                                              ? 270
                                                              : props.mouseHoverOnThisEnginePart
                                                                ? 270
                                                                : individualRotationZ);
        let transitionRotationY: number = props.isThisEnginePartSelected
                                          ? 0
                                          : -90;

        let enginePartFaceDivStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
            .setBasics("100%", "100%", 0, 0)
            .addRotationY(transitionRotationY)
            .setBlur(enginePartBlur)
            .setOpacity(enginePartOpacity)
            .addRotationZ(transitionRotationZ)
            .addTranslationZ(transitionTranslationZ)
            .addTransition("filter", TRANSITION_TIME_SLOW)
            .addTransition("opacity", TRANSITION_TIME_SLOW)
            .addTransition("transform", TRANSITION_TIME_SLOW);

        console.log(LEVEL3_CONSOLE_PREFIX + props.enginePartStringId + SVG_IMAGE_NAME + i, LEVEL3_CONSOLE_FONT);
        return <div key={i} style={enginePartFaceDivStyleObject.getStyle()}>{svg}</div>
    });
};

const mapStateToProps = (store) =>
{
    return {
        engineBasicColor: store.appState.engineBasicColor,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(EnginePartSvg);