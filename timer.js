var formattedTime;

function Timer(elem) {
    var time = 0;
    var interval;
    var offset;

    function update() {
        if (this.isOn && this.isOn()) {
            time += delta();
        }

        formattedTime = timeFormatter(time);
        if (hideTime == false) {elem.textContent = formattedTime;}
    }

    function delta() {
        var now = Date.now();

        var timePassed = now - offset;
        offset = now;
        return timePassed;
    }

    function timeFormatter(timeInMilliseconds) {
        var time = new Date(timeInMilliseconds);
        var minutes = time.getMinutes().toString();
        var seconds = time.getSeconds().toString();
        var milliseconds = Math.floor(time.getMilliseconds().toString() / 10);

        if (milliseconds < 10) {
            milliseconds = '0' + milliseconds;
        }
        
        if (minutes < 1) {
            return seconds + '.' + milliseconds;
        } else {
            if (seconds < 10) {
                return minutes + ':0' + seconds + '.' + milliseconds;
            } else {
                return minutes + ':' + seconds + '.' + milliseconds;
            }
        }
    }

    // 0: ready, 1: timing, 2: stopped
    this.timerState = 0;
    this.isOn = function () { return this.timerState === 1; }
    this.isStopped = function () { return this.timerState === 2; }

    this.start = function() {
        if (!this.isOn()) {
            interval = setInterval(update.bind(this), 10);
            offset = Date.now();
            this.timerState++;

            if (hideTime == true) {elem.textContent = "SOLVE";}
            if (hideText == true) {
                document.getElementById('logoText').visible = false;
            }
        }
    };

    this.stop = function() {
        if (this.isOn()) {
            clearInterval(interval);
            interval = null;
            this.timerState++;

            elem.textContent = formattedTime;
        }
    };

    this.reset = function() {
        time = 0;
        update();
    };

    this.ready = function () {
        this.timerState = 0;
    }
}