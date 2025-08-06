const button = document.querySelector('button');
const body = document.querySelector('body');
const p = document.querySelector('p');

const changeColour = function () {
    body.style.backgroundColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
}

button.addEventListener('click', changeColour);

document.body.onkeydown = (e) => {
    if (e.keyCode == 32) {
        changeColour();
    }
}

p.addEventListener('click', () => {
    p.style.opacity = 100;
    p.style.cursor = 'auto';
});