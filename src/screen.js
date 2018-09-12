/**
 * @created 09.09.18
 *
 * @author Ruslan Smolovyk <ruslan.smolovik@comodo.com>
 * @copyright COMODO 2018
 */

import html2canvas from 'html2canvas';

window.html2canvas = html2canvas;

/**
 *
 * @returns {Function}
 */

export const Screen = {
    makeScreenShot(el = document.body) {
        return html2canvas(el);
    },
    openScreenShot() {
        this.makeScreenShot().then(canvas => {
            const win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800px,height=600px, top=" + (screen.height - 400) + ",left=" + (screen.width - 840));
            win.document.body.appendChild(canvas);
        })
    },
    sendReport(url) {
        let el = document.getElementsByTagName('iframe')[0];
        // el.contentWindow.postMessage("{c: 'sssss'}", '*');

        // var iframe = document.getElementsByTagName('iframe')[0];
        // var elmnt = iframe.contentWindow.document.body;
        // console.log(elmnt);
        this.makeScreenShot().then(canvas => {
            let dataURL = canvas.toDataURL();
            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.send(dataURL);
        });
    }
};