import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import {CONSOLE_FONT_ORANGE} from "../../utilities/CONSTANTS_COLOR";

type BottomLeftPanelPropsType = {
    bottomLeftPanelShapeModel: Shape2d_Rectangle,
}

const BottomLeftPanel = (props: BottomLeftPanelPropsType) =>
{
    let bottomLeftPanelShapeModel: Shape2d_Rectangle = props.bottomLeftPanelShapeModel;

    console.log(LEVEL2_CONSOLE_PREFIX + bottomLeftPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <g id={bottomLeftPanelShapeModel.getStringId()}>
            <rect x={bottomLeftPanelShapeModel.getTopLeftPoint().getX()}
                  y={bottomLeftPanelShapeModel.getTopLeftPoint().getY()}
                  width={bottomLeftPanelShapeModel.getWidth()}
                  height={bottomLeftPanelShapeModel.getHeight()}
                  fill={CONSOLE_FONT_ORANGE}/>
        </g>);
};

const mapStateToProps = (store) =>
{
    return {
        bottomLeftPanelShapeModel: store.bottomLeftPanelState.bottomLeftPanelShapeModel
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(BottomLeftPanel);