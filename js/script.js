'Use strict';

const headerInput = document.querySelector('.header-input');
const todoControl = document.querySelector('.todo-control');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  let li;
  todoData.forEach(function (item) {
    li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `
      <span class="text-todo">${item.value}</span>
      <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
    `;

    completed(item, li);
  });
};

const completed = function(i, elem) {
  if(i.completed) {
    todoCompleted.append(elem);
  } else {
    todoList.append(elem);
  }
};

const removeItem = function() {
  let parent = this.closest('.todo-item');
  let textValue = parent.querySelector('.text-todo').textContent;
  let key = {
    'value': textValue,
  };
  let remObj = JSON.stringify(key);
  localStorage.removeItem(remObj);
  localParseObj();
};
// добавить пункт меню
const addTodo = function () {
  const newTodo = {
    value: headerInput.value,
    completed: false,
  };
  headerInput.value = '';
  todoData.push(newTodo);
  // добавление пунтка в localStorage
  todoData.forEach(function(item) {
    let value = {
      'value': item.value,
    };
    let key = {
      'completed': item.completed,
    };
    localStorage.setItem(JSON.stringify(value), JSON.stringify(key));
  });
  // берем данные из нового обьекта и там вызываем рендер
  localParseObj();
};

const complet = function() {
  let parent = this.closest('.todo-item');
  let textValue = parent.querySelector('.text-todo').textContent;
  
  let value = {'value': textValue};
  let valueComplet = JSON.parse(localStorage.getItem(JSON.stringify(value)));
  
  let key = {'completed': !valueComplet.completed};
  localStorage.setItem(JSON.stringify(value), JSON.stringify(key));

  localParseObj();
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();
  if (headerInput.value.trim() === '') {
    return;
  }
  addTodo();
});
// при нажатии на ENTER добавление пунтка
document.addEventListener('keydown', function (event) {
  if (headerInput.value.trim() === '') {
    return;
  }
  if(event.key === 'Enter') {
    addTodo();
  }
});

const localParseObj = function() {
  //чистит объект
  todoData = [];
  // получает из localStorage данные в объкт appData
  Object.keys(localStorage).forEach(function(item) {
    let it = JSON.parse(item);
    let complet = JSON.parse(localStorage.getItem(item));
    const newTodo = {
      value: it.value,
      completed: complet.completed,
    };
    todoData.push(newTodo);
  });
  // выводит на экран фунцией
  render();
  // слушатель на корзину
  const todoRemove = document.querySelectorAll('.todo-remove');
  todoRemove.forEach(function(item) {
    item.addEventListener('click', removeItem);
  });
  const todoComplete = document.querySelectorAll('.todo-complete');
  todoComplete.forEach(function(item) {
    item.addEventListener('click', complet);
  });
};

localParseObj();




