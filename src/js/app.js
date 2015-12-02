var Vector2 = require('vector2');
var UI = require('ui');
var Vibe = require('ui/vibe');

var w = new UI.Window();
var start = 10;

var timer = start;
var timerRun = false;
var timerText = new UI.Text({
    text: timer,
    textAlign: 'center',
    position: new Vector2(4, 62),
    size: new Vector2(136, 28)
});
w.add(timerText);

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
        countDown();
    }
}

function countDown() {
    timerRun = setTimeout(function() {
        countDown();
        timer--;
        updateTimer();

        if (timerRun && timer <= 0) {
            timer = start;
            stopTimer();
            timerEnded();
        }
    }, 1000);
}

function stopTimer() {
    clearTimeout(timerRun);
    timerRun = false;
}

function updateTimer() {
    timerText.text(timer);
}

function timerEnded() {
    var card = new UI.Card({
        title: 'Timer ended',
        body: '\nYour task is ready'
    });
    Vibe.vibrate();

    card.show();
}
