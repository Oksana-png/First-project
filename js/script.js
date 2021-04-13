'Use strict';

const books = document.querySelectorAll('.book');
const booksWrapper = document.querySelector('.books');
const imageBody = document.querySelector('body');
const titleBook = document.querySelectorAll('h2>a');
const promotion = document.querySelector('.adv');
const ulItem = document.querySelectorAll('ul');
const chapters = document.querySelectorAll('ul>li');
const chapterClone = chapters[3].cloneNode(true);

booksWrapper.prepend(books[1]);
booksWrapper.append(books[2]);
books[0].after(books[4]);

imageBody.style.backgroundImage = 'url("image/you-dont-know-js.jpg")';

// меняем заголовок
titleBook[4].textContent = 'Книга 3. this и Прототипы Объектов';

promotion.remove();

console.log(chapters);

// книга 2
ulItem[0].append(chapters[2]);
ulItem[0].append(chapters[10]);
chapters[9].before(chapters[7]);
chapters[3].after(chapters[6], chapters[8]);

// книга 5
chapters[47].after(chapters[55], chapters[49], chapters[50]);
chapters[54].before(chapters[51]);

chapterClone.textContent = 'Глава 8: За пределами ES6';
chapters[25].after(chapterClone);