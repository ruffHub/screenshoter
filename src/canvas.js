/**
 * @created 09.09.18
 *
 * @author Ruslan Smolovyk <ruslan.smolovik@comodo.com>
 * @copyright COMODO 2018
 */

import Konva from 'konva';

let posStart,
    posNow,
    mode,
    currentShape,
    tool,
    shape,
    tempShape,
    tempLayer;

const stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight - 25,
});

const layer = new Konva.Layer();
stage.add(layer);

stage.on('mousedown touchstart', function () {
    mode = 'drawing';
    posStart = this.getPointerPosition();

    tempLayer = new Konva.Layer();
    stage.add(tempLayer);

    let select = document.getElementById("toolSelector");
    tool = select.options[select.selectedIndex].value;

    // currentShape = createShape('arrow', posStart);
    // tempShape = currentShape.getTempShape(posStart, posNow);

    if (createShape(tool, posStart).getTempShape()) {
        tempShape = createShape(tool, posStart).getTempShape();
    } else {
        tempShape = createShape(tool, posStart).getShape(posStart, posNow);
    }
    tempLayer.add(tempShape);

    // select.addEventListener('change', function () {
    //     let mode = select.value;
    // });
});
stage.on('mousemove', function (e) {
    if (mode === 'drawing') {
        posNow = stage.getPointerPosition();

        createShape(tool).updateAttrs(tempShape);

        tempLayer.draw();
    }
});
stage.on('mouseup touchend', function () {
    mode = '';
    posNow = this.getPointerPosition();

    // shape.filters([Konva.Filters.Blur]);
    // shape.blurRadius(10);
    shape = createShape(tool).getShape(posStart, posNow);

    tempLayer.remove();

    layer.add(shape);
    layer.draw();
});

// function Rect(pos, opt) {
//     // constructor() {
//     //     this.shape;
//     // }
//     // getShape() {
//     //     if(!shape){
//     //         t.shape = new Konva.Rect()
//     //     }
//     //     return shape;
//     // }
//     return {
//         getShape(posStart, posNow = 0, opacity = 1) {
//             return new Konva.Rect({
//                 x: posStart.x,
//                 y: posStart.y,
//                 width: posNow.x - posStart.x,
//                 height: posNow.y - posStart.y,
//                 fill: 'black',
//                 opacity: opacity,
//                 stroke: 'black',
//                 lineJoin: 'bevel',
//                 shadowColor: 'black',
//                 shadowBlur: 1,
//                 strokeWidth: 1,
//             });
//         },
//         getTempShape(posStart, posNow = 0) {
//             return new Konva.Rect({
//                 x: posStart.x,
//                 y: posStart.y,
//                 width: posNow.x - posStart.x,
//                 height: posNow.y - posStart.y,
//                 fill: 'black',
//                 stroke: 'black',
//                 lineJoin: 'bevel',
//                 shadowColor: 'black',
//                 shadowBlur: 1,
//                 strokeWidth: 1,
//                 opacity: 1,
//             });
//         },
//         updateAttrs(shape) {
//             return shape.setAttrs({
//                 x: posStart.x,
//                 y: posStart.y,
//                 width: posNow.x - posStart.x,
//                 height: posNow.y - posStart.y,
//             });
//         },
//     }
// }

function Arrow(posStart) {
    return {
        getShape(posStart, posNow) {
            return new Konva.Arrow({
                points: [posStart.x, posStart.y, posNow.x, posNow.y],
                pointerLength: 20,
                pointerWidth: 15,
                draggable: true,
                fill: 'orange',
                stroke: 'orange',
                lineJoin: 'round',
                strokeWidth: 5,
            });
        },
        getTempShape() {
            return new Konva.Arrow({
                points: [0, 0, 0, 0],
                pointerLength: 20,
                pointerWidth: 15,
                fill: 'orange',
                stroke: 'orange',
                lineJoin: 'round',
                strokeWidth: 5,
            });
        },
        updateAttrs(shape) {
            return shape.setAttrs({
                points: [posStart.x, posStart.y, posNow.x, posNow.y],
            });
        },
    }
}

function Text(posStart, layer) {
    const _shape = new Konva.Text({
        text: 'Some text here',
        x: posStart.x,
        y: posStart.y,
        draggable: true,
        fontSize: 20,
    });
    console.log(layer);
    layer.addEventListener('click', () => {
       console.log('sadadasdsd');
    });
    layer.on('dblclick', () => {
        // create textarea over canvas with absolute position

        // first we need to find its positon
        let textPosition = _shape.getAbsolutePosition();
        let stageBox = stage.getContainer().getBoundingClientRect();

        let areaPosition = {
            x: textPosition.x + stageBox.left,
            y: textPosition.y + stageBox.top
        };

        // create textarea and style it
        let textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

        textarea.value = _shape.text();
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = _shape.width();

        textarea.focus();

        textarea.addEventListener('keydown', function (e) {
            // hide on enter
            if (e.keyCode === 13) {
                _shape.text(textarea.value);
                layer.draw();
                document.body.removeChild(textarea);
            }
        });
    });

    return {
        getShape() {
            return _shape;
        },
        getTempShape() {
            return _shape;
        },
        updateAttrs() {
        },
    }
}

function Line() {
    return {
        getShape(posStart, posNow) {
            return new Konva.Arrow({
                points: [posStart.x, posStart.y, posNow.x, posNow.y],
                pointerLength: 20,
                pointerWidth: 15,
                draggable: true,
                fill: 'orange',
                stroke: 'orange',
                lineJoin: 'round',
                strokeWidth: 5,
            });
        },
        getTempShape() {
            return new Konva.Arrow({
                points: [0, 0, 0, 0],
                pointerLength: 20,
                pointerWidth: 15,
                fill: 'orange',
                stroke: 'orange',
                lineJoin: 'round',
                strokeWidth: 5,
            });
        },
        updateAttrs(shape) {
            return shape.setAttrs({
                points: [posStart.x, posStart.y, posNow.x, posNow.y],
            });
        },
    }
}

function createShape(tool) {
    let shape;

    switch (tool) {
        // case 'rect':
        //     // shape = Rect(pos, opt);
        //     shape = Rect();
        //     break;
        case 'arrow':
            shape = Arrow(posStart);
            break;
        case 'text':
            shape = Text(posStart, layer);
            break;
        default:
            shape = Arrow(posStart);
    }

    return shape;
}

export const Canvas = {
    drawArrow() {
        let drawArrowLayer = new Konva.Layer();
        let mode = '';
        let posStart;
        let posNow;
        let tempArrow = new Konva.Arrow({
            points: [0, 0, 0, 0],
            pointerLength: 20,
            pointerWidth: 15,
            fill: 'orange',
            stroke: 'orange',
            lineJoin: 'round',
            strokeWidth: 5,
        });

        stage.add(drawArrowLayer);

        stage.on('mousedown touchstart', function () {
            posStart = stage.getPointerPosition();
            mode = 'drawing';
        });
        stage.on('mousemove', function (e) {
            if (mode === 'drawing') {
                posNow = stage.getPointerPosition();

                tempArrow.setAttrs({
                    points: [posStart.x, posStart.y, posNow.x, posNow.y],
                });

                drawArrowLayer.add(tempArrow);
                stage.draw();
            }
        });
        stage.on('mouseup touchend', function () {
            mode = '';
            posNow = stage.getPointerPosition();

            let arrow = new Konva.Arrow({
                points: [posStart.x, posStart.y, posNow.x, posNow.y],
                pointerLength: 20,
                pointerWidth: 15,
                draggable: true,
                fill: 'orange',
                stroke: 'orange',
                lineJoin: 'round',
                strokeWidth: 5,
            });

            tempArrow.remove();
            drawArrowLayer.add(arrow);
        });
    },
    writeText() {
        let layer = new Konva.Layer();
        stage.add(layer);

        let textNode = new Konva.Text({
            text: 'Some text here',
            x: 100,
            y: 100,
            draggable: true,
            fontSize: 20,
        });

        layer.add(textNode);
        layer.draw();

        textNode.on('dblclick', () => {
            // create textarea over canvas with absolute position

            // first we need to find its positon
            let textPosition = textNode.getAbsolutePosition();
            let stageBox = stage.getContainer().getBoundingClientRect();

            let areaPosition = {
                x: textPosition.x + stageBox.left,
                y: textPosition.y + stageBox.top
            };


            // create textarea and style it
            let textarea = document.createElement('textarea');
            document.body.appendChild(textarea);

            textarea.value = textNode.text();
            textarea.style.position = 'absolute';
            textarea.style.top = areaPosition.y + 'px';
            textarea.style.left = areaPosition.x + 'px';
            textarea.style.width = textNode.width();

            textarea.focus();


            textarea.addEventListener('keydown', function (e) {
                // hide on enter
                if (e.keyCode === 13) {
                    textNode.text(textarea.value);
                    layer.draw();
                    document.body.removeChild(textarea);
                }
            });
        })
    },
    drawRect() {
        let drawRectLayer = new Konva.Layer();
        let mode = '';
        let posStart;
        let posNow;
        let tempRect = new Konva.Rect({
            x: 250,
            y: 100,
            width: 150,
            height: 50,
            fill: 'transparent',
            stroke: 'orange',
            lineJoin: 'bevel',
            shadowColor: 'black',
            shadowBlur: 10,
            strokeWidth: 4,
        });

        stage.add(drawRectLayer);

        stage.on('mousedown touchstart', function () {
            posStart = stage.getPointerPosition();
            mode = 'drawing';
        });
        stage.on('mousemove', function (e) {
            if (mode === 'drawing') {
                posNow = stage.getPointerPosition();
                tempRect.setAttrs({
                    x: posStart.x,
                    y: posStart.y,
                    width: posNow.x - posStart.x,
                    height: posNow.y - posStart.y,
                });

                drawRectLayer.add(tempRect);
                drawRectLayer.draw();
            }
        });
        stage.on('mouseup touchend', function () {
            mode = '';
            posNow = stage.getPointerPosition();

            let rect = new Konva.Rect({
                x: posStart.x,
                y: posStart.y,
                width: posNow.x - posStart.x,
                height: posNow.y - posStart.y,
                // draggable: true,
                fill: 'transparent',
                stroke: 'orange',
                lineJoin: 'bevel',
                shadowColor: 'black',
                shadowBlur: 10,
                strokeWidth: 4,
            });

            tempRect.remove();
            drawRectLayer.add(rect);
            stage.draw();
        });
    },
    drawLine() {
        let layer = new Konva.Layer();
        stage.add(layer);

        // then we are going to draw into special canvas element
        let canvas = document.createElement('canvas');
        canvas.width = stage.width();
        canvas.height = stage.height();

        // created canvas we can add to layer as "Konva.Image" element
        let image = new Konva.Image({
            image: canvas,
            x: 0,
            y: 0,
            shadowBlur: 5
        });
        layer.add(image);
        stage.draw();

        // Good. Now we need to get access to context element
        let context = canvas.getContext('2d');
        context.strokeStyle = "#df4b26";
        context.lineJoin = "round";
        context.lineWidth = 5;


        let isPaint = false;
        let posStart;
        let mode = 'brush';


        // now we need to bind some events
        // we need to start drawing on mousedown
        // and stop drawing on mouseup
        image.on('mousedown touchstart', function () {
            mode = 'drawing';
            posStart = stage.getPointerPosition();
        });

        // will it be better to listen move/end events on the window?
        stage.addEventListener('mouseup touchend', function () {
            mode = '';
        });

        // and core function - drawing
        stage.addEventListener('mousemove touchmove', function () {
            if (mode !== 'drawing') {
                return;
            }

            context.globalCompositeOperation = 'source-over';
            context.beginPath();

            let localPos = {
                x: posStart.x - image.x(),
                y: posStart.y - image.y()
            };
            context.moveTo(localPos.x, localPos.y);
            let pos = stage.getPointerPosition();
            localPos = {
                x: pos.x - image.x(),
                y: pos.y - image.y()
            };
            context.lineTo(localPos.x, localPos.y);
            context.closePath();
            context.stroke();

            posStart = pos;
            layer.batchDraw();
        });
    },
};