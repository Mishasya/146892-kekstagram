'use strict';

var NUMERAL = 25;
var MIN_NUMBER_LENGTH = 0;
var MAX_NUMBER_LENGTH = 24;
var MIN_PHOTO = 1;
var MIN_LIKES = 15;
var MAX_LIKES = 199;
var randomNumber = function (from, to) {
    return Math.round((Math.random() * (to - from + 1)) + from);
  }

var numberUrl = [];

while (numberUrl.length < NUMERAL) {

  var urlRate = randomNumber(1, 24);

  for (var i = 0; i <= numberUrl.length; i++) {
    var a = 0;
    if (urlRate === numberUrl[i]) {
    break
    } else {
      a = urlRate
    };
  }
  if (a){
    numberUrl.push(a);
  }
}

for (i = 0; i < numberUrl.length; i++){
  numberUrl[i] = 'photos/' + numberUrl[i] + '.jpg';
}

//Likes

var likes = [];

for (i = 0; i < numberUrl.length; i++) {
  likes[i] = randomNumber(15, 199);
  likes[i] = likes[i].toString();
}

//Comments and description

var commentsMock = [
'Всё отлично!',
'В целом всё неплохо. Но не всё.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var comments = [];

var randomPhrase;

for (i = 0; i < numberUrl.length; i++) {
  randomPhrase = randomNumber(0, 4);
  comments[i] = commentsMock[randomPhrase];
  if (i % 5 === 0) {
    if (randomPhrase === 0) {
      comments[i] +=' ' + commentsMock[randomPhrase + 1]
    } else {
      comments[i] +=' ' + commentsMock[randomPhrase - 1]
    }
  }
}

//description

var descriptionMock = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
]

var description = [];

for (i = 0; i < numberUrl.length; i++) {
  randomPhrase = randomNumber(0, 4);
  description[i] = descriptionMock[randomPhrase];
}

//Total array

var totalArrElements = [];

for (i = 0; i < numberUrl.length; i++) {
  totalArrElements[i] = 'photos/' + numberUrl[i] + '.jpg' + likes[i] + comments[i] + description[i];
}

//Create DOM-elements

var photosUsers = document.querySelector('.pictures');

var fragment = document.createDocumentFragment();

var makeElement = function (tagName, className) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

for (i = 0; i < numberUrl.length; i++) {
  var link = makeElement ('a', 'picture');

  var image = makeElement ('img', 'picture__img');
  image.src = numberUrl[i];
  link.appendChild(image);

  var paragraph = makeElement ('p', 'picture__info');
  link.appendChild(paragraph);

  var pictureComments = makeElement ('span', 'picture__comments');
  pictureComments.textContent = comments[i].length;
  paragraph.appendChild(pictureComments);

  var pictureLikes = makeElement ('span', 'picture__likes');
  pictureLikes.textContent = likes[i];
  paragraph.appendChild(pictureLikes);

  fragment.appendChild(link);
}

photosUsers.appendChild(fragment);

//Big photo

i = randomNumber(0, 24);

var bigPhoto = document.querySelector('.big-picture');
bigPhoto.classList.remove('hidden');

bigPhoto.querySelector('.big-picture__img').src = numberUrl[i];
bigPhoto.querySelector('.likes-count').textContent = likes[i];
bigPhoto.querySelector('.comments-count').textContent = comments.length;
bigPhoto.querySelector('.social__caption').textContent = description[i];
bigPhoto.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPhoto.querySelector('.comments-loader').classList.add('visually-hidden');

var socialComment = document.querySelectorAll('.social__comment');

for (i = 0; i < socialComment.length; i++) {
  socialComment[i].querySelector('.social__picture').src =  'img/avatar-' + randomNumber(1, 5) + '.svg';
  socialComment[i].querySelector('.social__text').textContent = comments[i];
}





