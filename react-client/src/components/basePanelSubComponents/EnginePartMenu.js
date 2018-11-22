import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import StyleObject from "../../classes/StyleObject";
import {COMMON_TYPE} from "../../utilities/CONSTANTS_STRING";

type EnginePartMenuPropsType = {
    enginePartId: number,
    enginePartSize: number,
}

const EnginePartMenu = (props: EnginePartMenuPropsType) =>
{
    let enginePartMenuBaseDivStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
        .setBasics("30%", "10%", 0, 0)
        .setBackgroundColor("rgb(0,255,255)");

    return <div style={enginePartMenuBaseDivStyleObject.getStyle()}/>;
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