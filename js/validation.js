'use strict';

(function () {
  var textHashtags = window.photoEdit.formEditPicture.querySelector('.text__hashtags');
  var textDescription = window.photoEdit.formEditPicture.querySelector('.text__description');
  var MIN_LENGTH_HASHTAG = 2;
  var MAX_LENGTH_HASHTAG = 20;
  var MAX_COUNT_HASHTAG = 5;

  var highlightInvalidFields = function () {
    textHashtags.style.outline = '3px solid rgb(255, 0, 0)';
  };

  var validatesHashtags = function () {
    textHashtags.addEventListener('input', function () {
      var textHashtagsArr = textHashtags.value.split(' ');

      if (textHashtagsArr.length > MAX_COUNT_HASHTAG) {
        textHashtags.setCustomValidity('Не более 5 хэш-тегов');
      } else {
        textHashtags.setCustomValidity('');
      }

      for (var i = 0; i < textHashtagsArr.length; i++) {

        if (textHashtagsArr[i].length > MAX_LENGTH_HASHTAG) {
          textHashtags.setCustomValidity('Хэш-тег не может быть длиннее 20-ти символов');
        } else if (textHashtagsArr[i].length < MIN_LENGTH_HASHTAG && textHashtagsArr[i].indexOf('#') === 0) {
          textHashtags.setCustomValidity('Хэш-тег не может состоять только из #');
        } else if (textHashtagsArr[i].indexOf('#') !== 0) {
          textHashtags.setCustomValidity('Хэш-тег должен начинаться с символа #');
        } else if (textHashtagsArr[i].indexOf('#', 1) !== -1) {
          textHashtags.setCustomValidity('Хэш-теги должны отделяться знаком пробел');
        }

        for (var m = 0; m < textHashtagsArr.length; m++) {
          for (var l = m + 1; l < textHashtagsArr.length; l++) {
            if (textHashtagsArr[l].toLowerCase() === textHashtagsArr[m].toLowerCase()) {
              textHashtags.setCustomValidity('Упс, такой хэш-тег уже есть');
            }
          }
        }
      }
    });
  };
  validatesHashtags();

  textHashtags.addEventListener('invalid', function () {
    highlightInvalidFields();
  });

  var closeEditPictureWhereBlurInput = function () {
    document.addEventListener('keydown', window.photoEdit.onFormEditPictureEscClose);
  };

  var keepOpenSoFarFocusInput = function () {
    document.removeEventListener('keydown', window.photoEdit.onFormEditPictureEscClose);
  };

  textHashtags.addEventListener('focus', function () {
    keepOpenSoFarFocusInput();
  });

  textHashtags.addEventListener('blur', function () {
    closeEditPictureWhereBlurInput();
    textHashtags.style.outline = '3px solid rgb(0, 0, 0)';
  });

  textDescription.addEventListener('focus', function () {
    keepOpenSoFarFocusInput();
  });

  textDescription.addEventListener('blur', function () {
    closeEditPictureWhereBlurInput();
  });

  window.validation = {
    textDescription: textDescription,
    textHashtags: textHashtags
  };
})();
