var commentsMocks = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var descriptionMocks = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var namesMocks = [
  'Артём',
  'Екатерина',
  'Олег',
  'Василий',
  'Лиза',
  'Александр',
  'Анна',
  'Эльза'
];

var arrObjectsPhotos = [];
var numberOffObject = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_AVATAR = 1;
var MAX_AVATAR = 6;


var generateRandomNumber = function(min, max){
  return Math.floor(min + Math.random() * (max + 1 - min));
};


var shuffleRandomArr = function(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var random = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[random];
    arr[random] = temp;
  }
  return arr;
}


var generateRandomComments = function(arr) {
  var comments = [];
  for (i = 0; i < numberOffObject; i++) {
    comments[i] = shuffleRandomArr(arr).slice(0, generateRandomNumber(1, 2));
    return comments[i];
  }
}

comments = generateRandomComments(commentsMocks);


var generateRandomElement = function(arr) {
  return arr[generateRandomNumber(0, arr.length - 1)];
}


var generateRandomUrl = function (number) {
  var urlArrNumbers = [];
  for (i = 0; i < number; i++) {
    urlArrNumbers[i] = i + 1;
  }
  return shuffleRandomArr(urlArrNumbers);
}

urlArrNumbers = generateRandomUrl(numberOffObject);

var generateArrObjectsComments = function(number) {
var commentsArrObjects = [];
  //for (i = 0; i < number; i++) {
    commentsArrObjects[i] = {
      avatar: 'img/avatar-' + generateRandomNumber(MIN_AVATAR, MAX_AVATAR) + '.svg',
      message: generateRandomElement(commentsMocks),
      name: generateRandomElement(namesMocks)
    }
// поменять имя функции на ед.число
  //}
   return commentsArrObjects;
}


var generateArrObjectsPhoto = function(number) {
  for (i = 0; i < number; i++) {
    arrObjectsPhotos[i] = {
      url: 'photos/' + urlArrNumbers[i] + '.jpg',
      likes: generateRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: generateArrObjectsComments(number)
    };
  // return arrObjectsPhotos[i];
  }
 return arrObjectsPhotos;
}
arrObjectsPhotos = generateArrObjectsPhoto(numberOffObject);
console.log(arrObjectsPhotos);


var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
var picturesContainer = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

var createPictures = function(element) {
  var pictureElement = templatePicture.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = element.url;
  pictureElement.querySelector('.picture__likes').textContent = element.likes;
  pictureElement.querySelector('.picture__comments').textContent = element.comments;

  return pictureElement;
}

/*var createFragment = function(element) {

for (var i = 0; i < 25; i++) {
  var pictureElement = templatePicture.cloneNode(true);
  pictureElement.querySelector('.picture__likes').textContent = arrObjectsPhotos[i].likes;
  pictureElement.querySelector('.picture__img').setAttribute('src', arrObjectsPhotos[i].url);
  //pictureElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;

  //picturesContainer.appendChild(fragment);
}
return pictureElement;
}*/
function createFragment(element) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < element.length; i++) {
    fragment.appendChild(createPictures(arrObjectsPhotos[i]));
  }
  return fragment;
}
picturesContainer.appendChild(createFragment(arrObjectsPhotos));


console.log(picturesContainer);


/*for (i = 0; i < 5; i++) {
    arrObjectsPhotos[i] = {
      url: 'photos/' + urlArrNumbers[i] + '.jpg',
      likes: generateRandomNumber(MIN_LIKES, MAX_LIKES),
      //comments: generateArrObjectsComments(5)
    }
    //console.log(i, arrObjectsPhotos[i]);
}*/

/*var createArr = function(num){
var arr = [];
for (var i = 0; i < num; i++){
  arr[i] = i + 1;
}
return arr;
}
console.log(createArr(7));

var url = [];
url = fisher(createArr(numberOffobject));
console.log(url);*/




/*console.log(generateRandomDescription());*/
