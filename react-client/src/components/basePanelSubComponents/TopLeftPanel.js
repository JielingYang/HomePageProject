import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import {GOLD} from "../../utilities/CONSTANTS_COLOR";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";
import {FOCUS_IN_TIME} from "../../utilities/CONSTANTS_TIME";
import {topLeftPanelAction_setTopLeftPanelFocusOn} from "../../actionCreators/topLeftPanelActions";

type TopLeftPanelPropsType = {
    topLeftPanelShapeModel: Shape2d_Rectangle,
    topLeftPanelAction_setTopLeftPanelFocusOn: Function,
    topLeftPanelFocusOn: boolean
}

const TopLeftPanel = (props: TopLeftPanelPropsType) =>
{
    let topLeftPanelShapeModel: Shape2d_Rectangle = props.topLeftPanelShapeModel;
    let topLeftPanelStyleObject = new StyleObject().setBasics("absolute", topLeftPanelShapeModel.getWidth(), topLeftPanelShapeModel.getHeight(), topLeftPanelShapeModel.getTopLeftPoint().getX(), topLeftPanelShapeModel.getTopLeftPoint().getY())
        .setBackgroundColor(GOLD)
        .setBlur(props.topLeftPanelFocusOn
                 ? BLUR_LEVEL.NONE
                 : BLUR_LEVEL.HEAVY)
        .addTransition("filter", FOCUS_IN_TIME);

    console.log(LEVEL2_CONSOLE_PREFIX + topLeftPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <div id={topLeftPanelShapeModel.getStringId()} style={topLeftPanelStyleObject.getStyle()}
             onMouseEnter={() => props.topLeftPanelAction_setTopLeftPanelFocusOn(true)}
             onMouseLeave={() => props.topLeftPanelAction_setTopLeftPanelFocusOn(false)}>
        </div>);
};

const mapStateToProps = (store) =>
{
    return {
        topLeftPanelShapeModel: store.topLeftPanelState.topLeftPanelShapeModel,
        topLeftPanelFocusOn: store.topLeftPanelState.topLeftPanelFocusOn,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
        topLeftPanelAction_setTopLeftPanelFocusOn: topLeftPanelAction_setTopLeftPanelFocusOn,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(TopLeftPanel);