export const MAX_ROTATION_DEGREE_VALUE = 2;
export const MAX_TRANSLATE_PERCENTAGE_VALUE = 10;

const basePanelStyle = {
    position: 'absolute',
    width: null,
    height: null,
    left: 0,
    top: 0,

    transform: null,
    transformStyle: 'preserve-3d',
};

export default (width: number, height: number, translatePercentageX: string, translatePercentageY: string, rotationX: string, rotationY: string) =>
{
    let transform = 'translate(' + translatePercentageX + '%,' + translatePercentageY + '%) rotateX(' + rotationX + 'deg) rotateY(' + rotationY + 'deg)';
    return {...basePanelStyle, width: width, height: height, transform: transform};
};