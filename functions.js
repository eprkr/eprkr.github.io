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

//BEGIN UPDATE FUNCTIONS

function updateStatistics() {
    //Best Single + Worst Single
    if (solves.length > 0) {var bestSingle = Math.min.apply(Math, solves);}
    else {var bestSingle = "0.00";}

    var worstSingle = Math.max.apply(Math, solves);

    //Best Average of 5 + Best Average of 12
    var ao5Slice = ao5s.slice(5, ao5s.length);
    var ao12Slice = ao12s.slice(12, ao12s.length);

    if (solves.length > 5) {var bestAo5 = Math.min.apply(Math, ao5Slice);}
    else {var bestAo5 = "0.00";}

    if (solves.length > 12) {var bestAo12 = Math.min.apply(Math, ao12Slice);}
    else {var bestAo12 = "0.00";}

    //Session Average + Session Mean
    var sumOfSesh = 0;
    var sumRemove = bestSingle + worstSingle;

    if (solves.length > 0) {
        for (var i = 0; i < solves.length; i++) {
            sumOfSesh += solves[i];
        }

        var seshMean = sumOfSesh / solves.length;

        if (solves.length > 2) {
            var seshAverage = (sumOfSesh - sumRemove) / (solves.length-2);
        } else {
            var seshAverage = seshMean;
        }
    } else {seshAverage = "0.00"; seshMean = "0.00";}

    //Average of 100
    if (solves.length > 99) {
        var sliceOf100 = solves.slice(Math.max(solves.length - 100));
        var sumOf100 = 0;
        var bestOf100 = Math.min.apply(Math, sliceOf100);
        var worstOf100 = Math.max.apply(Math, sliceOf100);
        var sumRemove = bestOf100 + worstOf100;

        for (var i = 0; i < 100; i++) {
            sumOf100 += solves[i];
        }

        var averageOf100 = (sumOf100 - sumRemove) / 98;

    } else {var averageOf100 = "0.00";}

    //Average of 1000
    if (solves.length > 999) {
        var sliceOf100 = solves.slice(Math.max(solves.length - 1000));
        var sumOf1000 = 0;
        var bestOf1000 = Math.min.apply(Math, sliceOf1000);
        var worstOf1000 = Math.max.apply(Math, sliceOf1000);
        var sumRemove = bestOf1000 + worstOf1000;

        for (var i = 0; i < 1000; i++) {
            sumOf1000 += solves[i];
        }

        var averageOf1000 = (sumOf1000 - sumRemove) / 998;

    } else {var averageOf1000 = "0.00";}

    //Set all the statistics
    //document.getElementById('statsSessionAverage').textContent = timeFormatter(seshAverage);
    //document.getElementById('statsSessionMean').textContent = timeFormatter(seshMean);

    document.getElementById('statsBestSingle').textContent = timeFormatter(bestSingle);
    document.getElementById('statsBestAo5').textContent = timeFormatter(bestAo5);
    document.getElementById('statsBestAo12').textContent = timeFormatter(bestAo12);

    if (ao5s.length > 0) {document.getElementById('statsAo5').textContent = timeFormatter(ao5s[ao5s.length-1]);}
    else {document.getElementById('statsAo5').textContent = "0.00";}

    if (ao12s.length > 0) {document.getElementById('statsAo12').textContent = timeFormatter(ao12s[ao12s.length-1]);}
    else {document.getElementById('statsAo12').textContent = "0.00";}

    document.getElementById('statsAo100').textContent = timeFormatter(averageOf100);
}

function updateSettings() {
    //setActiveStyleSheet("default");

    //use inspection times
    if (localStorage.getItem("inspectionTime") == null) {inspectionTime = false;} else {inspectionTime = JSON.parse(localStorage.getItem("inspectionTime"));}
    if (inspectionTime == true) {document.getElementById("checkBoxInspection").checked = true; inspect = true;} else {document.getElementById("checkBoxInspection").checked = false; inspect = false;}

    //use warning audio
    if (localStorage.getItem("warningAudio") == null) {warningAudio = false;} else {warningAudio = JSON.parse(localStorage.getItem("warningAudio"));}
    if (warningAudio == true) {document.getElementById("checkBoxWarningAudio").checked = true;} else {document.getElementById("checkBoxWarningAudio").checked = false;}

    //updating warning voice
    if (localStorage.getItem("warningVoice") == null) {warningVoice = 'male';} else {warningVoice = JSON.parse(localStorage.getItem("warningVoice"));}
    document.getElementById('warningVoiceSelect').value = warningVoice;

    //hide time during solves
    if (localStorage.getItem("hideTime") == null) {hideTime = false;} else {hideTime = JSON.parse(localStorage.getItem("hideTime"));}
    if (hideTime == true) {document.getElementById("checkBoxHideShowTime").checked = true;} else {document.getElementById("checkBoxHideShowTime").checked = false;}

    if (localStorage.getItem("hideText") == null) {hideText = false;} else {hideText = JSON.parse(localStorage.getItem("hideText"));}
    if (hideText == true) {document.getElementById("checkBoxHideShowText").checked = true;} else {document.getElementById("checkBoxHideShowText").checked = false;}

    //draw scramble
    /*var scrambleDiv = document.getElementById("scrambleDiv");
    if (localStorage.getItem("drawScramble") == null) {drawScramble = false; scrambleDiv.style.display = "none";} else {drawScramble = JSON.parse(localStorage.getItem("drawScramble")); 
    if (drawScramble == false) {scrambleDiv.style.display = "none"} else {scrambleDiv.style.display = "block";}}
    document.getElementById("checkBoxHideShowScramble").checked == drawScramble;*/

    //update selected scramble
    updateScrambleBox();
}

function updateScrambleBox() {
    var selectBox = document.getElementById("selectBoxScramble");

    if (localStorage.getItem("scrambleType") === null) {
        selectBox.value = "333";
    } else {
        selectBox.value = JSON.parse(localStorage.getItem("scrambleType"));
    }
}

//END UPDATE FUNCTIONS

//BEGIN SETTINGS MENU FUNCTIONS

function saveSettings() {
    document.getElementById("settingsWindow").style.display = "none";
    windowOpen = false;
    window.location.reload(true);
}

function hideShowTime() {
    if (hideTime == true) {
        hideTime = false;
    } else {
        hideTime = true;
    }

    localStorage.setItem("hideTime", JSON.stringify(hideTime));
}

function hideShowText() {
    if (hideText == true) {
        hideText = false;
    } else {
        hideText = true;
    }

    localStorage.setItem("hideText", JSON.stringify(hideText));
}

//END SETTINGS MENU FUNCTIONS

//BEGIN TOP BAR BUTTONS

function solveApplyOK() {
    if (mods[solves.length-1] != 0) {
        mods[solves.length-1] = 0;

        solves[solves.length-1] -= 2000;

        localStorage.setItem("sessions", JSON.stringify(sessions));
        localStorage.setItem("seshNames", JSON.stringify(seshNames));
    
        localStorage.setItem("solves", JSON.stringify(solves));
        localStorage.setItem("ao5s", JSON.stringify(ao5s));
        localStorage.setItem("ao12s", JSON.stringify(ao12s));
    
        localStorage.setItem("mods", JSON.stringify(mods));
    
        updateStatistics();
        
        window.location.reload(true);
    }
}

function solveApplyPlus2() {
    if (mods.length != 0 && mods[solves.length-1] != 1) {
        mods[solves.length-1] = 1;

        solves[solves.length-1] += 2000;
        
        localStorage.setItem("sessions", JSON.stringify(sessions));
        localStorage.setItem("seshNames", JSON.stringify(seshNames));

        localStorage.setItem("solves", JSON.stringify(solves));
        localStorage.setItem("ao5s", JSON.stringify(ao5s));
        localStorage.setItem("ao12s", JSON.stringify(ao12s));

        localStorage.setItem("mods", JSON.stringify(mods));

        updateStatistics();

        window.location.reload(true);
    }
}

function solveApplyDNF() {
    if (mods[solves.length-1] != 2) {
        /*mods[solves.length-1] = 2;

        solves[solves.length-1] = "DNF";

        localStorage.setItem("sessions", JSON.stringify(sessions));
        localStorage.setItem("seshNames", JSON.stringify(seshNames));

        localStorage.setItem("solves", JSON.stringify(solves));
        localStorage.setItem("ao5s", JSON.stringify(ao5s));
        localStorage.setItem("ao12s", JSON.stringify(ao12s));

        localStorage.setItem("mods", JSON.stringify(mods));

        updateStatistics();

        window.location.reload(true);*/
        alert("DNF is currently not working! Check back later. Thanks for using RoboTimer.");
    }
}

function openDeleteWindow() {
    if (solves.length > 0) {
        document.getElementById("deleteLastSolve").style.display = "flex";
        windowOpen = true;
    }
}

function openSessionsWindow() {
    alert("Currently under construction!");
    //document.getElementById("sessionsContainer").style.display = "flex";
    //windowOpen = true;
}

function openSettingsWindow() {
    document.getElementById("settingsWindow").style.display = "flex";
    windowOpen = true;
}

//END TOP BAR BUTTONS

function toggleInspection() {
    if (inspectionTime == true) {inspectionTime = false; inspect = false;}
    else {inspectionTime = true; inspect = true;}

    localStorage.setItem("inspectionTime", JSON.stringify(inspectionTime));
}

function toggleInspectionDir() {
    if (inspectionDir == "up") {inspectionDir = "up";}
    else {inspectionDir = "down";}

    localStorage.setItem("inspectionDir", JSON.stringify(inspectionDir));
}

function toggleWarningAudio() {
    if (warningAudio == true) {warningAudio = false;}
    else {warningAudio = true;}

    localStorage.setItem("warningAudio", JSON.stringify(warningAudio));
}

function changeWarningVoice() {
    warningVoice = document.getElementById("warningVoiceSelect").value;
    localStorage.setItem("warningVoice", JSON.stringify(warningVoice));
}

function openAverageWindow() {
    generateAverage();
    document.getElementById('genAverageText').style.display = 'flex';
    document.getElementById('genAvgTextArea').value = generatedAverage;
    windowOpen = true;
}

function generateAverage() {
    //get current date
    var today = new Date();
    var month = today.getUTCMonth() + 1;
    var day = today.getUTCDate();
    var year = today.getUTCFullYear();

    fullDate = month + "/" + day + "/" + year;

    //get last 5 scrambles and remove excess spaces
    scrambleString1 = usedScrambles[solves.length-5];
    scrambleString2 = usedScrambles[solves.length-4];
    scrambleString3 = usedScrambles[solves.length-3];
    scrambleString4 = usedScrambles[solves.length-2];
    scrambleString5 = usedScrambles[solves.length-1];
    
    fixedScramble1 = scrambleString1.replace(/  +/g, ' ');
    fixedScramble2 = scrambleString2.replace(/  +/g, ' ');
    fixedScramble3 = scrambleString3.replace(/  +/g, ' ');
    fixedScramble4 = scrambleString4.replace(/  +/g, ' ');
    fixedScramble5 = scrambleString5.replace(/  +/g, ' ');

    generatedAverage = "Generated by PolyTimer.net on " + fullDate + 
    "\nAverage of 5: " + timeFormatter(ao5s[ao5s.length-1]) + "\n\n" +
    "1) " + timeFormatter(solves[solves.length-5]) + " - " + fixedScramble1 + "\n" +
    "2) " + timeFormatter(solves[solves.length-4]) + " - " + fixedScramble2 + "\n" +
    "3) " + timeFormatter(solves[solves.length-3]) + " - " + fixedScramble3 + "\n" +
    "4) " + timeFormatter(solves[solves.length-2]) + " - " + fixedScramble4 + "\n" +
    "5) " + timeFormatter(solves[solves.length-1]) + " - " + fixedScramble5;
}

function copyAvgText() {
    var textArea = document.getElementById('genAvgTextArea');
    textArea.select();
    document.execCommand("copy");
}

function clearSolves() {
    //if (confirm("Really delete all of your saved data?") == true) {
        localStorage.clear();
        window.location.reload(true);
    //}
}

function changeScramble() {
    var selectBox = document.getElementById("selectBoxScramble");
    var selectedVal = selectBox.options[selectBox.selectedIndex].value;

    scrambleType = selectedVal;
    localStorage.setItem("scrambleType", JSON.stringify(scrambleType));
    //window.location.reload(true);
}

function removeElement(elementId) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function addSolve() {
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

    var userInput = document.getElementById("manualSolveInput").value;
    var msTime = toMS(userInput);

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

    document.getElementById('manualSolveInput').value = '';
    document.getElementById('manualAddSolve').style.display = 'none';
    windowOpen = false;
}

function deleteLastSolve() {
    document.getElementById("deleteLastSolve").style.display = "none";
    windowOpen = false;

    solves.pop();
    ao5s.pop();
    ao12s.pop();
    usedScrambles.pop();
    mods.pop();

    var row = table.deleteRow(1);
    timer.textContent = "0.00";

    localStorage.setItem("sessions", JSON.stringify(sessions));
    localStorage.setItem("seshNames", JSON.stringify(seshNames));

    localStorage.setItem("solves", JSON.stringify(solves));
    localStorage.setItem("ao5s", JSON.stringify(ao5s));
    localStorage.setItem("ao12s", JSON.stringify(ao12s));

    localStorage.setItem("mods", JSON.stringify(mods));

    updateStatistics();
}

function eraseData() {
    if (confirm("Erase all data? (This will also reset your settings)")) {
        localStorage.clear();
        window.location.reload(true);
    }
}