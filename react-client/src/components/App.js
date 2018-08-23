// App.js
import React, {Component} from 'react';
import {connect} from "react-redux";
import {MAX_ROTATION_DEGREE_VALUE, MAX_TRANSLATE_PERCENTAGE_VALUE} from "../styles/basePanelStyle";
import {ID_CONSTANTS} from "../utilities/CONSTANTS_ID";
import {basePanelAction_UpdateBasePanelSize, basePanelAction_UpdateTransformAndFocusPoint} from "../actionCreators/basePanelActions";
import BasePanel from "./BasePanel";
import {LEVEL0_CONSOLE_FONT, LEVEL0_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import {bindActionCreators} from "redux";
import type {appStateType} from "../reducers/appReducer";
import {appAction_UpdateAppSize, appAction_UpdateAppMouseMoveEventTimeStamp} from "../actionCreators/appActions";
import {WHITE} from "../utilities/CONSTANTS_COLOR";
import StyleObject from "../classes/StyleObject";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";

type AppPropsType = {
    appState: appStateType,
    appAction_UpdateAppSize: Function,
    appAction_UpdateAppMouseMoveEventTimeStamp: Function,
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
        window.addEventListener('resize', () => this.props.appAction_UpdateAppSize(window.innerWidth, window.innerHeight));
        window.addEventListener('mousemove', (event) => this.props.appAction_UpdateAppMouseMoveEventTimeStamp(event.timeStamp));
        console.log("Finish registering functions on window events.");
    }

    componentWillUnmount()
    {
        window.removeEventListener('resize', () => this.props.appAction_UpdateAppSize(window.innerWidth, window.innerHeight));
        window.removeEventListener('mousemove', (event) => this.props.appAction_UpdateAppMouseMoveEventTimeStamp(event.timeStamp));
    }

    render()
    {
        let appComponentRect: Shape2d_Rectangle = this.props.appState.appShapeModel;

        console.log(LEVEL0_CONSOLE_PREFIX + appComponentRect.getStringId(), LEVEL0_CONSOLE_FONT);

        let styleObject: StyleObject = new StyleObject().setBasics('absolute', appComponentRect.getWidth(), appComponentRect.getHeight(), appComponentRect.getTopLeftPoint().getX(), appComponentRect.getTopLeftPoint().getY())
                                                        .setBackgroundColor(WHITE)
                                                        .setPerspective(100, undefined);

        return (
            <div id={appComponentRect.getStringId()} style={styleObject.getStyle()}>
                {/*<BasePanel/>*/}
            </div>
        );
    }
}

// let currentMouseMoveEventTimeStamp = Math.trunc(event.timeStamp);
// let previousUsedMouseMoveEventTimeStamp = getPreviousUsedMouseMoveEventTimeStamp();
// // Different browsers have different rates when firing mouse move events, this "if" ensures a stable graphics performance across different browsers
// if (currentMouseMoveEventTimeStamp - previousUsedMouseMoveEventTimeStamp >= APP_REFRESHING_TIME_GAP)
// {
//     setPreviousUsedMouseMoveEventTimeStamp(currentMouseMoveEventTimeStamp);
//
//     let mouseXOverWindowWidth = event.clientX / window.innerWidth;
//     let mouseYOverWindowHeight = event.clientY / window.innerHeight;
//
//     let maxRotationDegreeValue = MAX_ROTATION_DEGREE_VALUE;
//     let basePanelRotationX = Number((1 - mouseYOverWindowHeight) * maxRotationDegreeValue - maxRotationDegreeValue / 2).toFixed(2);
//     let basePanelRotationY = Number(maxRotationDegreeValue / 2 - (1 - mouseXOverWindowWidth) * maxRotationDegreeValue).toFixed(2);
//
//     let maxTranslatePercentageValue = MAX_TRANSLATE_PERCENTAGE_VALUE;
//     let basePanelTranslatePercentageX = Number((1 - mouseXOverWindowWidth) * maxTranslatePercentageValue - maxTranslatePercentageValue / 2).toFixed(2);
//     let basePanelTranslatePercentageY = Number((1 - mouseYOverWindowHeight) * maxTranslatePercentageValue - maxTranslatePercentageValue / 2).toFixed(2);
//
//     let basePanelFocusPointPercentageX = Number(mouseXOverWindowWidth * 100).toFixed(2);
//     let basePanelFocusPointPercentageY = Number(mouseYOverWindowHeight * 100).toFixed(2);
//
//     store.dispatch(basePanelAction_UpdateTransformAndFocusPoint(basePanelTranslatePercentageX, basePanelTranslatePercentageY, basePanelRotationX, basePanelRotationY, basePanelFocusPointPercentageX, basePanelFocusPointPercentageY));
// }


const mapStateToProps = (store) =>
{
    return {
        appState: store.appState,
    }
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
        appAction_UpdateAppSize: appAction_UpdateAppSize,
        appAction_UpdateAppMouseMoveEventTimeStamp: appAction_UpdateAppMouseMoveEventTimeStamp,
    }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(App);