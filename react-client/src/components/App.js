import React, {Component} from "react";
import {connect} from "react-redux";
import {LEVEL0_CONSOLE_FONT, LEVEL0_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import {bindActionCreators} from "redux";
import {appAction_requestToUpdateAppSize, appAction_requestToUpdateAppMouseMoveRelatedData} from "../actionCreators/appActions";
import StyleObject from "../classes/StyleObject";
import {TRANSITION_TIME_NORMAL} from "../utilities/CONSTANTS_TIME";
import {COMMON_TYPE} from "../utilities/CONSTANTS_STRING";
import BaseModelWithStateAndShape from "../classes/BaseModelWithStateAndShape";
import {contentPanelAction_requestToInitializeContentPanelsModels} from "../actionCreators/contentPanelActions";
import {CONTENT_PANELS_INDICES} from "../utilities/CONSTANTS_NUMBER";
import ContentPanel from "./ContentPanel";
import {engineAction_requestToUpdateEnginePerspective} from "../actionCreators/engineActions";

type AppPropsType = {
    /* Values from mapStateToProps() */
    appModel: BaseModelWithStateAndShape,
    appBackgroundColor: string,
    /* Functions from matchDispatchToProps() */
    appAction_requestToUpdateAppSize: Function,
    appAction_requestToUpdateAppMouseMoveRelatedData: Function,
    contentPanelAction_requestToInitializeContentPanelsModels: Function,
    engineAction_requestToUpdateEnginePerspective: Function,
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

        this.props.contentPanelAction_requestToInitializeContentPanelsModels(Object.values(CONTENT_PANELS_INDICES));
        this.props.appAction_requestToUpdateAppSize(window.innerWidth, window.innerHeight, true);
        this.props.engineAction_requestToUpdateEnginePerspective();
    }

    componentWillUnmount()
    {
        window.removeEventListener("resize", () => this.props.appAction_requestToUpdateAppSize(window.innerWidth, window.innerHeight));
        window.removeEventListener("mousemove", (event) => this.props.appAction_requestToUpdateAppMouseMoveRelatedData(event.timeStamp, event.clientX, event.clientY));
    }

    render()
    {
        let appComponentModel: BaseModelWithStateAndShape = this.props.appModel;
        let appComponentStyleObject: StyleObject = new StyleObject(COMMON_TYPE.DEFAULT)
            .setBasics(appComponentModel.getWidth(), appComponentModel.getHeight(), appComponentModel.getX(), appComponentModel.getY())
            .setPointerEvents("none")
            .setBackgroundColor(this.props.appBackgroundColor)
            .addTransition("background-color", TRANSITION_TIME_NORMAL);

        console.log(LEVEL0_CONSOLE_PREFIX + appComponentModel.getStringId(), LEVEL0_CONSOLE_FONT);
        return (
            <div id={appComponentModel.getStringId()} style={appComponentStyleObject.getStyle()}>
                {Object.values(CONTENT_PANELS_INDICES).map((index: number) =>
                    <ContentPanel key={index} contentPanelIndex={index}/>)}
            </div>);
    }
}

const mapStateToProps = (store) =>
{
    return {
        appModel: store.appState.appModel,
        appBackgroundColor: store.appState.appBackgroundColor,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
        appAction_requestToUpdateAppSize: appAction_requestToUpdateAppSize,
        appAction_requestToUpdateAppMouseMoveRelatedData: appAction_requestToUpdateAppMouseMoveRelatedData,
        contentPanelAction_requestToInitializeContentPanelsModels: contentPanelAction_requestToInitializeContentPanelsModels,
        engineAction_requestToUpdateEnginePerspective: engineAction_requestToUpdateEnginePerspective,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(App);