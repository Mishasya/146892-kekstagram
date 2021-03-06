'use strict';

(function () {
  var serverPhotos = [];
  var picturesContainer = document.querySelector('.pictures');
  var commentsContainer = document.querySelector('.social__comments');
  var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
  var imgFilter = document.querySelector('.img-filters');
  var MAX_COMMENT_NUMBER = 5;
  var DEBOUNCE_INTERVAL = 500;
  var commentsNode = commentsContainer.querySelector('.social__comment');
  var commentsLoader = document.querySelector('.comments-loader');
  var socialCommentCount = document.querySelector('.social__comment-count');


  while (commentsContainer.firstChild) {
    commentsContainer.removeChild(commentsContainer.firstChild);
  }

  var createPicture = function (element) {
    var pictureElement = templatePicture.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = element.url;
    pictureElement.querySelector('.picture__likes').textContent = element.likes;
    pictureElement.querySelector('.picture__comments').textContent = element.comments.length;


    pictureElement.addEventListener('click', function () {
      window.preview.openBigPhoto();
      window.preview.showBigPicture(element);
      showCommentsBigPicture(element.comments);
      downloadComments();
    });

    return pictureElement;
  };

  var showInitialCommentsNumber = function () {
    if (commentsContainer.children.length < MAX_COMMENT_NUMBER) {
      socialCommentCount.firstChild.textContent = commentsContainer.children.length + ' из ';
    } else {
      socialCommentCount.firstChild.textContent = MAX_COMMENT_NUMBER + ' из ';
    }
  };

  var downloadComments = function () {
    var commentsHidden = commentsContainer.querySelectorAll('.visually-hidden');
    if (!commentsHidden.length) {
      commentsLoader.classList.add('visually-hidden');
    } else {
      commentsLoader.classList.remove('visually-hidden');
    }
  };

  var countUpComments = function () {
    var commentsVisually = commentsContainer.querySelectorAll('.social__comment:not(.visually-hidden)');
    socialCommentCount.firstChild.textContent = '';
    socialCommentCount.firstChild.textContent = commentsVisually.length + ' из ';
  };

  var createCommentBigPicture = function (element) {
    var commentElement = commentsNode.cloneNode(true);

    commentElement.querySelector('img').src = element.avatar;
    commentElement.querySelector('p').textContent = element.message;

    return commentElement;
  };

  var showCommentsBigPicture = function (arr) {
    var commentsFragment = document.createDocumentFragment();
    commentsContainer.innerHTML = '';
    arr.forEach(function (item, index) {
      var comment = createCommentBigPicture(item);
      if (index >= MAX_COMMENT_NUMBER) {
        comment.classList.add('visually-hidden');
      }
      commentsFragment.appendChild(comment);
    });

    commentsContainer.appendChild(commentsFragment);
    downloadComments();
    showInitialCommentsNumber();
  };

  var onLoadMoreClick = function () {
    var commentsHidden = commentsContainer.querySelectorAll('.visually-hidden');
    for (var i = 0; i < commentsHidden.length && i < MAX_COMMENT_NUMBER; i++) {
      commentsHidden[i].classList.remove('visually-hidden');
    }
    downloadComments();
    countUpComments();
  };

  commentsLoader.addEventListener('click', onLoadMoreClick);


  var renderPictures = function (arr) {
    var fragmentPhoto = document.createDocumentFragment();

    arr.forEach(function (item) {
      fragmentPhoto.appendChild(createPicture(item));
    });
    picturesContainer.appendChild(fragmentPhoto);
  };

  var onLoad = function (data) {
    imgFilter.classList.remove('img-filters--inactive');
    serverPhotos = data;
    renderPictures(serverPhotos);
  };

  var onError = function () {
    window.messageForm.showMessageOfError();
  };

  window.backend.download(onLoad, onError);

  var imgFilters = document.querySelector('.img-filters');
  var imgFilterrsForm = imgFilters.querySelector('.img-filters__form');
  var imgFiltersButton = imgFilters.querySelectorAll('.img-filters__button');
  var filterPopular = imgFilters.querySelector('#filter-popular');
  var filterNew = imgFilters.querySelector('#filter-new');
  var filterDiscussed = imgFilters.querySelector('#filter-discussed');


  var clearGallery = function () {
    var picture = document.querySelectorAll('.picture');

    picture.forEach(function (elem) {
      elem.remove();
    });
  };

  var sortByPopular = function (array) {
    return array.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  var filterNewPhoto = function (array) {
    var newPhoto = array.slice();
    return window.utils.shuffleRandomArr(newPhoto).slice(0, 10);
  };

  var buttonFilterClass = function (elem) {
    imgFiltersButton.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    elem.classList.add('img-filters__button--active');
  };

  var selectFilter = function (elem) {
    clearGallery();
    buttonFilterClass(elem);
    switch (elem) {
      case filterPopular:
        renderPictures(serverPhotos);
        break;
      case filterNew:
        renderPictures(filterNewPhoto(serverPhotos));
        break;
      case filterDiscussed:
        renderPictures(sortByPopular(serverPhotos));
        break;
    }
  };

  var debounce = function (callback) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var debounceFilters = debounce(selectFilter);
  imgFilterrsForm.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName === 'BUTTON') {
      debounceFilters(target);
    }
  });


  window.gallery = {
    picturesContainer: picturesContainer,
    renderPictures: renderPictures,
    showCommentsBigPicture: showCommentsBigPicture
  };
})();
