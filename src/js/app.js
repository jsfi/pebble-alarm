var UI = require('ui');
var Vibe = require('ui/vibe');
var Vector2 = require('vector2');
var Settings = require('settings');

var w = new UI.Window({
    backgroundColor: 'white'
});
var width = 144;
var height = 152;
var start = Settings.data('start') || 120;
var step = 10;

var timerRectStart = new Vector2(width, height);
var timerRectStop = new Vector2(width, 0);
var timerRect = new UI.Rect({
    backgroundColor: 'darkGray',
    position: new Vector2(0,0),
    size: timerRectStart
});

var timer = start;
var timerRun = false;

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
    body: 'Your task is ready'
});

w.show();

w.on('click', function(e) {
    switch(e.button) {
        case 'up':
            setTimer(step);
            updateTimer();
        break;
        case 'select':
            toggleTimer();
        break;
        case 'down':
            setTimer(-step);
            updateTimer();
        break;
    }
});

function setTimer(step) {
    var updateStart = false;
    if (start === timer) {
        updateStart = true;
    }

    timer += step;

    if (timer < 0) {
        timer = 0;
    }

    if (updateStart) {
        start = timer;
        Settings.data('start', start);
    }
}

function toggleTimer() {
    if (timerRun) {
        stopTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    var animationHeight = height;
    var animationStep = height / (timer / step);

    countDown();
    w.insert(0, timerRect);

    while(animationHeight > 0) {
        animationHeight -= animationStep;

        (function(nextHeight) {
            var nextSize = new Vector2(width, Math.round(nextHeight));
            timerRect.animate({ size: nextSize, easing: 'linear' }, step * 1000);
        }(animationHeight));
    }
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
    Vibe.vibrate();
}
