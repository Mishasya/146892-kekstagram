'use strict';

(function () {
  var serverPhotos = [];
  var picturesContainer = document.querySelector('.pictures');
  var commentsContainer = document.querySelector('.social__comments');
  var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
  var MIN_COMMENT_NUMBER = 1;
  // var MAX_COMMENT_NUMBER = 5;
  var commentsNode = commentsContainer.querySelector('.social__comment');

  while (commentsContainer.firstChild) {
    commentsContainer.removeChild(commentsContainer.firstChild);
  }

  var createPicture = function (element) {
    var pictureElement = templatePicture.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = element.url;
    pictureElement.querySelector('.picture__likes').textContent = element.likes;
    pictureElement.querySelector('.picture__comments').textContent = element.comments.length;


    pictureElement.addEventListener('click', function () {
      window.bigPicture.openBigPhoto();
      window.bigPicture.showBigPicture(element);

    });

    return pictureElement;
  };

  var renderCommentsBigPicture = function (element) {
    var commentsFragment = document.createDocumentFragment();

    for (var i = 0; i < MIN_COMMENT_NUMBER; i++) {
      var commentsElement = commentsNode.cloneNode(true);
      commentsElement.querySelector('img').src = element.comments[i].avatar;
      commentsElement.querySelector('p').textContent = element.comments[i].message;
      commentsFragment.appendChild(commentsElement);
    }

    return commentsContainer.appendChild(commentsFragment);
  };

  var renderPictures = function (arr) {
    var fragmentPhoto = document.createDocumentFragment();

    arr.forEach(function (item) {
      fragmentPhoto.appendChild(createPicture(item));
    });
    picturesContainer.appendChild(fragmentPhoto);
  };

  var onLoad = function (data) {
    serverPhotos = data;
    renderPictures(serverPhotos);
  };


  var onError = function () {
    showMessageOfError();
  };

  window.backend.download(onLoad, onError);

  window.gallery = {
    picturesContainer: picturesContainer,
    renderPictures: renderPictures,
    serverPhotos: serverPhotos,
    renderCommentsBigPicture: renderCommentsBigPicture
  };
})();
