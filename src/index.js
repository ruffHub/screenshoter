import {Screen} from 'screen';
import {Canvas} from 'canvas';

function init() {
    const select = document.getElementById('toolSelector');
    const button = document.getElementById('sendButton');

    select.addEventListener('change', function () {
        let mode = select.value;
    });

    button.addEventListener('click', function (e) {
        Screen.sendReport('/api/upload');
        Screen.openScreenShot();
    });
}
init();


Canvas.drawLine();
// Canvas.drawArrow();
// Canvas.writeText();
// Canvas.drawRect();
// Canvas.hideContent();


module.exports = {
    Screen,
    Canvas
};