import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import StyleObject from "../../classes/StyleObject";
import {COMMON_TYPE, ENGINE_PART_MENU_ITEM_NAME} from "../../utilities/CONSTANTS_STRING";
import {ENGINE_PART_MENU_ITEM_HEIGHT, ENGINE_PART_MENU_ITEM_WIDTH} from "../../utilities/CONSTANTS_NUMBER";
import {TRANSITION_TIME_QUICK, TRANSITION_TIME_SLOW} from "../../utilities/CONSTANTS_TIME";
import {LEVEL4_CONSOLE_FONT, LEVEL4_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";

type EnginePartMenuItemPropsType = {
    /* Values from parent */
    enginePartStringId: string,
    enginePartMenuItemIndex: number,
    enginePartMenuItemPosition: { left: string, top: string },
    isThisEnginePartSelected: boolean,
    isLastMenuItem: boolean,
}

const EnginePartMenuItem = (props: EnginePartMenuItemPropsType) =>
{
    let enginePartMenuItemOpacity: number = props.isThisEnginePartSelected
                                            ? 1
                                            : 0;
    let enginePartMenuItemTransitionBaseDelay: number = props.isThisEnginePartSelected
                                                        ? TRANSITION_TIME_QUICK
                                                        : 0;
    let enginePartMenuItemCommonStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics(ENGINE_PART_MENU_ITEM_WIDTH, ENGINE_PART_MENU_ITEM_HEIGHT, 0, 0)
        .setBorder(1, "solid", "rgba(0,255,255,0.5)")
        .setOpacity(enginePartMenuItemOpacity);

    let text: string = "parameter#" + props.enginePartMenuItemIndex;
    let menuItemTransitionDelay: number = enginePartMenuItemTransitionBaseDelay * (props.enginePartMenuItemIndex + 2);
    let enginePartMenuItemStyleObject: StyleObject = enginePartMenuItemCommonStyleObject.clone()
        .setDisplay("flex")
        .setLeft(props.enginePartMenuItemPosition.left)
        .setTop(props.enginePartMenuItemPosition.top)
        .addTransition("opacity", TRANSITION_TIME_SLOW, undefined, menuItemTransitionDelay);

    console.log(LEVEL4_CONSOLE_PREFIX + props.enginePartStringId + ENGINE_PART_MENU_ITEM_NAME + props.enginePartMenuItemIndex, LEVEL4_CONSOLE_FONT);
    return <div style={enginePartMenuItemStyleObject.getStyle()}>
        {props.isLastMenuItem
         ? <div style={{margin: "auto"}}>confirm</div>
         : <div style={{margin: "auto"}}>{text}</div>}
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

export default connect(mapStateToProps, matchDispatchToProps)(EnginePartMenuItem);