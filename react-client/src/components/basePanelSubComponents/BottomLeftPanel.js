import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import {CONSOLE_FONT_ORANGE} from "../../utilities/CONSTANTS_COLOR";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";
import {FOCUS_IN_TIME} from "../../utilities/CONSTANTS_TIME";
import {bottomLeftPanelAction_setBottomLeftPanelFocusOn} from "../../actionCreators/bottomLeftPanelActions";

type BottomLeftPanelPropsType = {
    bottomLeftPanelShapeModel: Shape2d_Rectangle,
    bottomLeftPanelAction_setBottomLeftPanelFocusOn: Function,
    bottomLeftPanelFocusOn: boolean,
}

const BottomLeftPanel = (props: BottomLeftPanelPropsType) =>
{
    let bottomLeftPanelShapeModel: Shape2d_Rectangle = props.bottomLeftPanelShapeModel;
    let bottomLeftPanelStyleObject = new StyleObject().setBasics("absolute", bottomLeftPanelShapeModel.getWidth(), bottomLeftPanelShapeModel.getHeight(), bottomLeftPanelShapeModel.getTopLeftPoint().getX(), bottomLeftPanelShapeModel.getTopLeftPoint().getY())
        .setBackgroundColor(CONSOLE_FONT_ORANGE)
        .setBlur(props.bottomLeftPanelFocusOn
                 ? BLUR_LEVEL.NONE
                 : BLUR_LEVEL.HEAVY)
        .addTransition("filter", FOCUS_IN_TIME);

    console.log(LEVEL2_CONSOLE_PREFIX + bottomLeftPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <div id={bottomLeftPanelShapeModel.getStringId()} style={bottomLeftPanelStyleObject.getStyle()}
             onMouseEnter={() => props.bottomLeftPanelAction_setBottomLeftPanelFocusOn(true)}
             onMouseLeave={() => props.bottomLeftPanelAction_setBottomLeftPanelFocusOn(false)}>
        </div>);
};

const mapStateToProps = (store) =>
{
    return {
        bottomLeftPanelShapeModel: store.bottomLeftPanelState.bottomLeftPanelShapeModel,
        bottomLeftPanelFocusOn: store.bottomLeftPanelState.bottomLeftPanelFocusOn,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
        bottomLeftPanelAction_setBottomLeftPanelFocusOn: bottomLeftPanelAction_setBottomLeftPanelFocusOn
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(BottomLeftPanel);