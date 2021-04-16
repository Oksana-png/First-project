'Use strict';

const headerInput = document.querySelector('.header-input');
const todoControl = document.querySelector('.todo-control');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const todoData = [];

const render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  todoData.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
      
    li.innerHTML = `
      <span class="text-todo">${item.value}</span>
      <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
    `;

    if(item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    const todoComplete = li.querySelector('.todo-complete');
    todoComplete.addEventListener('click', function () {
      item.completed = !item.completed;
      render();
    });
    const todoRemove = li.querySelector('.todo-remove');
    todoRemove.addEventListener('click', function () {
      li.remove();
    });
  });
};

const addTodo = function () {
  const newTodo = {
    value: headerInput.value,
    completed: false,
  };
  headerInput.value = '';
  todoData.push(newTodo);
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();
  if (headerInput.value.trim() === '') {
    return;
  }
  addTodo();
  render();
});
// при нажатии на ENTER 
document.addEventListener('keydown', function (event) {
  if (headerInput.value.trim() === '') {
    return;
  }
  if(event.key === 'Enter') {
    addTodo();
    render();
  }
});

render();
