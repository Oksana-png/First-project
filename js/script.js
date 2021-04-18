"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const buttonReg = document.querySelector(".buttons__reg");
  const buttonAuthorized = document.querySelector(".buttons__autorazed");
  const userList = document.querySelector(".user__list");
  const titleName = document.querySelector(".title__name");
  let removeUserBtns = document.querySelectorAll(".button-cross");
  let user = [];
  const removeUser = function (e) {
    let str = e.target.closest(".user__item").textContent;
    const name = str.slice(5, str.indexOf(","));
    const lastName = str.slice(str.indexOf("фамилия") + 9, str.indexOf(", з"));
    const date = str.substring(str.length, str.lastIndexOf("н:") + 3);
    let userRemove = {
      firstName: name,
      lastName: lastName,
      regDate: date,
    };
    let value = JSON.stringify(userRemove);
    Object.keys(localStorage).forEach(function (item) {
      if (value === localStorage.getItem(item)) {
        localStorage.removeItem(item);
        localStData();
      }
    });
    removeUserBtns = document.querySelectorAll(".button-cross");
  };
  const render = function () {
    userList.textContent = "";
    user.forEach(function (item) {
      let newUser = document.createElement("li");
      newUser.classList.add("user__item");
      newUser.innerHTML = `Имя: ${item.firstName}, фамилия: ${
        item.lastName || "не указано"
      }, зарегистрирован: ${
        item.regDate
      }<button class="button-cross"><img class="cross" src="cancel.svg" alt="cross"></button>`;
      userList.append(newUser);
    });
    removeUserBtns = document.querySelectorAll(".button-cross");
    removeUserBtns.forEach(function (item) {
      item.addEventListener("click", removeUser);
    });
  };

  const localStData = function () {
    // получает из localStorage данные в объект user
    user = [];
    Object.keys(localStorage).forEach(function (item) {
      let use = JSON.parse(localStorage.getItem(item));
      const newUser = {
        firstName: use.firstName,
        lastName: use.lastName,
        regDate: use.regDate,
      };
      user.push(newUser);
    });
    render();
  };

  const reg = function () {
    let userName = prompt("Введите ваше имя и фамилию через пробел");
    let userData = userName.split(" ");

    if (userName.split(" ").length > 2) {
      alert("Введите только имя и фамилию через пробел!");
      return;
    }
    let login = prompt("Введите логин");
    let password = prompt("Введите пароль");
    let date = new Date();

    const settDate = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    date = date.toLocaleString("ru", settDate);

    const newUser = {
      firstName: userData[0],
      lastName: userData[1] ? userData[1].trim() : "не указано",
      login: login.trim(),
      password: password.trim(),
      regDate: date,
    };
    user.push(newUser);

    let value = {
      login: login,
      password: password,
    };
    let key = {
      firstName: userData[0],
      lastName: userData[1] ? userData[1].trim() : "не указано",
      regDate: date,
    };
    localStorage.setItem(JSON.stringify(value), JSON.stringify(key));
    render();
  };

  const authorization = function () {
    let login = prompt("Введите ваш логин");
    let password = prompt("Введите ваш пароль");

    let key = {
      login: login,
      password: password,
    };
    let value = localStorage.getItem(JSON.stringify(key));
    value = JSON.parse(value);
    if (value !== null) {
      titleName.textContent = value.firstName;
    } else {
      alert("Введенные данные не верны! Такого пользователя нет!");
    }
  };

  localStData();

  buttonReg.addEventListener("click", reg);
  buttonAuthorized.addEventListener("click", authorization);

  removeUserBtns.forEach(function (item) {});
});
