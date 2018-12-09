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

var numberOffObject = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENT_NUMBER = 1;
var MAX_COMMENT_NUMBER = 5;
var MIN_AVATAR = 1;
var MAX_AVATAR = 6;
var fragment = document.createDocumentFragment();
var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
var picturesContainer = document.querySelector('.pictures');
var commentsContainer = document.querySelector('.social__comments');
var commentNode = commentsContainer.querySelector('.social__comment');


var generateRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};


var generateRandomElement = function (arr) {
  return arr[generateRandomNumber(0, arr.length - 1)];
};

var shuffleRandomArr = function (arr) {
  var incomingArr = arr;
  for (var i = incomingArr.length - 1; i > 0; i--) {
    var random = Math.floor(Math.random() * (i + 1));
    var temp = incomingArr[i];
    incomingArr[i] = incomingArr[random];
    incomingArr[random] = temp;
  }
  return incomingArr;
};


var generateRandomUrl = function (number) {
  var arrAdresses = [];
  for (var i = 0; i < number; i++) {
    arrAdresses[i] = i + 1;
  }
  return shuffleRandomArr(arrAdresses);
};

var urlArrNumbers = generateRandomUrl(numberOffObject);


var generateArrObjectComments = function () {
  var arrObjectsReports = {
    avatar: 'img/avatar-' + generateRandomNumber(MIN_AVATAR, MAX_AVATAR) + '.svg',
    message: generateRandomElement(commentsMocks),
    name: generateRandomElement(namesMocks)
  };
  return arrObjectsReports;
};


var generateArrObjectsPhoto = function (number) {
  var arrPhotos = [];
  for (var i = 0; i < number; i++) {
    arrPhotos[i] = {
      url: 'photos/' + urlArrNumbers[i] + '.jpg',
      likes: generateRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: generateArrObjectComments()
    };
  }
  return arrPhotos;
};
var arrObjectsPhotos = generateArrObjectsPhoto(numberOffObject);


var createPicture = function (element) {
  var pictureElement = templatePicture.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = element.url;
  pictureElement.querySelector('.picture__likes').textContent = element.likes;
  pictureElement.querySelector('.picture__comments').textContent = element.comments.length;

  return pictureElement;
};


var showBigPicture = function (firstArrEl) {
  var bigPicture = document.querySelector('.big-picture');

  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = firstArrEl.url;
  bigPicture.querySelector('.likes-count').textContent = firstArrEl.likes;
  bigPicture.querySelector('.comments-count').textContent = firstArrEl.comments.length;
  bigPicture.querySelector('.social__caption').textContent = generateRandomElement(descriptionMocks);

  return bigPicture;
};
showBigPicture(arrObjectsPhotos[0]);


while (commentsContainer.firstChild) {
  commentsContainer.removeChild(commentsContainer.firstChild);
}


var renderCommentsBigPicture = function () {
  for (var i = 0; i < generateRandomNumber(MIN_COMMENT_NUMBER, MAX_COMMENT_NUMBER); i++) {

    var commentElement = commentNode.cloneNode(true);

    commentElement.querySelector('.social__picture').src = 'img/avatar-' + generateRandomNumber(MIN_AVATAR, MAX_AVATAR) + '.svg';
    commentElement.querySelector('.social__text').textContent = generateRandomElement(commentsMocks);
    fragment.appendChild(commentElement);
  }
  return fragment;
};


var renderPictures = function (arr) {
  var fragmentPhoto = document.createDocumentFragment();

  arr.forEach(function (item, i) {
    fragmentPhoto.appendChild(createPicture(arrObjectsPhotos[i]));
  });
  renderCommentsBigPicture();
  commentsContainer.appendChild(fragment);
  return fragmentPhoto;
};
picturesContainer.appendChild(renderPictures(arrObjectsPhotos));


document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
