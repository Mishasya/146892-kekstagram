'use strict';

(function () {
  var scaleControlSmaller = window.photoEdit.formEditPicture.querySelector('.scale__control--smaller');
  var scaleControlBigger = window.photoEdit.formEditPicture.querySelector('.scale__control--bigger');
  var scaleControlValue = window.photoEdit.formEditPicture.querySelector('.scale__control--value');
  var imgUploadPreviewInner = window.photoEdit.formEditPicture.querySelector('.img-upload__preview');
  var STEP_SCALE = 25;
  var MIN_VALUE_SCALE = 25;
  var MAX_VALUE_SCALE = 100;
  scaleControlValue.value = '100%';

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

  window.changeZoom = {
    imgUploadPreviewInner: imgUploadPreviewInner,
    scaleControlValue: scaleControlValue
  };

})();
