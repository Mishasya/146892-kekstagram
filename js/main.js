'use strict';

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
var commentsArrObject = [];
var numberOffObject = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_AVATAR = 1;
var MAX_AVATAR = 6;
var fragment = document.createDocumentFragment();
var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
var picturesContainer = document.querySelector('.pictures');


var generateRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};


var shuffleRandomArr = function (arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var random = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[random];
    arr[random] = temp;
  }
  return arr;
};

var comments = [];
var generateRandomComments = function (arr) {

  for (var i = 0; i < numberOffObject; i++) {
    comments[i] = shuffleRandomArr(arr).slice(0, generateRandomNumber(1, 2));
  }
  return comments;
};

comments = generateRandomComments(commentsMocks);


var generateRandomElement = function (arr) {
  return arr[generateRandomNumber(0, arr.length - 1)];
};

var urlArrNumbers = [];
var generateRandomUrl = function (number) {

  for (var i = 0; i < number; i++) {
    urlArrNumbers[i] = i + 1;
  }
  return shuffleRandomArr(urlArrNumbers);
};

urlArrNumbers = generateRandomUrl(numberOffObject);


var generateArrObjectComments = function () {
  commentsArrObject = {
    avatar: 'img/avatar-' + generateRandomNumber(MIN_AVATAR, MAX_AVATAR) + '.svg',
    message: generateRandomElement(commentsMocks),
    name: generateRandomElement(namesMocks)
  };
  return commentsArrObject;
};


var generateArrObjectsPhoto = function (number) {
  for (var i = 0; i < number; i++) {
    arrObjectsPhotos[i] = {
      url: 'photos/' + urlArrNumbers[i] + '.jpg',
      likes: generateRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: generateArrObjectComments(number)
    };
  }
  return arrObjectsPhotos;
};

arrObjectsPhotos = generateArrObjectsPhoto(numberOffObject);


var createPictures = function (element) {
  var pictureElement = templatePicture.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = element.url;
  pictureElement.querySelector('.picture__likes').textContent = element.likes;
  pictureElement.querySelector('.picture__comments').textContent = element.comments.length;

  return pictureElement;
};


var createFragment = function (element) {

  for (var i = 0; i < element.length; i++) {
    fragment.appendChild(createPictures(arrObjectsPhotos[i]));
  }
  return fragment;
};

picturesContainer.appendChild(createFragment(arrObjectsPhotos));


var showBigPicture = function (firstArrEl, arr, arr2, arr3) {
  var bigPicture = document.querySelector('.big-picture');
  var socialPicture = bigPicture.querySelector('.social__comments').querySelectorAll('.social__picture');
  var socialText = bigPicture.querySelector('.social__comments').querySelectorAll('.social__text');

  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img').src = firstArrEl.url;
  bigPicture.querySelector('.likes-count').textContent = firstArrEl.likes;
  bigPicture.querySelector('.comments-count').textContent = firstArrEl.comments.length;
  bigPicture.querySelector('.social__caption').textContent = generateRandomElement(arr3);

  for (var i = 1; i < socialPicture.length; i++) {
    socialPicture[i].src = 'img/avatar-' + generateRandomNumber(MIN_AVATAR, MAX_AVATAR) + '.svg';
    socialText[i].textContent = arr2.message;
  }
  return bigPicture;
};

showBigPicture(arrObjectsPhotos[0], arrObjectsPhotos, commentsArrObject, descriptionMocks);

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
