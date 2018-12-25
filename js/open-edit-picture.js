'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var formEditPicture = document.querySelector('.img-upload__overlay');
  var btnCloseFormEditPicture = formEditPicture.querySelector('.img-upload__cancel');
  var imgUploadPreview = formEditPicture.querySelector('.img-upload__preview img');
  var slider = formEditPicture.querySelector('.img-upload__effect-level');
  var radiobuttonsEffect = formEditPicture.querySelectorAll('.effects__radio');
  var imgUploadClasses = [
    'effects__preview--no-filter',
    'effects__preview--chrome',
    'effects__preview--sepia',
    'effects__preview--marvin',
    'effects__preview--phobos',
    'effects__preview--heat'
  ];

  // Сброс фильтров к начальному состоянию

  var resetToDefaultValue = function () {
    imgUploadPreview.removeAttribute('class');
    slider.classList.add('hidden');
    window.scale.imgUploadPreviewInner.style.transform = 'scale(1)';
    window.scale.scaleControlValue.value = '100%';
  };

  var openFormEditPicture = function () {
    formEditPicture.classList.remove('hidden');
    resetToDefaultValue();
    document.addEventListener('keydown', onFormEditPictureEscClose);
  };

  var onFormEditPictureEscClose = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeFormEditPicture();
    }
  };

  var closeFormEditPicture = function () {
    formEditPicture.classList.add('hidden');
    document.removeEventListener('keydown', onFormEditPictureEscClose);
    uploadFile.value = '';
  };

  uploadFile.addEventListener('change', function () {
    openFormEditPicture();
  });

  btnCloseFormEditPicture.addEventListener('click', function () {
    closeFormEditPicture();
  });

  // Переключение эффекта по клику на миниатюру эффекта

  var onBtnEffectClick = function (radiobutton, classEffect) {

    slider.classList.add('hidden');

    radiobutton.addEventListener('click', function () {
      imgUploadPreview.style.filter = '';
      imgUploadPreview.removeAttribute('class');
      imgUploadPreview.setAttribute('class', classEffect);
      window.dragndropEffects.armChangeDeepPicture.style.left = '100%';
      window.dragndropEffects.effectLevelDepth.style.width = '100%';
      window.scale.scaleControlValue.value = '100%';
      window.scale.imgUploadPreviewInner.style.transform = 'scale(1)';

      if (classEffect === 'effects__preview--no-filter') {
        slider.classList.add('hidden');
      } else {
        slider.classList.remove('hidden');
      }
    });
  };

  for (var j = 0; j < radiobuttonsEffect.length; j++) {
    onBtnEffectClick(radiobuttonsEffect[j], imgUploadClasses[j]);
  }

  window.openEditPicture = {
    uploadFile: uploadFile,
    imgUploadPreview: imgUploadPreview,
    formEditPicture: formEditPicture,
    onFormEditPictureEscClose: onFormEditPictureEscClose,
    resetToDefaultValue: resetToDefaultValue
  };

})();
