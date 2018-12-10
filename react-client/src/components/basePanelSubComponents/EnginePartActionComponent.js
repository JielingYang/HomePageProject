import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {COMMON_TYPE, ENGINE_PART_ACTION_DIV_NAME, UTILITY_STRING} from "../../utilities/CONSTANTS_STRING";
import StyleObject from "../../classes/StyleObject";
import {engineAction_enginePartMouseClicks, engineAction_enginePartMouseEnters, engineAction_enginePartMouseLeaves} from "../../actionCreators/engineActions";
import {LEVEL3_CONSOLE_FONT, LEVEL3_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";

type EnginePartActionComponentPropsType = {
    /* Values from parent */
    enginePartStringId: string,
    enginePartIndex: number,
    disableMouse: boolean,
    /* Functions from matchDispatchToProps() */
    engineAction_enginePartMouseClicks: Function,
    engineAction_enginePartMouseEnters: Function,
    engineAction_enginePartMouseLeaves: Function,
}

const EnginePartActionComponent = (props: EnginePartActionComponentPropsType) =>
{
    let enginePartActionDivStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics("100%", "100%", 0, 0)
        .setPointerEvents(props.disableMouse
                          ? "none"
                          : "auto");

    console.log(LEVEL3_CONSOLE_PREFIX + props.enginePartStringId + ENGINE_PART_ACTION_DIV_NAME, LEVEL3_CONSOLE_FONT);
    return <div id={props.enginePartStringId + UTILITY_STRING.ACTION_DIV}
                style={enginePartActionDivStyleObject.getStyle()}
                onClick={() => props.engineAction_enginePartMouseClicks(props.enginePartIndex)}
                onMouseEnter={() => props.engineAction_enginePartMouseEnters(props.enginePartIndex)}
                onMouseLeave={() => props.engineAction_enginePartMouseLeaves(props.enginePartIndex)}/>
};

const mapStateToProps = () =>
{
    return {};
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
        engineAction_enginePartMouseClicks: engineAction_enginePartMouseClicks,
        engineAction_enginePartMouseEnters: engineAction_enginePartMouseEnters,
        engineAction_enginePartMouseLeaves: engineAction_enginePartMouseLeaves
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(EnginePartActionComponent);