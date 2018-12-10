
const baseHeight = 2
const armHeight = 10
const connectionHeight = 3
const connectionWidth = 3
const verticalArmSafe = 0.5
const horizontalArmSafe = 0.5
const armLength = 15
let startTime;
let currentKeyFrameIndex=0;
const upMin = baseHeight+verticalArmSafe+connectionHeight/2
const upMax = baseHeight+armHeight-horizontalArmSafe-connectionHeight/2
const sideMin = -armLength/2+horizontalArmSafe+connectionWidth/2
const sideMax = armLength/2-horizontalArmSafe-connectionWidth/2

const keyFrame = [
    {rotation:  1*Math.PI/4, connectionY: upMin, armX: sideMin, time: 1000, kegs: [  true, false, false], boxes: [true, false, true]},
    {rotation:  1*Math.PI/4, connectionY: upMin, armX: sideMax, time: 2000, kegs: [  false, true, false], boxes: [true, false, true]},
    {rotation:  1*Math.PI/4, connectionY: upMax, armX: sideMin, time: 2000, kegs: [  false, true, false], boxes: [true, false, true]},
    {rotation:  5*Math.PI/4, connectionY: upMax, armX: sideMin, time: 2000, kegs: [  false, true, false], boxes: [true, false, true]},
    {rotation:  5*Math.PI/4, connectionY: upMin, armX: sideMax, time: 2000, kegs: [  false, false, true], boxes: [true, false, true]},
    {rotation:  5*Math.PI/4, connectionY: upMin, armX: sideMin, time: 1000, kegs: [  false, false, true], boxes: [true, false, true]},
    // {rotation:  3*Math.PI/4, connectionY: upMin, armX: sideMin, time: 2000, kegs: [  false, false, true], boxes: [true, false, false]},
    // {rotation:  3*Math.PI/4, connectionY: upMin, armX: sideMax, time: 2000, kegs: [  false, false, true], boxes: [false, true, false]},
    // {rotation:  3*Math.PI/4, connectionY: upMax, armX: sideMin, time: 2000, kegs: [  false, false, true], boxes: [false, true, false]},
    // {rotation:  7*Math.PI/4, connectionY: upMax, armX: sideMin, time: 2000, kegs: [  false, false, true], boxes: [false, true, false]},
    // {rotation:  7*Math.PI/4, connectionY: upMin, armX: sideMax, time: 2000, kegs: [  false, false, true], boxes: [false, false, true]},
    // {rotation:  7*Math.PI/4, connectionY: upMin, armX: sideMin, time: 1000, kegs: [  false, false, true], boxes: [false, false, true]},
    // {rotation:  5*Math.PI/4, connectionY: upMin, armX: sideMin, time: 2000, kegs: [  false, false, true], boxes: [false, false, true]},
    {rotation:  5*Math.PI/4, connectionY: upMin, armX: sideMax, time: 2000, kegs: [  false, true, false], boxes: [true, false, true]},
    {rotation:  5*Math.PI/4, connectionY: upMax, armX: sideMin, time: 2000, kegs: [  false, true, false], boxes: [true, false, true]},
    {rotation:  1*Math.PI/4, connectionY: upMax, armX: sideMin, time: 2000, kegs: [  false, true, false], boxes: [true, false, true]},
    {rotation:  1*Math.PI/4, connectionY: upMin, armX: sideMax, time: 2000, kegs: [  true, false, false], boxes: [true, false, true]},
    // {rotation:  1*Math.PI/4, connectionY: upMin, armX: sideMin, time: 1000, kegs: [  true, false, false], boxes: [true, false, true]},
    // {rotation: -1*Math.PI/4, connectionY: upMin, armX: sideMin, time: 2000, kegs: [  true, false, false], boxes: [false, false, true]},
    // {rotation: -1*Math.PI/4, connectionY: upMin, armX: sideMax, time: 2000, kegs: [  true, false, false], boxes: [false, true, false]},
    // {rotation: -1*Math.PI/4, connectionY: upMax, armX: sideMin, time: 2000, kegs: [  true, false, false], boxes: [false, true, false]},
    // {rotation:  3*Math.PI/4, connectionY: upMax, armX: sideMin, time: 2000, kegs: [  true, false, false], boxes: [false, true, false]},
    // {rotation:  3*Math.PI/4, connectionY: upMin, armX: sideMax, time: 2000, kegs: [  true, false, false], boxes: [true, false, false]},
    // {rotation:  3*Math.PI/4, connectionY: upMin, armX: sideMin, time: 1000, kegs: [  true, false, false], boxes: [true, false, false]},
]

export function calcAnimations(time){
    if (!startTime){
        startTime = time
    }
    let animDelta = time - startTime || 0;

    if (!time) {
        currentKeyFrameIndex = 0;
        return keyFrame[0]
    }

    while (animDelta > keyFrame[currentKeyFrameIndex].time ) {
        startTime += keyFrame[currentKeyFrameIndex].time
        currentKeyFrameIndex = nextKeyPointIndex(currentKeyFrameIndex)
        animDelta = time - startTime || 0;
    }
    return animDiffOfKeyFrames(currentKeyFrameIndex, animDelta)
}

function nextKeyPointIndex(currentIndex){
    return (currentIndex+1) % keyFrame.length;
}

function animDiffOfKeyFrames(currentIndex, delta){
    const currentKeyFrame = keyFrame[currentIndex]
    const progress = delta / currentKeyFrame.time
    const nextKeyFrame = keyFrame[nextKeyPointIndex(currentIndex)]
    return animDiff (currentKeyFrame, nextKeyFrame, progress)
}

function animDiff(current, next, multi){
    const rotation =  current.rotation + multi * (next.rotation-current.rotation)
    const connectionY = current.connectionY + multi * (next.connectionY-current.connectionY)
    const armX = current.armX + multi * (next.armX-current.armX)
    return {rotation,connectionY, armX, kegs: current.kegs, boxes: current.boxes}
}



