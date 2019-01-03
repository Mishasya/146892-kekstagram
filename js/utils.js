'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var shuffleRandomArr = function (array) {
    var incomingArr = array;
    for (var i = incomingArr.length - 1; i > 0; i--) {
      var random = Math.floor(Math.random() * (i + 1));
      var temp = incomingArr[i];
      incomingArr[i] = incomingArr[random];
      incomingArr[random] = temp;
    }
    return incomingArr;
  };

  window.utils = {
    shuffleRandomArr: shuffleRandomArr,
    ESC_KEYCODE: ESC_KEYCODE
  };
})();
