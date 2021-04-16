'Use strict';

const DomElement = function(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
};

DomElement.prototype.select = function() {
  let newElem = document.createElement('div');

  if(this.selector.slice(0, 1) === '.') {
    newElem.classList.add(this.selector.slice(1));
  } else if(this.selector.slice(0, 1) === '#') {
    newElem.getAttribute(this.selector.slice(1));
  }

  newElem.style.height = this.height;
  newElem.style.width = this.width;
  newElem.style.backgroundColor = this.bg;
  newElem.style.fontSize = this.fontSize;
  newElem.textContent = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium veniam ullam accusamus reiciendis eum voluptatem rem commodi saepe accusantium quo? Cumque ratione facilis repellendus quos voluptatum impedit nihil, assumenda ut eos! Aut commodi culpa quod accusantium nisi fuga ab ratione quam quae expedita similique itaque sequi sed, ad cum repellendus!';
  document.querySelector('body').append(newElem);
  console.log(newElem);
};

const elem = new DomElement('.block', '250px', '100%', 'blue', '45px');

elem.select();