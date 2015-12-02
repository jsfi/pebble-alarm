var Vector2 = require('vector2');
var UI = require('ui');
var Vibe = require('ui/vibe');

var w = new UI.Window({
    backgroundColor: 'white'
});
var width = 144;
var height = 152;
var start = 10;

var timerRectStart = new Vector2(width, height);
var timerRectStop = new Vector2(width, 0);
var timerRect = new UI.Rect({
    backgroundColor: 'black',
    position: new Vector2(0,0),
    size: timerRectStart
});

var timer = start;
var timerRun = false;
var timerBg = new UI.Circle({
    position: new Vector2(71, 67),
    radius: 20
});
w.add(timerBg);

var timerText = new UI.Text({
    color: 'black',
    text: timer,
    textAlign: 'center',
    position: new Vector2(4, 51),
    size: new Vector2(136, 34)
});
w.add(timerText);

var success = new UI.Card({
    title: 'Timer ended',
    body: '\nYour task is ready'
});

w.show();

w.on('click', function(e) {
    switch(e.button) {
        case 'up':
            timer += 10;
            updateTimer();
        break;
        case 'select':
            toggleTimer();
        break;
        case 'down':
            timer -= 10;
            if (timer < 0) {
                timer = 0;
            }
            updateTimer();
        break;
    }
});

function toggleTimer() {
    if (timerRun) {
        stopTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    countDown();

    w.insert(0, timerRect);
    timerRect.animate({ size: timerRectStop, easing: 'linear' }, timer * 1000);
}

function stopTimer() {
    clearTimeout(timerRun);
    timerRun = false;
    w.remove(timerRect);
    timerRect.size(timerRectStart);
}

function updateTimer() {
    timerText.text(timer);
}

function countDown() {
    timerRun = setTimeout(function() {
        countDown();
        timer--;
        updateTimer();

        if (timerRun && timer <= 0) {
            stopTimer();
            timerEnded();
            timer = start;
            updateTimer();
        }
    }, 1000);
}

function timerEnded() {
    success.show();
}
