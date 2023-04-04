// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const minWeightInput = document.querySelector('.minweight__input'); // поле с минимальным весом
const maxWeightInput = document.querySelector('.maxweight__input'); // поле с максимальным весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13, "borderColor": "violet"},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35, "borderColor": "green"},
  {"kind": "Личи", "color": "розово-красный", "weight": 17, "borderColor": "carmazin"},
  {"kind": "Карамбола", "color": "желтый", "weight": 28, "borderColor": "yellow"},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22, "borderColor": "lightbrown"}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);


/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {

  // очищаем fruitsList от вложенных элементов,
  const parent = document.querySelector('.fruits__wrapper');
  parent.innerHTML = '<h2 class="wrapper__title">🥑 Список экзотических фруктов</h2>';

  // добавляем новый элемент, чтобы заполнить его актуальными данными из fruits
  const ul = document.createElement('ul');
  ul.className = 'fruits__list';
  parent.append(ul);
  
  for (let i = 0; i < fruits.length; i++) {
      
    const li = document.createElement('li');
    li.innerHTML = `<div class="fruit__info"><div>index: ${i} </div><div>kind: ${fruits[i].kind} </div><div>color: ${fruits[i].color} </div><div>weight (кг):  ${fruits[i].weight} </div></div>`;
    li.className = `fruit__item`;
    if (fruits[i].borderColor.split('')[0] !== '#') {
      li.className = `fruit__item fruit_${fruits[i].borderColor}`;
    } else {
      li.style.background = fruits[i].borderColor;
    }
    ul.appendChild(li); 
  }
}

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {

let newArrfruit = [];

while (fruits.length > 0) {
  newArrfruit.push.apply(newArrfruit, (fruits.splice((getRandomInt(0, fruits.length-1)), 1,)));
}

return newArrfruit;
}

shuffleButton.addEventListener('click', () => {
   
  let initFruits = [].concat(fruits); 
  let result = shuffleFruits();
  fruits = result;

  JSON.stringify(result) === JSON.stringify(initFruits) ? alert ('Порядок не изменился!') : display(); // проверка на идентичность с предыдущим массивом
  
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let min = parseInt(minWeightInput.value);
  let max = parseInt(maxWeightInput.value);
  
  if (min > max || max < min || min == NaN || max == NaN) {
    alert('Некорректный интервал! Пожалуйста, введите верные значения.');
    return 0;
   } else { 
    const weight = fruits.filter(item => item.weight >= min && item.weight <= max);
    return weight;
  }
};

let iFilter = 0;

filterButton.addEventListener('click', () => {
  if (iFilter == 0){
  backupFruits = fruits;
  } else {
  fruits = backupFruits;
  }
  
  fruits = filterFruits();
  fruits.length == 0 ? alert('Нет такого фрукта!') : display();
  console.log(iFilter);
  iFilter++;
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки


const colorToNumber = (arr) => {
  let arr_ru = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'э', 'ю', 'я'];
  let arrColor = arr.split('');
  return arr_ru.indexOf(arrColor[0]);
}

const comparationColor = (firstEl, secondEl) => {

  return firstEl > secondEl ? true : false;

};

function swap(arr, i, j){
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function partition(arr, comparation, left, right) {
   var pivot = arr[Math.floor((right + left) / 2)];
       i = left;
       j = right;
   while (i <= j) {
       while (comparation(pivot.numColor, arr[i].numColor)) {
           i++;
       }
       while (comparation(arr[j].numColor, pivot.numColor)) {
           j--;
       }
       if (i <= j) {
           swap(arr, i, j);
           i++;
           j--;
       }
   }
   return i;
  }
  
  const sortAPI = {
    
    bubbleSort(arr, comparation) {
      
    const n = arr.length;
    for (let i = 0; i < n-1; i++) {
      for (let j = 0; j < n-1-i; j++) {
        if (comparation(arr[j].numColor, arr[j+1].numColor)) { 
          swap(arr, j, j+1);
        }
      }
    }
    return arr;                   
  },
  
  quickSort(arr, comparation, left, right) {
    var index;
    if (arr.length > 1) {
      left = typeof left != "number" ? 0 : left; 
      right = typeof right != "number" ? arr.length - 1 : right; 
      index = partition(arr, comparation, left, right); 
      if (comparation(index - 1, left)) {
        sortAPI.quickSort(arr, comparation, left, index - 1);
      }
      if (comparation(right, index)) {
        sortAPI.quickSort(arr, comparation, index, right);
      }
    }
    return arr;
  },
  
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  sortKind === 'bubbleSort' ? sortKind = 'quickSort' : sortKind = 'bubbleSort';
  sortKindLabel.textContent = sortKind;
  sortTimeLabel.textContent = '-';
});

const numColor = (arr) => {
  for(i=0; i <arr.length; i++){
    arr[i]['numColor'] = colorToNumber(arr[i].color);
  }
};

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  numColor(fruits);  // добавляем алфавитное значение цвета в массив
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/
// оставляем возможность вводить значения только на русском языке

let input = (input) =>{
  input.addEventListener('input',()=> {
    input.value = input.value.replace(/[^а-я, А-Я]/,'');
  });
}

input(kindInput);
input(colorInput);

addActionButton.addEventListener('click', () => {
  if (parseInt(weightInput.value) < 0) {
    alert('Значение веса не может быть меньше 0!');
    weightInput.value = '';
  } else {
    weightInput.value;
  } 
  
  let randomColor ='#' + (Math.random().toString(16) + '000000').substring(2,8);
  
  if (kindInput.value && colorInput.value && weightInput.value) {
    fruits.push({"kind": kindInput.value, "color": colorInput.value, "weight": weightInput.value, "borderColor": randomColor});
    iFilter = 0; // обнуляем счетчик фильтра
  } else {
    alert('Заполните все поля!');
  }
  display();
});