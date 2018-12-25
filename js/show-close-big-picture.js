'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var minPicture = document.querySelectorAll('.picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

  var showBigPicture = function (firstArrEl) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = firstArrEl.url;
    bigPicture.querySelector('.likes-count').textContent = firstArrEl.likes;
    bigPicture.querySelector('.comments-count').textContent = firstArrEl.comments.length;
    bigPicture.querySelector('.social__caption').textContent = window.utils.generateRandomElement(window.utils.descriptionMocks);

    return bigPicture;
  };

  var openBigPhoto = function (minPhoto, num) {
    minPhoto.addEventListener('click', function () {
      document.querySelector('body').classList.add('modal-open');
      showBigPicture(window.gallery.arrObjectsPhotos[num]);
      document.addEventListener('keydown', onCloseBigPictureEsc);
    });
  };

  for (var k = 0; k < minPicture.length; k++) {
    openBigPhoto(minPicture[k], k);
  }

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

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');
})();
