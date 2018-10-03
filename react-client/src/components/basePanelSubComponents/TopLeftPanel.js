import React from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import {GOLD} from "../../utilities/CONSTANTS_COLOR";

type TopLeftPanelPropsType = {
    topLeftPanelShapeModel: Shape2d_Rectangle,
}

const TopLeftPanel = (props: TopLeftPanelPropsType) =>
{
    let topLeftPanelShapeModel: Shape2d_Rectangle = props.topLeftPanelShapeModel;

    console.log(LEVEL2_CONSOLE_PREFIX + topLeftPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <g id={topLeftPanelShapeModel.getStringId()}>
            <rect x={topLeftPanelShapeModel.getTopLeftPoint().getX()}
                  y={topLeftPanelShapeModel.getTopLeftPoint().getY()}
                  width={topLeftPanelShapeModel.getWidth()}
                  height={topLeftPanelShapeModel.getHeight()}
                  fill={GOLD}
            />
        </g>)
};

const mapStateToProps = (store) =>
{
    return {
        topLeftPanelShapeModel: store.topLeftPanelState.topLeftPanelShapeModel,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(TopLeftPanel);