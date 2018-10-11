import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import {CONSOLE_FONT_MINT} from "../../utilities/CONSTANTS_COLOR";

type BottomRightPanelPropsType = {
    bottomRightPanelShapeModel: Shape2d_Rectangle,
}

const BottomRightPanel = (props: BottomRightPanelPropsType) =>
{
    let bottomRightPanelShapeModel: Shape2d_Rectangle = props.bottomRightPanelShapeModel;

    console.log(LEVEL2_CONSOLE_PREFIX + bottomRightPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <g id={bottomRightPanelShapeModel.getStringId()}>
            <rect x={bottomRightPanelShapeModel.getTopLeftPoint().getX()}
                  y={bottomRightPanelShapeModel.getTopLeftPoint().getY()}
                  width={bottomRightPanelShapeModel.getWidth()}
                  height={bottomRightPanelShapeModel.getHeight()}
                  fill={CONSOLE_FONT_MINT}/>
        </g>);
};

const mapStateToProps = (store) =>
{
    return {
        bottomRightPanelShapeModel: store.bottomRightPanelState.bottomRightPanelShapeModel
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(BottomRightPanel);