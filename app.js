console.log(
  `1. Создать функцию, которая принимает два элемента. Функция проверяет, является ли первый элемент родителем для второго`
);

const isParent = (parent, child) => parent === child.closest(parent.tagName);


console.log(
  isParent(document.body.children[0], document.querySelector("mark"))
);

console.log(
  isParent(document.querySelector("ul"), document.querySelector("mark"))
);



console.log(`
`);

console.log(
  `2. Получить список всех ссылок, которые не находятся внутри списка ul`
);

// const links = Array.from(document.querySelectorAll('a'));
const links = document.querySelectorAll('a');

const aWithinUl = links.forEach(el => {
  if (!el.closest('ul')) console.log(el);
});
// это если вывести в консоль. 


const links1 = Array.from(document.links);

const aWithinUl1 = links1.filter(el => !el.closest('ul'));
// Это если получить новый массив ссылок. 
console.log(aWithinUl1);

console.log(`
`);



console.log(
  `3. Найти элемент, который находится перед и после списка ul`
);

const ul = document.querySelector('ul');
console.log(ul.previousElementSibling);
console.log(ul.nextElementSibling);

console.log(`
`);

console.log(
  `6. Создать таблицу + дополнение функционала (задача 7)`
);

//Исходные данные

const users = [{
    "_id": "5d220b10e8265cc978e2586b",
    "isActive": true,
    "balance": 2853.33,
    "age": 20,
    "name": "Buckner Osborne",
    "gender": "male",
    "company": "EMPIRICA",
    "email": "bucknerosborne@empirica.com",
    "phone": "+1 (850) 411-2997",
    "registered": "2018-08-13T04:28:45 -03:00",
    "nestedField": {
      total: 300
    }
  },
  {
    "_id": "5d220b10144ef972f6c2b332",
    "isActive": true,
    "balance": 1464.63,
    "age": 38,
    "name": "Rosalie Smith",
    "gender": "female",
    "company": "KATAKANA",
    "email": "rosaliesmith@katakana.com",
    "phone": "+1 (943) 463-2496",
    "registered": "2016-12-09T05:15:34 -02:00",
    "nestedField": {
      total: 400
    }
  },
  {
    "_id": "5d220b1083a0494655cdecf6",
    "isActive": false,
    "balance": 2823.39,
    "age": 40,
    "name": "Estrada Davenport",
    "gender": "male",
    "company": "EBIDCO",
    "email": "estradadavenport@ebidco.com",
    "phone": "+1 (890) 461-2088",
    "registered": "2016-03-04T03:36:38 -02:00",
    "nestedField": {
      total: 200
    }
  }
];


const table = document.querySelector('table');
table.style.width = '100%';
table.style['border-collapse'] = 'collapse';

const tableHeader = {
  num: '#',
  name: 'Name',
  email: 'Email',
  balance: 'Balance'
};


////////////////////////

//Решение


const tableHeaderRow = document.createElement('tr');
tableHeaderRow.style.border = '1px solid black';
tableHeaderRow.style.backgroundColor = '#D7D7D7';
tableHeaderRow.style.textAlign = 'left';


const thNum = document.createElement('th');
thNum.textContent = tableHeader.num;

const thName = document.createElement('th');
thName.textContent = tableHeader.name;

const thEmail = document.createElement('th');
thEmail.textContent = tableHeader.email;

const thBalance = document.createElement('th');
thBalance.innerHTML = tableHeader.balance;

tableHeaderRow.appendChild(thNum);
tableHeaderRow.appendChild(thName);
tableHeaderRow.appendChild(thEmail);
tableHeaderRow.appendChild(thBalance);

table.appendChild(tableHeaderRow);

tableOfUsers(users);

function tableOfUsers(arrOfUsers) {

  arrOfUsers.forEach((user, index) => {
    const {
      name,
      email,
      balance
    } = user;

    const tableRow = document.createElement('tr');
    tableRow.style.border = '1px solid grey';

    const cellNumber = document.createElement('td');
    cellNumber.innerHTML = ++index;

    const cellName = document.createElement('td');
    cellName.textContent = name;

    const cellEmail = document.createElement('td');
    cellEmail.textContent = email;

    const cellBalance = document.createElement('td');
    cellBalance.innerHTML = balance;


    tableRow.appendChild(cellNumber);
    tableRow.appendChild(cellName);
    tableRow.appendChild(cellEmail);
    tableRow.appendChild(cellBalance);

    table.appendChild(tableRow);
  });

  const tableTotalRow = document.createElement('tr');
  tableTotalRow.style.border = '1px solid grey';

  const emptyRow = document.createElement('td');
  emptyRow.innerHTML = '';
  const emptyRow2 = document.createElement('td');
  emptyRow2.innerHTML = '';
  const emptyRow3 = document.createElement('td');
  emptyRow3.innerHTML = '';

  const reducedBalance = arrOfUsers.reduce((acc, user) => acc + user.balance, 0);

  const totalBalance = document.createElement('td');
  totalBalance.innerHTML = reducedBalance.toFixed(2);
  totalBalance.style.color = 'red';
  totalBalance.style.fontWeight = 'bold';

  tableTotalRow.appendChild(emptyRow);
  tableTotalRow.appendChild(emptyRow2);
  tableTotalRow.appendChild(emptyRow3);
  tableTotalRow.appendChild(totalBalance);

  table.appendChild(tableTotalRow);
};


const sortBtn = document.querySelector('button');
sortBtn.addEventListener('click', e => {
  const {
    target
  } = e;
  if (target.firstElementChild.classList.contains('fa-caret-up')) {
    target.firstElementChild.classList.remove('fa-caret-up');
    target.firstElementChild.classList.add('fa-caret-down');
    users.sort((prevUser, nextUser) => nextUser.balance - prevUser.balance);
  } else if (target.firstElementChild.classList.contains('fa-caret-down')) {
    target.firstElementChild.classList.remove('fa-caret-down');
    target.firstElementChild.classList.add('fa-caret-up');
    users.sort((prevUser, nextUser) => prevUser.balance - nextUser.balance);
  };

  table.innerHTML = '';
  tableOfUsers(users);
});





console.log(`
`);

console.log(`1. По нажатию на кнопку "btn-msg" должен появиться алерт с тем текстом который находится в атрибуте data - text у кнопки.`);

const btn = document.querySelector('#btn-msg');
btn.addEventListener('click', () => alert(btn.dataset.text));

console.log(`
`);
console.log(`3. При нажатии на любой узел документа показать в элементе с id=tag имя тега нажатого элемента.`);

document.addEventListener('click', e => {
  const tagOfClickedElement = document.querySelector('#tag');
  tagOfClickedElement.textContent = `Tag: ${e.target.tagName}`
});


console.log(`
`);

console.log(`7. Дополнить функционал для таблицы из задачи 6. Создать кнопку которая будет при клике сортировать пользователей по возрастанию или убыванию поля balance при этом в кнопке должна показываться стрелка в какую сторону сейчас отсортированы пользователи. Иконки можете взять с font awesome, в качестве фреймворка использовался bootstrap.`);