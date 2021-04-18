'use strict';

document.addEventListener('DOMContentLoaded', function() {
  const buttonReg = document.querySelector('.buttons__reg');
  const buttonAuthoized = document.querySelector('.buttons__autorazed');

  const user = [
    {
    //   'firstName': '',
    //   'lastName': '',
    //   'login': '',
    //   'password': '',
    //   'regDate': '',
    },
  ];

  const reg = function() {
    let userName = prompt('Введите ваше имя и фамилию через пробел');
    let login = prompt('Введите логин');
    let password = prompt('Введите пароль');
    let date = new Date();

    let index = user.length;
    console.log(index);
    let userData = userName.split(' ');
    user[index].firstName = userData[0];
    user[index].lastName = userData[1];
    console.log(user);
  };

  buttonReg.addEventListener('click', reg);

});