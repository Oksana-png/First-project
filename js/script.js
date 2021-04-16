'Use strict';

document.addEventListener('DOMContentLoaded', function() {
  const DomElement = function(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  this.newElem = '';
  };

  DomElement.prototype.select = function() {
    this.newElem = document.createElement('div');

    if(this.selector.slice(0, 1) === '.') {
      this.newElem.classList.add(this.selector.slice(1));
    } else if(this.selector.slice(0, 1) === '#') {
      this.newElem.setAttribute('id', this.selector.slice(1));
    }

    this.newElem.style.height = this.height;
    this.newElem.style.width = this.width;
    this.newElem.style.backgroundColor = this.bg;
    this.newElem.style.fontSize = this.fontSize;
    this.newElem.style.position = 'absolute';
    document.querySelector('body').append(this.newElem);
  };

  const elem = new DomElement('#block', '100px', '100px', 'blue', '45px');
  elem.select();

  let top = 0;
  let left = 0;
  let px = 'px';
  const moveCube = function(event) {
    const code = event.code;
    if(code === 'ArrowUp') {
      top -= 10;
      elem.newElem.style.top = top + px;
    } else if(code === 'ArrowDown') {
      top += 10;
      elem.newElem.style.top = top + px;
    } else if(code === 'ArrowLeft') {
      left -= 10;
      elem.newElem.style.left = left + px;
    } else if(code === 'ArrowRight') {
      left += 10;
      elem.newElem.style.left = left + px;
      console.log(left);
    }
  };
  
  document.querySelector('body').addEventListener('keydown', moveCube);
});