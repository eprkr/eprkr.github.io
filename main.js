var timer = document.getElementById('timer');
var scramble = document.getElementById('scramble');

var watch = new Timer(timer);

var heldCount = 0;
var ready = false;

var scrambleType = "333";

var windowOpen = false;

function readyCheck() {
    if (heldCount < 1) {
        timer.style.color = "red";
        ready = false;
    } else {
        timer.style.color = "lime";
        ready = true;
    }
}

//Converts the timer.js output strings into milliseconds for math purposes
function toMS(str) {
    if(str.includes(":")) {
        const [mins, secms] = str.split(":");
        const sec = parseFloat(secms);
        return (+mins * 60 + sec) * 1000;
    } else {
        return parseFloat(str) * 1000;
    }
}

//Formats milliseconds into strings of time
function timeFormatter(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    ms = Math.round(ms/10);

    if (hrs > 0) {

    } else {
        if (mins > 0) {
            if (secs < 10) {
                if (ms < 10) {
                    return mins + ':0' + secs + '.0' + ms;
                } else {
                    return mins + ':0' + secs + '.' + ms;
                }
            } else {
                if (ms < 10) {
                    return mins + ':' + secs + '.0' + ms;
                } else {
                    return mins + ':' + secs + '.' + ms;
                }
            }
        } else {
            if (ms < 10) {
                return secs + '.0' + ms;
            } else {
                return secs + '.' + ms;
            }
        }
    }
}

//Scramble stuff
if (localStorage.getItem("scrambleType") === null) {
    var scrambleType = "333";
} else {
    var scrambleType = JSON.parse(localStorage.getItem("scrambleType"));
}

if (scrambleType === "222") {var generatedScramble = scramblers["222"].getRandomScramble();}
if (scrambleType === "333") {var generatedScramble = scramblers["333"].getRandomScramble();}
if (scrambleType === "444") {var generatedScramble = scramblers["444"].getRandomScramble();}
if (scrambleType === "555") {var generatedScramble = scramblers["555"].getRandomScramble();}
if (scrambleType === "666") {var generatedScramble = scramblers["666"].getRandomScramble();}
if (scrambleType === "777") {var generatedScramble = scramblers["777"].getRandomScramble();}

if (scrambleType === "333bf") {var generatedScramble = scramblers["333bf"].getRandomScramble();}
if (scrambleType === "minx") {var generatedScramble = scramblers["minx"].getRandomScramble();}
if (scrambleType === "pyram") {var generatedScramble = scramblers["pyram"].getRandomScramble();}
if (scrambleType === "sq1") {var generatedScramble = scramblers["sq1"].getRandomScramble();}
if (scrambleType === "clock") {var generatedScramble = scramblers["clock"].getRandomScramble();}

scramble.textContent = generatedScramble.scramble_string;

var scrambles = [generatedScramble.scramble_string];
var scrambleIndex = 0;

var table = document.getElementById("solvesTable");

//Stop the space bar from scrolling the page down
window.onkeydown = function(e) {
    if (e.keyCode === 32) return false;
}

document.body.onkeyup = function(e) {
    if (e.keyCode === 32) {
        if (!watch.isStopped()) {
                if (ready == true) {
                    watch.start();

                    //push the scramble used to the array
                    usedScrambles.push(scramble.textContent);

                    if (scrambleType === "222") {var generatedScramble = scramblers["222"].getRandomScramble();}
                    if (scrambleType === "333") {var generatedScramble = scramblers["333"].getRandomScramble();}
                    if (scrambleType === "444") {var generatedScramble = scramblers["444"].getRandomScramble();}
                    if (scrambleType === "555") {var generatedScramble = scramblers["555"].getRandomScramble();}
                    if (scrambleType === "666") {var generatedScramble = scramblers["666"].getRandomScramble();}
                    if (scrambleType === "777") {var generatedScramble = scramblers["777"].getRandomScramble();}
                    
                    if (scrambleType === "333bf") {var generatedScramble = scramblers["333bf"].getRandomScramble();}
                    if (scrambleType === "minx") {var generatedScramble = scramblers["minx"].getRandomScramble();}
                    if (scrambleType === "pyram") {var generatedScramble = scramblers["pyram"].getRandomScramble();}
                    if (scrambleType === "sq1") {var generatedScramble = scramblers["sq1"].getRandomScramble();}
                    if (scrambleType === "clock") {var generatedScramble = scramblers["clock"].getRandomScramble();}

                    scrambles.push(generatedScramble.scramble_string);
                    scramble.textContent = generatedScramble.scramble_string;
                    scrambleIndex += 1;

                    scramble.style.visibility = "hidden";
                }

                timer.style.color = "white";
        } else {
            watch.ready();
        }

        ready = false;
        heldCount = 0;
    }
}

document.body.onkeydown = function(e) {
    if (watch.isOn()) {
        watch.stop();

        scramble.style.visibility = "visible";

        var msTime = toMS(formattedTime);
        var fixedtime = timeFormatter(msTime);

        solves.push(msTime);
        sessions.splice(currentSession, 1, solves);
        localStorage.setItem("sessions", JSON.stringify(sessions));
        localStorage.setItem("seshNames", JSON.stringify(seshNames));

        var row = table.insertRow(1);
        var col1 = row.insertCell(0);
        var col2 = row.insertCell(1);
        var col3 = row.insertCell(2);
        var col4 = row.insertCell(3);

        row.id = "solvesTr";
        col1.id = "solvesTd";
        col2.id = "solvesTd";
        col3.id = "solvesTd";
        col4.id = "solvesTd";

        var total = 0;
        var worstSavg = Math.max.apply(Math,solves);
        var bestSavg = Math.min.apply(Math,solves);
        var sAvgRemv = worstSavg + bestSavg;

        for (var i = 0; i < solves.length; i++) {
            total += solves[i];
        }

        var sAvg = (total-sAvgRemv) / (solves.length-2); //session average

        if (solves.length > 4) {
            var last5 = solves.slice(Math.max(solves.length - 5));
            var sumOf5 = 0;
            var worstOf5 = Math.max.apply(Math,last5);
            var bestOf5 = Math.min.apply(Math,last5);
            var ao5Remv = worstOf5 + bestOf5;

            for (var i = 0; i < 5; i++) {
                sumOf5 += last5[i];
            }

            ao5 = Math.round((sumOf5-ao5Remv) / 3); //current average of 5 (sum of last 5 solves minus best and worst divided by 3)

        } else ao5 = 0.00;

        if (solves.length > 11) {
            var last12 = solves.slice(Math.max(solves.length - 12));
            var sumOf12 = 0;
            var worstOf12 = Math.max.apply(Math,last12);
            var bestOf12 = Math.min.apply(Math,last12);
            var ao12Remv = worstOf12 + bestOf12;

            for (var i = 0; i < 12; i++) {
                sumOf12 += last12[i];
            }

            ao12 = Math.round((sumOf12-ao12Remv) / 10); //current average of 12 (sum of last 12 solves minus best and worst divided by 10)
        } else ao12 = 0.00;

        col1.innerHTML = solves.length;
        //col2.innerHTML = parseFloat(timeFormatter(msTime)).toFixed(2);
        //col3.innerHTML = parseFloat(timeFormatter(ao5)).toFixed(2);
        //col4.innerHTML = parseFloat(timeFormatter(ao12)).toFixed(2);

        var timeFormatted = timeFormatter(msTime);
        var timeFloated = parseFloat(timeFormatted).toFixed(2);

        var ao5Formatted = timeFormatter(ao5);
        var ao5Floated = parseFloat(ao5Formatted).toFixed(2);

        var ao12Formatted = timeFormatter(ao12);
        var ao12Floated = parseFloat(ao12Formatted).toFixed(2);

        //solves
        var currentScramble = usedScrambles[solves.length-1];
        var fixedScramble = currentScramble.replace(/'/g, "&apos;");

        if (timeFormatted.includes(":")) {
            col2.innerHTML = "<span title='" + fixedScramble + "'>" + timeFormatted + "</span>";
        } else {
            col2.innerHTML = "<span title='" + fixedScramble + "'>" + timeFloated + "</span>";
        }

        //ao5
        if (ao5Formatted.includes(":")) {
            col3.innerHTML = ao5Formatted;
        } else {
            col3.innerHTML = ao5Floated;
        }

        //ao12
        if (ao12Formatted.includes(":")) {
            col4.innerHTML = ao12Formatted;
        } else {
            col4.innerHTML = ao12Floated;
        }

        ao5s.push(ao5);
        ao12s.push(ao12);

        mods.push(0);

        localStorage.setItem("solves", JSON.stringify(solves));
        localStorage.setItem("ao5s", JSON.stringify(ao5s));
        localStorage.setItem("ao12s", JSON.stringify(ao12s));

        localStorage.setItem("scrambleType", JSON.stringify(scrambleType));
        localStorage.setItem("usedScrambles", JSON.stringify(usedScrambles));

        localStorage.setItem("mods", JSON.stringify(mods));

        updateStatistics();
    } else {
        if (windowOpen == true) {
            //close any open windows (escape)
            if (e.keyCode === 27) {
                if (document.getElementById('deleteLastSolve').style.display == 'flex') document.getElementById('deleteLastSolve').style.display = 'none';
                if (document.getElementById('settingsWindow').style.display == 'flex') document.getElementById('settingsWindow').style.display = 'none';
                if (document.getElementById('manualAddSolve').style.display == 'flex') document.getElementById('manualAddSolve').style.display = 'none';
                windowOpen = false;
            }

            //confirm delete last solve prompt (enter)
            if (document.getElementById('deleteLastSolve').style.display == 'flex') {
                if (e.keyCode === 13) {
                    deleteLastSolve();
                }
            }

            //confirm add manual solve prompt (enter)
            if (document.getElementById('manualAddSolve').style.display == 'flex') {
                if (e.keyCode === 13) {
                    addSolve();
                }
            }
        } else {
            if (e.keyCode === 32) {
                watch.reset();
                readyCheck();
                heldCount += 1;
            }

            //previous scramble (left arrow)
            if (e.keyCode === 37 && scrambleIndex > 0) {
                scrambleIndex -= 1;
                scramble.textContent = scrambles[scrambleIndex];
            }
        
            //next scramble (right arrow)
            if (e.keyCode === 39 && scrambleIndex < scrambles.length-1) {
                scrambleIndex += 1;
                scramble.textContent = scrambles[scrambleIndex];
            }

            //manually add solve (shift)
            if (e.keyCode === 16) {
                document.getElementById("manualAddSolve").style.display = "flex";
                document.getElementById("manualSolveInput").focus();

                windowOpen = true;
            }
        
            //delete last solve (backspace)
            if (e.keyCode === 8 && solves.length > 0) {
                document.getElementById("deleteLastSolve").style.display = "flex";
                windowOpen = true;
            }
        }
    }
}