// Write your Javascript code.
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

function drawClock() {
    // clear the background
    context.fillStyle = 'lightgray';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Get the current time
    var now = new Date(),
        h = now.getHours(),
        m = now.getMinutes(),
        s = now.getSeconds();

    // Make values like '5' into '05'
    h = addLeadingZeroWhenNecessary(h);
    m = addLeadingZeroWhenNecessary(m);
    s = addLeadingZeroWhenNecessary(s);

    // Assemble the text
    var clockText = h + ':' + m + ':' + s,
        x = 110,
        y = 35;

    // This green color was picked
    // using http://jscolor.com/
    context.fillStyle = '#1A75AB';

    // Draw the text
    //context.font = '50pt Arial';
    context.font = '20pt Arial';
    context.strokeStyle = 'black';
    context.fillText(clockText, x, y);
    context.strokeText(clockText, x, y);
}

function addLeadingZeroWhenNecessary(s) {
    return (s < 10 ? '0' : '') + s;
}

// Draw the clock right away
drawClock();

// Then draw the clock every subsequent second
setInterval(drawClock, 1000);
