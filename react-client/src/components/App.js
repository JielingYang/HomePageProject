import React, {Component} from "react";
import {connect} from "react-redux";
import BasePanel from "./BasePanel";
import {LEVEL0_CONSOLE_FONT, LEVEL0_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import {bindActionCreators} from "redux";
import {appAction_requestToUpdateAppSize, appAction_requestToUpdateAppMouseMoveRelatedData} from "../actionCreators/appActions";
import StyleObject from "../classes/StyleObject";
import Shape2d_Rectangle from "../classes/shapeClasses/Shape2d_Rectangle";
import {topRightPanelAction_requestToUpdateTopRightPanelContentLayoutData} from "../actionCreators/topRightPanelActions";
import {TRANSITION_TIME_NORMAL} from "../utilities/CONSTANTS_TIME";
import {topLeftPanelAction_requestToUpdateTopLeftPanelContentLayoutData} from "../actionCreators/topLeftPanelActions";
import {bottomLeftPanelAction_requestToUpdateBottomLeftPanelContentLayoutData} from "../actionCreators/bottomLeftPanelActions";
import {bottomRightPanelAction_requestToUpdateBottomRightPanelContentLayoutData} from "../actionCreators/bottomRightPanelActions";
import {COMMON_TYPE} from "../utilities/CONSTANTS_STRING";

type AppPropsType = {
    appShapeModel: Shape2d_Rectangle,
    appBackgroundColor: string,
    appPerspective: number,

    appAction_requestToUpdateAppSize: Function,
    appAction_requestToUpdateAppMouseMoveRelatedData: Function,
    topRightPanelAction_requestToUpdateTopRightPanelContentLayoutData: Function,
    topLeftPanelAction_requestToUpdateTopLeftPanelContentLayoutData: Function,
    bottomLeftPanelAction_requestToUpdateBottomLeftPanelContentLayoutData: Function,
    bottomRightPanelAction_requestToUpdateBottomRightPanelContentLayoutData: Function,
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
        window.addEventListener("resize", () => this.props.appAction_requestToUpdateAppSize(window.innerWidth, window.innerHeight));
        window.addEventListener("mousemove", (event) => this.props.appAction_requestToUpdateAppMouseMoveRelatedData(event.timeStamp, event.clientX, event.clientY));
        console.log("Finish registering functions on window events.");

        this.props.topRightPanelAction_requestToUpdateTopRightPanelContentLayoutData();
        this.props.topLeftPanelAction_requestToUpdateTopLeftPanelContentLayoutData();
        this.props.bottomLeftPanelAction_requestToUpdateBottomLeftPanelContentLayoutData();
        this.props.bottomRightPanelAction_requestToUpdateBottomRightPanelContentLayoutData();
    }

    componentWillUnmount()
    {
        window.removeEventListener("resize", () => this.props.appAction_requestToUpdateAppSize(window.innerWidth, window.innerHeight));
        window.removeEventListener("mousemove", (event) => this.props.appAction_requestToUpdateAppMouseMoveRelatedData(event.timeStamp, event.clientX, event.clientY));
    }

    render()
    {
        let appComponentShapeModel: Shape2d_Rectangle = this.props.appShapeModel;
        let appComponentStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
            .setBasics(appComponentShapeModel.getWidth(), appComponentShapeModel.getHeight(), appComponentShapeModel.getTopLeftPoint().getX(), appComponentShapeModel.getTopLeftPoint().getY())
            .setBackgroundColor(this.props.appBackgroundColor)
            .setPerspective(this.props.appPerspective)
            .addTransition("background-color", TRANSITION_TIME_NORMAL);

        console.log(LEVEL0_CONSOLE_PREFIX + appComponentShapeModel.getStringId(), LEVEL0_CONSOLE_FONT);
        return (
            <div id={appComponentShapeModel.getStringId()} style={appComponentStyleObject.getStyle()}>
                <BasePanel/>
            </div>);
    }
}

const mapStateToProps = (store) =>
{
    return {
        appShapeModel: store.appState.appShapeModel,
        appBackgroundColor: store.appState.appBackgroundColor,
        appPerspective: store.appState.appPerspective,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
        appAction_requestToUpdateAppSize: appAction_requestToUpdateAppSize,
        appAction_requestToUpdateAppMouseMoveRelatedData: appAction_requestToUpdateAppMouseMoveRelatedData,
        topRightPanelAction_requestToUpdateTopRightPanelContentLayoutData: topRightPanelAction_requestToUpdateTopRightPanelContentLayoutData,
        topLeftPanelAction_requestToUpdateTopLeftPanelContentLayoutData: topLeftPanelAction_requestToUpdateTopLeftPanelContentLayoutData,
        bottomLeftPanelAction_requestToUpdateBottomLeftPanelContentLayoutData: bottomLeftPanelAction_requestToUpdateBottomLeftPanelContentLayoutData,
        bottomRightPanelAction_requestToUpdateBottomRightPanelContentLayoutData: bottomRightPanelAction_requestToUpdateBottomRightPanelContentLayoutData,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(App);