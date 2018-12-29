'use strict';

(function () {
  var success = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var successButton = success.querySelector('.success__button');
  var errorButton = errorTemplate.querySelector('.error__button');
  var errorFragment = main.appendChild(errorTemplate);
  var successFragment = main.appendChild(success);
  successFragment.classList.add('visually-hidden');
  errorFragment.classList.add('visually-hidden');

  var showMessageOfSuccessfullDispatch = function () {
    successFragment.classList.remove('visually-hidden');
    window.photoEdit.formEditPicture.classList.add('hidden');
    window.photoEdit.resetToDefaultValue();
    window.photoEdit.uploadFile.value = '';
    window.validation.textHashtags.value = '';
    window.validation.textDescription.value = '';

    document.addEventListener('click', onCloseSuccessMessage);
    document.addEventListener('keydown', onSuccessMessageEscClose);
    successButton.addEventListener('click', onCloseSuccessMessage);
  };

  var showMessageOfError = function () {
    errorFragment.classList.remove('visually-hidden');
    window.photoEdit.formEditPicture.classList.add('hidden');

    document.addEventListener('click', onCloseErrorMessage);
    document.addEventListener('keydown', onSuccessErrorMessageEscClose);
    errorButton.addEventListener('click', onCloseErrorMessage);
  };

  var onSuccessMessageEscClose = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      onCloseSuccessMessage();
    }
  };

  var onCloseErrorMessage = function () {
    errorFragment.classList.add('visually-hidden');
    document.removeEventListener('keydown', onSuccessErrorMessageEscClose);
  };

  var onSuccessErrorMessageEscClose = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      onCloseErrorMessage();
    }
  };

  var onCloseSuccessMessage = function () {
    successFragment.classList.add('visually-hidden');
    document.removeEventListener('keydown', onSuccessMessageEscClose);
  };

  imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(imgUploadForm), showMessageOfSuccessfullDispatch, showMessageOfError);
    imgUploadForm.reset();
  });


  window.messageForm = {
    showMessageOfError: showMessageOfError
  };
})();
