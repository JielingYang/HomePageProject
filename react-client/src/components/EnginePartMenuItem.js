import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import StyleObject from "../classes/StyleObject";
import {COMMON_TYPE} from "../utilities/CONSTANTS_STRING";
import {ENGINE_PART_MENU_ITEM_HEIGHT, ENGINE_PART_MENU_ITEM_WIDTH} from "../utilities/CONSTANTS_NUMBER";
import {TRANSITION_TIME_QUICK, TRANSITION_TIME_SLOW} from "../utilities/CONSTANTS_TIME";
import {LEVEL4_CONSOLE_FONT, LEVEL4_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import BaseModelWithState from "../classes/BaseModelWithState";

type EnginePartMenuItemPropsType = {
    /* Values from parent */
    enginePartIndex: number,
    enginePartMenuItemIndex: number,
    enginePartMenuItemPosition: { left: string, top: string },
    isThisEnginePartSelected: boolean,
    isLastMenuItem: boolean,
    /* Values from mapStateToProps() */
    enginePartMenuItemModel: BaseModelWithState,
}

const EnginePartMenuItem = (props: EnginePartMenuItemPropsType) =>
{
    let enginePartMenuItemModel: BaseModelWithState = props.enginePartMenuItemModel;
    let enginePartMenuItemOpacity: number = props.isThisEnginePartSelected
                                            ? 1
                                            : 0;
    let enginePartMenuItemTransitionBaseDelay: number = props.isThisEnginePartSelected
                                                        ? TRANSITION_TIME_QUICK
                                                        : 0;
    let enginePartMenuItemCommonStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics(ENGINE_PART_MENU_ITEM_WIDTH, ENGINE_PART_MENU_ITEM_HEIGHT, 0, 0)
        .setBorder(1, "solid", "rgba(0,255,255,0.5)")
        .setOpacity(enginePartMenuItemOpacity)
        .setPointerEvents("auto");

    let text: string = "parameter#" + props.enginePartMenuItemIndex;
    let menuItemTransitionDelay: number = enginePartMenuItemTransitionBaseDelay * (props.enginePartMenuItemIndex + 2);
    let enginePartMenuItemStyleObject: StyleObject = enginePartMenuItemCommonStyleObject.clone()
        .setDisplay("flex")
        .setLeft(props.enginePartMenuItemPosition.left)
        .setTop(props.enginePartMenuItemPosition.top)
        .addTransition("opacity", TRANSITION_TIME_SLOW, undefined, menuItemTransitionDelay);

    console.log(LEVEL4_CONSOLE_PREFIX + enginePartMenuItemModel.getStringId(), LEVEL4_CONSOLE_FONT);
    return <div id={enginePartMenuItemModel.getStringId()} style={enginePartMenuItemStyleObject.getStyle()}>
        {props.isLastMenuItem
         ? <div style={{margin: "auto"}}>confirm</div>
         : <div style={{margin: "auto"}}>{text}</div>}
    </div>;
};

const mapStateToProps = (store, props) =>
{
    return {
        enginePartMenuItemModel: store.engineState.enginePartMenuItemModels[props.enginePartIndex][props.enginePartMenuItemIndex]
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(EnginePartMenuItem);