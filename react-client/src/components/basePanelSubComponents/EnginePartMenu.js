import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import StyleObject from "../../classes/StyleObject";
import {COMMON_TYPE, ENGINE_PART_MENU_NAME, UTILITY_STRING} from "../../utilities/CONSTANTS_STRING";
import {DEFAULT_ENGINE_ROTATION_Y_VALUE, ENGINE_PART_MENU_BASE_DIV_POSITION, ENGINE_PART_MENU_BASE_DIV_SIZE, ENGINE_PART_MENU_ITEMS_POSITIONS} from "../../utilities/CONSTANTS_NUMBER";
import {LEVEL3_CONSOLE_FONT, LEVEL3_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import EnginePartMenuItem from "./EnginePartMenuItem";

type EnginePartMenuPropsType = {
    /* Values from parent */
    enginePartStringId: string,
    enginePartIndex: number,
    numberOfEngineParts: number,
    enginePartSize: number,
    engineRotationX: number,
    engineRotationY: number,
    mouseHoverOnThisEnginePart: boolean,
    isThisEnginePartSelected: boolean,
}

const EnginePartMenu = (props: EnginePartMenuPropsType) =>
{
    let menuTranslationZ: number = props.enginePartSize * Math.sin(DEFAULT_ENGINE_ROTATION_Y_VALUE * Math.PI / 180) * (props.numberOfEngineParts - 2 - props.enginePartIndex);
    let menuDisplayValue: string = props.mouseHoverOnThisEnginePart || props.isThisEnginePartSelected
                                   ? "block"
                                   : "none";

    let enginePartMenuBaseDivStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics(ENGINE_PART_MENU_BASE_DIV_SIZE, ENGINE_PART_MENU_BASE_DIV_SIZE, ENGINE_PART_MENU_BASE_DIV_POSITION, ENGINE_PART_MENU_BASE_DIV_POSITION)
        .setDisplay(menuDisplayValue)
        .setBorder(1, "solid", "rgba(255,0,0,0.5)") // For unknown reason, Firefox won't render part menu base div properly without this
        .addRotationY(-props.engineRotationY)
        .addRotationX(-props.engineRotationX)
        .addTranslationZ(menuTranslationZ);

    let partMenuItemsPositions: Array<Array<{ left: string, top: string }>> = ENGINE_PART_MENU_ITEMS_POSITIONS[props.enginePartIndex];
    let numberOfMenuItems: number = partMenuItemsPositions.length;

    console.log(LEVEL3_CONSOLE_PREFIX + props.enginePartStringId + ENGINE_PART_MENU_NAME + " display = " + menuDisplayValue, LEVEL3_CONSOLE_FONT);
    return <div id={props.enginePartStringId + UTILITY_STRING.MENU_BASE_DIV}
                style={enginePartMenuBaseDivStyleObject.getStyle()}>
        {partMenuItemsPositions.map((positionObject: { left: string, top: string }, index: number) =>
            <EnginePartMenuItem key={index}
                                enginePartStringId={props.enginePartStringId}
                                enginePartMenuItemIndex={index}
                                enginePartMenuItemPosition={positionObject}
                                isThisEnginePartSelected={props.isThisEnginePartSelected}
                                isLastMenuItem={numberOfMenuItems === index + 1}/>
        )}
    </div>;
};

const mapStateToProps = () =>
{
    return {};
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(EnginePartMenu);