class First {
  hello() {
    console.log(`Привет, я метод родителя!`);
  }
}

class Second extends First {
  hello() {
    super.hello();
    console.log(`Привет, а я наследуемый метод!`);
  }
}
const a = new Second();
a.hello();
