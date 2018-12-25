'use strict';

(function () {
  var success = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var successButton = success.querySelector('.success__button');
  var successFragment = main.appendChild(success);
  successFragment.classList.add('visually-hidden');

  var showMessageOfSuccessfulDispatch = function (evt) {
    evt.preventDefault();
    successFragment.classList.remove('visually-hidden');
    window.validation.formEditPicture.classList.add('hidden');
    window.openEditPicture.resetToDefaultValue();
    window.openEditPicture.uploadFile.value = '';
    window.validation.textHashtags.value = '';
    window.validation.textDescription.value = '';

    document.addEventListener('click', closeSuccessMessage);
    document.addEventListener('keydown', onSuccessMessageEscClose);
    successButton.addEventListener('click', closeSuccessMessage);
  };

  var onSuccessMessageEscClose = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeSuccessMessage();
    }
  };

  var closeSuccessMessage = function () {
    successFragment.classList.add('visually-hidden');
    document.removeEventListener('keydown', onSuccessMessageEscClose);
  };

  imgUploadForm.addEventListener('submit', showMessageOfSuccessfulDispatch);
})();
