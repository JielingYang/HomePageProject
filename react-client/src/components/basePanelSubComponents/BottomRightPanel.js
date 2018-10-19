import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/shapeClasses/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";
import {FOCUS_IN_TIME} from "../../utilities/CONSTANTS_TIME";
import {bottomRightPanelAction_setBottomRightPanelFocusOn} from "../../actionCreators/bottomRightPanelActions";

type BottomRightPanelPropsType = {
    bottomRightPanelShapeModel: Shape2d_Rectangle,
    bottomRightPanelAction_setBottomRightPanelFocusOn: Function,
    bottomRightPanelFocusOn: boolean,
}

const BottomRightPanel = (props: BottomRightPanelPropsType) =>
{
    let bottomRightPanelShapeModel: Shape2d_Rectangle = props.bottomRightPanelShapeModel;
    let bottomRightPanelStyleObject = new StyleObject().setBasics(bottomRightPanelShapeModel.getWidth(), bottomRightPanelShapeModel.getHeight(), bottomRightPanelShapeModel.getTopLeftPoint().getX(), bottomRightPanelShapeModel.getTopLeftPoint().getY())
        .setBlur(props.bottomRightPanelFocusOn
                 ? BLUR_LEVEL.NONE
                 : BLUR_LEVEL.MEDIUM)
        .addTransition("filter", FOCUS_IN_TIME);

    console.log(LEVEL2_CONSOLE_PREFIX + bottomRightPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <div id={bottomRightPanelShapeModel.getStringId()} style={bottomRightPanelStyleObject.getStyle()}
             onMouseEnter={() => props.bottomRightPanelAction_setBottomRightPanelFocusOn(true)}
             onMouseLeave={() => props.bottomRightPanelAction_setBottomRightPanelFocusOn(false)}>
        </div>);
};

const mapStateToProps = (store) =>
{
    return {
        bottomRightPanelShapeModel: store.bottomRightPanelState.bottomRightPanelShapeModel,
        bottomRightPanelFocusOn: store.bottomRightPanelState.bottomRightPanelFocusOn,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
        bottomRightPanelAction_setBottomRightPanelFocusOn: bottomRightPanelAction_setBottomRightPanelFocusOn
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(BottomRightPanel);