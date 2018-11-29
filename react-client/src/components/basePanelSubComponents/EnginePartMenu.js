import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import StyleObject from "../../classes/StyleObject";
import {COMMON_TYPE} from "../../utilities/CONSTANTS_STRING";
import {ENGINE_PART_MENU_ITEM_HEIGHT, ENGINE_PART_MENU_ITEM_WIDTH, ENGINE_PART_MENU_ITEMS_POSITIONS} from "../../utilities/CONSTANTS_NUMBER";
import {TRANSITION_TIME_NORMAL, TRANSITION_TIME_QUICK, TRANSITION_TIME_SLOW} from "../../utilities/CONSTANTS_TIME";

type EnginePartMenuPropsType = {
    engineIndex: number,
    isThisEnginePartSelected: boolean,
}

const EnginePartMenu = (props: EnginePartMenuPropsType) =>
{
    let enginePartMenuItemOpacity: number = props.isThisEnginePartSelected
                                            ? 1
                                            : 0;
    let enginePartMenuItemTransitionBaseDelay: number = props.isThisEnginePartSelected
                                                        ? TRANSITION_TIME_NORMAL
                                                        : 0;
    let enginePartMenuItemIndividualTransitionDelay: number = props.isThisEnginePartSelected
                                                              ? TRANSITION_TIME_QUICK
                                                              : 0;
    let enginePartMenuItemCommonStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics(ENGINE_PART_MENU_ITEM_WIDTH, ENGINE_PART_MENU_ITEM_HEIGHT, 0, 0)
        .setBorder(1, "solid", "rgba(0,255,255,0.5)")
        .setOpacity(enginePartMenuItemOpacity);

    return <span>
        {ENGINE_PART_MENU_ITEMS_POSITIONS[props.engineIndex].map((positionObject: { left: string, top: string }, index: number) =>
        {
            let menuItemTransitionDelay: number = enginePartMenuItemTransitionBaseDelay + enginePartMenuItemIndividualTransitionDelay * (index + 1);
            let enginePartMenuItemStyleObject: StyleObject = enginePartMenuItemCommonStyleObject.clone()
                .setLeft(positionObject.left)
                .setTop(positionObject.top)
                .addTransition("opacity", TRANSITION_TIME_SLOW, undefined, menuItemTransitionDelay);
            return <div key={index} style={enginePartMenuItemStyleObject.getStyle()}/>;
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