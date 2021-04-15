'Use strict';

let color = Math.round(Math.random() * 16777216);

color = color.toString(16);

const titleColor = document.querySelector('.title');
const button = document.querySelector('.button');
const wrapperColor = document.querySelector('.wrapper');

button.addEventListener('click', function() {
  color = Math.round(Math.random() * 16777216);
  color = color.toString(16);

  titleColor.textContent = `#${color}`;
  wrapperColor.style.backgroundColor = `#${color}`;
});