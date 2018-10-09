import React, {Component} from 'react';
import {connect} from "react-redux";
import BasePanel from "./BasePanel";
import {LEVEL0_CONSOLE_FONT, LEVEL0_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import {bindActionCreators} from "redux";
import {appAction_requestToUpdateAppSize, appAction_requestToUpdateAppMouseMoveRelatedData} from "../actionCreators/appActions";
import {WHITE} from "../utilities/CONSTANTS_COLOR";
import StyleObject from "../classes/StyleObject";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";

type AppPropsType = {
    appShapeModel: Shape2d_Rectangle,
    appAction_requestToUpdateAppSize: Function,
    appAction_requestToUpdateAppMouseMoveRelatedData: Function,
}

/**
 * App component is a class component (stateful component)
 * It uses React lifecycle function componentDidMount() and componentWillUnmount() to register/remove functions on window events
 */
class App extends Component<AppPropsType>
{
    constructor(props)
    {
        console.log(LEVEL0_CONSOLE_PREFIX + "App started", LEVEL0_CONSOLE_FONT);
        super(props);

        this.props = props;
    }

    componentDidMount()
    {
        console.log("Registering functions on window events...");
        window.addEventListener('resize', () => this.props.appAction_requestToUpdateAppSize(window.innerWidth, window.innerHeight));
        window.addEventListener('mousemove', (event) => this.props.appAction_requestToUpdateAppMouseMoveRelatedData(event.timeStamp, event.clientX, event.clientY));
        console.log("Finish registering functions on window events.");
    }

    componentWillUnmount()
    {
        window.removeEventListener('resize', () => this.props.appAction_requestToUpdateAppSize(window.innerWidth, window.innerHeight));
        window.removeEventListener('mousemove', (event) => this.props.appAction_requestToUpdateAppMouseMoveRelatedData(event.timeStamp, event.clientX, event.clientY));
    }

    render()
    {
        let appComponentShapeModel: Shape2d_Rectangle = this.props.appShapeModel;
        let appComponentStyleObject: StyleObject = new StyleObject().setBasics('absolute', appComponentShapeModel.getWidth(), appComponentShapeModel.getHeight(), appComponentShapeModel.getTopLeftPoint().getX(), appComponentShapeModel.getTopLeftPoint().getY()).setBackgroundColor(WHITE).setPerspective(100, undefined);

        console.log(LEVEL0_CONSOLE_PREFIX + appComponentShapeModel.getStringId(), LEVEL0_CONSOLE_FONT);
        return (
            <div id={appComponentShapeModel.getStringId()} style={appComponentStyleObject.getStyle()}>
                <BasePanel/>
            </div>
        );
    }
}

const mapStateToProps = (store) =>
{
    return {
        appShapeModel: store.appState.appShapeModel,
    }
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
                                  appAction_requestToUpdateAppSize: appAction_requestToUpdateAppSize,
                                  appAction_requestToUpdateAppMouseMoveRelatedData: appAction_requestToUpdateAppMouseMoveRelatedData,
                              }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(App);