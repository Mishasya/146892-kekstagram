'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');


  var showBigPicture = function (elem) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = elem.url;
    bigPicture.querySelector('.likes-count').textContent = elem.likes;
    bigPicture.querySelector('.comments-count').textContent = elem.comments.length;
    bigPicture.querySelector('.social__caption').textContent = elem.description;

    return bigPicture;
  };

  var openBigPhoto = function () {
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onCloseBigPictureEsc);
  };

  var onCloseBigPictureEsc = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeBigPhoto();
    }
  };

  var closeBigPhoto = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onCloseBigPictureEsc);
  };

  bigPictureCancel.addEventListener('click', function () {
    closeBigPhoto();
  });

  window.preview = {
    showBigPicture: showBigPicture,
    openBigPhoto: openBigPhoto,
    bigPicture: bigPicture
  };
})();
