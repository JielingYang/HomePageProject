import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const TopRightPanel_SettingsTabsViewSettings = () =>
{
    return <div>

    </div>
};


const mapStateToProps = (store) =>
{
    return {};
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(TopRightPanel_SettingsTabsViewSettings);