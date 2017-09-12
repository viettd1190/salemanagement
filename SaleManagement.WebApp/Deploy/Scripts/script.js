function isTouchDevice() {
    var result = true;
    try {
        document.createEvent("TouchEvent");
    } catch (e) {
        result = false;
    }
    var ua = navigator.userAgent;
    if (result || ua.match(/(iPhone|iPod|iPad)/) || ua.match(/BlackBerry/) || ua.match(/Android/)) {
        result = true;
    }
    else {
        result = false;
    }
    return result;
}
$(document).ready(function () {
    if (window.documentReadyCallback) {
        window.documentReadyCallback();
    }
});
function getRandomColor() {
    var colours = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
    var digit = new Array(5);
    var colour = '#';
    for (var i = 0; i < 6; i++) {
        var j = Math.round(Math.random() * 16);
        digit[i] = colours[j == 0 ? j : j - 1];
        colour = colour + digit[i];
    }
    return colour;
}
function formatDateTime(e) {
    if (e) {
        var date = new Date(parseInt(e.substr(6)));
        return paddingDisplay2Number(date.getDate()) +
            '-' +
            paddingDisplay2Number(date.getMonth() + 1) +
            ' ' +
            paddingDisplay2Number(date.getHours()) +
            ':' +
            paddingDisplay2Number(date.getMinutes());
    }
    return '';
}
function runningFormatter(value, row, index) {
    index++;
    return index;
}
function formatValueNull(obj) {
    if (obj == null) {
        return '';
    }
    return obj;
}