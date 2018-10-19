import {createReducer} from "./reducerCreator";
import Shape2d_Circle from "../classes/Shape2d_Circle";
import {ID} from "../utilities/CONSTANTS_STRING";
import Shape2d_Point from "../classes/Shape2d_Point";
import numberIdGenerator from "../classes/NumberIdGenerator";

export type centerCircleStateType = {
    centerCircleShapeModel: Shape2d_Circle,
};

const centerCircleDefaultState: centerCircleStateType = {
    centerCircleShapeModel: new Shape2d_Circle(numberIdGenerator.generateId(), ID.CENTER_CIRCLE_ID, new Shape2d_Point(window.innerWidth / 2, window.innerHeight / 2), 50)
};

// Check reducerCreator for explanation of handlers
const centerCircleReducerHandlers = {};

export default createReducer(centerCircleDefaultState, centerCircleReducerHandlers);