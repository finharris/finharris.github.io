const playButton = document.querySelector('#playButton');
const setupDiv = document.querySelector('#setup');
const playDiv = document.querySelector('#main');
const number = document.querySelector('#number');
const maxValBox = document.querySelector('#maxValue');
var maxValue = 100;
var score = 0;

function getNewNum() {
    return Math.round(Math.random() * maxValue);
}

const scoreP = document.querySelector('#score');
function addScore(s) {
    score += s;
    scoreP.innerHTML = `Score: ${score}`;
}
function resetScore() {
    score = 0;
    scoreP.innerHTML = `Score: ${score}`;
}

playButton.addEventListener('click', () => {
    maxValue = Math.round(parseInt(maxValBox.value));
    if (!maxValue) { return }
    if (maxValue >= 10000000000) { alert('Number too large.'); return }
    setupDiv.style.display = 'none';
    playDiv.style.display = 'flex';
    number.innerHTML = getNewNum();
})

const higherButton = document.querySelector('#higherButton');
const lowerButton = document.querySelector('#lowerButton');

function higher() {
    let newNum = getNewNum();
    if (parseInt(number.innerHTML) <= newNum) {
        addScore(1);
        number.innerHTML = newNum;
    } else {
        alert(`Wrong, Game Over.\nScore was: ${score}`)
        resetScore();
        number.innerHTML = newNum;

    }
    return
}

function lower() {
    let newNum = getNewNum();
    if (parseInt(number.innerHTML) >= newNum) {
        addScore(1);
        number.innerHTML = newNum;
    } else {
        alert(`Wrong, Game Over.\nScore was: ${score}`)
        resetScore();
        number.innerHTML = newNum;

    }
    return
}

higherButton.addEventListener('click', higher);
lowerButton.addEventListener('click', lower);

document.body.onkeyup = (e) => {
    if (e.keyCode == 38) {
        higher();
    } else if (e.keyCode == 40) {
        lower();
    }
}

function restart() {
    setupDiv.style.display = 'flex';
    playDiv.style.display = 'none';
    maxValBox.value = '';
}

const restartButton = document.querySelector('#restart');
restartButton.addEventListener('click', restart)