'use strict';

(function () {
  var numberOffObject = 25;
  var MIN_AVATAR = 1;
  var MAX_AVATAR = 6;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MIN_COMMENT_NUMBER = 1;
  var MAX_COMMENT_NUMBER = 5;
  var fragment = document.createDocumentFragment();
  var picturesContainer = document.querySelector('.pictures');
  var commentsContainer = document.querySelector('.social__comments');
  var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
  var commentNode = commentsContainer.querySelector('.social__comment');

  var generateArrObjectComments = function () {
    var arrObjectsReports = {
      avatar: 'img/avatar-' + window.utils.generateRandomNumber(MIN_AVATAR, MAX_AVATAR) + '.svg',
      message: window.utils.generateRandomElement(window.data.commentsMocks),
      name: window.utils.generateRandomElement(window.data.namesMocks)
    };

    return arrObjectsReports;
  };

  var generateRandomUrl = function (number) {
    var arrAdresses = [];
    for (var i = 0; i < number; i++) {
      arrAdresses[i] = i + 1;
    }

    return window.utils.shuffleRandomArr(arrAdresses);
  };

  var urlArrNumbers = generateRandomUrl(numberOffObject);


  var generateArrObjectsPhoto = function (number) {
    var arrPhotos = [];
    for (var i = 0; i < number; i++) {
      arrPhotos[i] = {
        url: 'photos/' + urlArrNumbers[i] + '.jpg',
        likes: window.utils.generateRandomNumber(MIN_LIKES, MAX_LIKES),
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

  while (commentsContainer.firstChild) {
    commentsContainer.removeChild(commentsContainer.firstChild);
  }

  var renderCommentsBigPicture = function () {
    for (var i = 0; i < window.utils.generateRandomNumber(MIN_COMMENT_NUMBER, MAX_COMMENT_NUMBER); i++) {

      var commentElement = commentNode.cloneNode(true);

      commentElement.querySelector('.social__picture').src = 'img/avatar-' + window.utils.generateRandomNumber(MIN_AVATAR, MAX_AVATAR) + '.svg';
      commentElement.querySelector('.social__text').textContent = window.utils.generateRandomElement(window.data.commentsMocks);
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

  window.gallery = {
    picturesContainer: picturesContainer,
    arrObjectsPhotos: arrObjectsPhotos
  };
})();
