'use strict';

(function () {
  var success = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var successButton = success.querySelector('.success__button');
  var successFragment = main.appendChild(success);
  successFragment.classList.add('visually-hidden');

  var showMessageOfSuccessfullDispatch = function (evt) {
    evt.preventDefault();
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

  var onSuccessMessageEscClose = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      onCloseSuccessMessage();
    }
  };

  var onCloseSuccessMessage = function () {
    successFragment.classList.add('visually-hidden');
    document.removeEventListener('keydown', onSuccessMessageEscClose);
  };

  imgUploadForm.addEventListener('submit', showMessageOfSuccessfullDispatch);
})();
