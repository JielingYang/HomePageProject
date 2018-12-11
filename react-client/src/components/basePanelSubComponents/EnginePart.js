import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import StyleObject from "../../classes/StyleObject";
import {COMMON_TYPE} from "../../utilities/CONSTANTS_STRING";
import EnginePartMenu from "./EnginePartMenu";
import BaseModelWithStateAndShape from "../../classes/BaseModelWithStateAndShape";
import type {engineReducerType} from "../../reducers/engineReducer";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import EnginePartActionComponent from "./EnginePartActionComponent";
import EnginePartSvg from "./EnginePartSvg";

type EnginePartPropsType = {
    /* Values from parent */
    enginePartIndex: number,
    /* Values from mapStateToProps() */
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
        <EnginePartSvg enginePartStringId={enginePartStringId}
                       enginePartIndex={props.enginePartIndex}
                       enginePartSize={enginePartModel.getWidth()}
                       isThisEnginePartSelected={isThisEnginePartSelected}
                       mouseHoverOnThisEnginePart={mouseHoverOnThisEnginePart}
                       shouldFocus={shouldFocus}/>
        <EnginePartActionComponent enginePartStringId={enginePartStringId}
                                   enginePartIndex={props.enginePartIndex}
                                   disableMouse={isAnyEnginePartSelected && !isThisEnginePartSelected}/>
        <EnginePartMenu enginePartStringId={enginePartStringId}
                        enginePartIndex={props.enginePartIndex}
                        numberOfEngineParts={enginePartModels.length}
                        enginePartSize={enginePartModel.getWidth()}
                        engineRotationX={actualEngineRotationX}
                        engineRotationY={actualEngineRotationY}
                        mouseHoverOnThisEnginePart={mouseHoverOnThisEnginePart}
                        isThisEnginePartSelected={isThisEnginePartSelected}/>
    </div>;
};

const mapStateToProps = (store) =>
{
    return {
        engineState: store.engineState,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(EnginePart);