// App.js
import React, {Component} from 'react';
import {appComponentDefaultStyle} from "../styles/appComponentStyle";
import store from "../store";
import {Provider} from "react-redux";
import {MAX_ROTATION_DEGREE_VALUE, MAX_TRANSLATE_PERCENTAGE_VALUE} from "../styles/basePanelStyle";
import {ID_CONSTANTS} from "../utilities/CONSTANTS_ID";
import {basePanelAction_UpdateBasePanelSize, basePanelAction_UpdateTransformAndFocusPoint} from "../actionCreators/basePanelActions";
import BasePanel from "./BasePanel";
import {APP_CONSOLE_FONT} from "../utilities/CONSTANTS_CONSOLE_FONT";
import {APP_REFRESHING_TIME_GAP} from "../utilities/CONSTANTS_TIME";

/**
 * App component is a class component (stateful component)
 * It controls:
 * 1) position and size of each base component
 * 2) Rotation, translation and focus point on X and Y axis of base panel
 * 3) App refreshing rate during on mouse move
 */
class App extends Component
{
    constructor(props)
    {
        console.log("%cApp constructor()", APP_CONSOLE_FONT);
        super(props);

        this.previousUsedMouseMoveEventTimeStamp = 0;
    }

    setPreviousUsedMouseMoveEventTimeStamp(t: number)
    {
        this.previousUsedMouseMoveEventTimeStamp = t;
    }

    getPreviousUsedMouseMoveEventTimeStamp()
    {
        return this.previousUsedMouseMoveEventTimeStamp;
    }

    componentWillMount()
    {
        registerFunctionsOnWindowEvents(() => this.getPreviousUsedMouseMoveEventTimeStamp(), (t: number) => this.setPreviousUsedMouseMoveEventTimeStamp(t));
    }

    componentWillUnmount()
    {
        window.removeEventListener('resize', () =>
        {
            window.removeEventListener('resize', () => windowOnResizeFunction());
            window.removeEventListener('mousemove', (event) => windowOnMouseMoveFunction(event, this.getPreviousUsedMouseMoveEventTimeStamp, this.setPreviousUsedMouseMoveEventTimeStamp));
        })
    }

    render()
    {
        console.log("%cApp - render()", APP_CONSOLE_FONT);
        return (
            <Provider store={store}>
                <div id={ID_CONSTANTS.APP} style={appComponentDefaultStyle}>
                    <BasePanel/>
                </div>
            </Provider>
        );
    }
}

const registerFunctionsOnWindowEvents = (getPreviousUsedMouseMoveEventTimeStamp, setPreviousUsedMouseMoveEventTimeStamp) =>
{
    console.log("Registering functions on window events...");

    window.addEventListener('resize', () => windowOnResizeFunction());
    console.log("* window resize event function done.");
    window.addEventListener('mousemove', (event) => windowOnMouseMoveFunction(event, getPreviousUsedMouseMoveEventTimeStamp, setPreviousUsedMouseMoveEventTimeStamp));
    console.log("* window mousemove event function done.");

    console.log("Finish registering functions on window events.");
};

const windowOnResizeFunction = () =>
{
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    store.dispatch(basePanelAction_UpdateBasePanelSize(windowWidth, windowHeight));
};

const windowOnMouseMoveFunction = (event, getPreviousUsedMouseMoveEventTimeStamp, setPreviousUsedMouseMoveEventTimeStamp) =>
{
    let currentMouseMoveEventTimeStamp = Math.trunc(event.timeStamp);
    let previousUsedMouseMoveEventTimeStamp = getPreviousUsedMouseMoveEventTimeStamp();
    // Different browsers have different rates when firing mouse move events, this "if" ensures a stable graphics performance across different browsers
    if (currentMouseMoveEventTimeStamp - previousUsedMouseMoveEventTimeStamp >= APP_REFRESHING_TIME_GAP)
    {
        setPreviousUsedMouseMoveEventTimeStamp(currentMouseMoveEventTimeStamp);

        let mouseXOverWindowWidth = event.clientX / window.innerWidth;
        let mouseYOverWindowHeight = event.clientY / window.innerHeight;

        let maxRotationDegreeValue = MAX_ROTATION_DEGREE_VALUE;
        let basePanelRotationX = Number((1 - mouseYOverWindowHeight) * maxRotationDegreeValue - maxRotationDegreeValue / 2).toFixed(2);
        let basePanelRotationY = Number(maxRotationDegreeValue / 2 - (1 - mouseXOverWindowWidth) * maxRotationDegreeValue).toFixed(2);

        let maxTranslatePercentageValue = MAX_TRANSLATE_PERCENTAGE_VALUE;
        let basePanelTranslatePercentageX = Number((1 - mouseXOverWindowWidth) * maxTranslatePercentageValue - maxTranslatePercentageValue / 2).toFixed(2);
        let basePanelTranslatePercentageY = Number((1 - mouseYOverWindowHeight) * maxTranslatePercentageValue - maxTranslatePercentageValue / 2).toFixed(2);

        let basePanelFocusPointPercentageX = Number(mouseXOverWindowWidth * 100).toFixed(2);
        let basePanelFocusPointPercentageY = Number(mouseYOverWindowHeight * 100).toFixed(2);

        store.dispatch(basePanelAction_UpdateTransformAndFocusPoint(basePanelTranslatePercentageX, basePanelTranslatePercentageY, basePanelRotationX, basePanelRotationY, basePanelFocusPointPercentageX, basePanelFocusPointPercentageY));
    }
};

export default App;