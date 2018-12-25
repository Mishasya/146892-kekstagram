'use strict';

(function () {
  var scaleControlSmaller = window.openEditPicture.formEditPicture.querySelector('.scale__control--smaller');
  var scaleControlBigger = window.openEditPicture.formEditPicture.querySelector('.scale__control--bigger');
  var scaleControlValue = window.openEditPicture.formEditPicture.querySelector('.scale__control--value');
  var imgUploadPreviewInner = window.openEditPicture.formEditPicture.querySelector('.img-upload__preview');
  scaleControlValue.value = '100%';
  var STEP_SCALE = 25;
  var MIN_VALUE_SCALE = 25;
  var MAX_VALUE_SCALE = 100;

  var reduceScalePhoto = function () {

    if (parseInt(scaleControlValue.value, 10) > MIN_VALUE_SCALE) {
      var actualValue = parseInt(scaleControlValue.value, 10) - STEP_SCALE + '%';
      scaleControlValue.value = actualValue;
      imgUploadPreviewInner.style.transform = 'scale(' + parseInt(actualValue, 10) / 100 + ')';
    }
  };

  var increaseScalePhoto = function () {
    if (parseInt(scaleControlValue.value, 10) < MAX_VALUE_SCALE) {
      var actualValue = parseInt(scaleControlValue.value, 10) + STEP_SCALE + '%';
      scaleControlValue.value = actualValue;
      imgUploadPreviewInner.style.transform = 'scale(' + parseInt(actualValue, 10) / 100 + ')';
    }
  };

  scaleControlSmaller.addEventListener('click', function () {
    reduceScalePhoto();
  });

  scaleControlBigger.addEventListener('click', function () {
    increaseScalePhoto();
  });

  window.scale = {
    imgUploadPreviewInner: imgUploadPreviewInner,
    scaleControlValue: scaleControlValue
  };

})();
