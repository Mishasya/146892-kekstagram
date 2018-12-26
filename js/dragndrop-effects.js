'use strict';

(function () {
  var armChangeDeepPicture = window.photoEdit.formEditPicture.querySelector('.effect-level__pin');
  var effectLevelLine = window.photoEdit.formEditPicture.querySelector('.effect-level__line');
  var effectLevelValue = window.photoEdit.formEditPicture.querySelector('.effect-level__value');
  var effectLevelDepth = window.photoEdit.formEditPicture.querySelector('.effect-level__depth');
  var WIDTH_PIN = 18;

  armChangeDeepPicture.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var minPositionPin = effectLevelLine.getBoundingClientRect().left;
      var maxPositionPin = effectLevelLine.getBoundingClientRect().right;


      if (armChangeDeepPicture.getBoundingClientRect().left < minPositionPin - (WIDTH_PIN / 2)) {
        armChangeDeepPicture.style.left = 0 + 'px';
      } else if (armChangeDeepPicture.getBoundingClientRect().left > maxPositionPin - (WIDTH_PIN / 2)) {
        armChangeDeepPicture.style.left = effectLevelLine.offsetWidth + 'px';
      }

      effectLevelDepth.style.width = Math.round((armChangeDeepPicture.offsetLeft / effectLevelLine.offsetWidth) * 100) + '%';

      var positionPinNow = armChangeDeepPicture.style.left = (armChangeDeepPicture.offsetLeft - shift.x) + 'px';
      var actualPercent = Math.round((parseInt(positionPinNow, 10) * 100) / effectLevelLine.clientWidth);
      effectLevelValue.value = actualPercent;

      if (window.photoEdit.imgUploadPreview.classList.contains('effects__preview--chrome')) {
        window.photoEdit.imgUploadPreview.style.filter = 'grayscale' + '(' + (effectLevelValue.value / 100) + ')';
      } else if (window.photoEdit.imgUploadPreview.classList.contains('effects__preview--sepia')) {
        window.photoEdit.imgUploadPreview.style.filter = 'sepia' + '(' + (effectLevelValue.value / 100) + ')';
      } else if (window.photoEdit.imgUploadPreview.classList.contains('effects__preview--marvin')) {
        window.photoEdit.imgUploadPreview.style.filter = 'invert' + '(' + effectLevelValue.value + '%' + ')';
      } else if (window.photoEdit.imgUploadPreview.classList.contains('effects__preview--phobos')) {
        window.photoEdit.imgUploadPreview.style.filter = 'blur' + '(' + (effectLevelValue.value / 100 * 3) + 'px' + ')';
      } else if (window.photoEdit.imgUploadPreview.classList.contains('effects__preview--heat')) {
        window.photoEdit.imgUploadPreview.style.filter = 'brightness' + '(' + (effectLevelValue.value / 100 * 2 + 1) + ')';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.dragndropEffects = {
    armChangeDeepPicture: armChangeDeepPicture,
    effectLevelDepth: effectLevelDepth
  };
})();
