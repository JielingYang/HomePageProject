import {bindActionCreators} from "redux/index";
import {connect} from "react-redux";

type TopLeftPanelPropsType = {}

const TopLeftPanel = (props: TopLeftPanelPropsType) =>
{};

const mapStateToProps = (store) =>
{
    return {};
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(TopLeftPanel);