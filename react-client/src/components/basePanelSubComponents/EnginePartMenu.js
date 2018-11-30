import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import StyleObject from "../../classes/StyleObject";
import {COMMON_TYPE} from "../../utilities/CONSTANTS_STRING";
import {ENGINE_PART_MENU_ITEM_HEIGHT, ENGINE_PART_MENU_ITEM_WIDTH, ENGINE_PART_MENU_ITEMS_POSITIONS} from "../../utilities/CONSTANTS_NUMBER";
import {TRANSITION_TIME_QUICK, TRANSITION_TIME_SLOW} from "../../utilities/CONSTANTS_TIME";

type EnginePartMenuPropsType = {
    engineIndex: number,
    isThisEnginePartSelected: boolean,
}

const EnginePartMenu = (props: EnginePartMenuPropsType) =>
{
    let partMenuItemsPositions: Array<Array<{ left: string, top: string }>> = ENGINE_PART_MENU_ITEMS_POSITIONS[props.engineIndex];
    let numberOfMenuItems: number = partMenuItemsPositions.length;
    let enginePartMenuItemOpacity: number = props.isThisEnginePartSelected
                                            ? 1
                                            : 0;
    let enginePartMenuItemTransitionBaseDelay: number = props.isThisEnginePartSelected
                                                        ? TRANSITION_TIME_QUICK
                                                        : 0;
    let enginePartMenuItemCommonStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics(ENGINE_PART_MENU_ITEM_WIDTH, ENGINE_PART_MENU_ITEM_HEIGHT, 0, 0)
        .setDisplay("flex")
        // .setBorder(1, "solid", "rgba(0,255,255,0.5)")
        .setOpacity(enginePartMenuItemOpacity);

    return <span>
        {partMenuItemsPositions.map((positionObject: { left: string, top: string }, index: number) =>
        {
            let text: string = "parameter#" + index;
            let isLastItem = numberOfMenuItems === index + 1;
            let menuItemTransitionDelay: number = enginePartMenuItemTransitionBaseDelay * (index + 2);
            let enginePartMenuItemStyleObject: StyleObject = enginePartMenuItemCommonStyleObject.clone()
                .setLeft(positionObject.left)
                .setTop(positionObject.top)
                .addTransition("opacity", TRANSITION_TIME_SLOW, undefined, menuItemTransitionDelay);
            return <div key={index} style={enginePartMenuItemStyleObject.getStyle()}>
                {!isLastItem
                 ? <div style={{margin: "auto"}}>{text}</div>
                 : null}

                {isLastItem
                 ? <div style={{margin: "auto"}}>ok</div>
                 : null}
                {isLastItem
                 ? <div style={{margin: "auto"}}>cancel</div>
                 : null}
            </div>;
        })}
    </span>;
};

const mapStateToProps = (store) =>
{
    return {};
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(EnginePartMenu);