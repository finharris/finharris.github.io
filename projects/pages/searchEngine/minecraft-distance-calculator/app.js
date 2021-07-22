const calculateButton = document.querySelector('.calculate');

const inputs = document.querySelectorAll('.coords-text');

function checkValid(inps) {
  for (const input of inps) {
    const value = parseInt(input.value);
    if (!Number.isInteger(value)) {
      return false;
    }
  }
}

const output = document.querySelector('.output');

calculateButton.addEventListener('click', () => {
  if (checkValid(inputs) == false) {
    return console.log('invalid input');
  }

  const inps = [];

  inputs.forEach(input => {
    inps.push(parseInt(input.value));
  });

  let distance = Math.sqrt(
    (inps[3] - inps[0]) ** 2 +
      (inps[5] - inps[1]) ** 2 +
      (inps[5] - inps[2]) ** 2
  );

  console.log(distance);

  output.innerHTML = distance;
});
