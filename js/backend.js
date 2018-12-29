'use strict';

(function () {
  var GET_URL = 'https://js.dump.academy/kekstagram/data';
  var POST_URL = 'https://js.dump.academy/kekstagram';
  var REQUEST_ERROR = 400;
  var NOT_FOUND_ERROR = 404;
  var STATUS_SUCCESS = 200;

  var setup = function (xhr, onLoad, onError) {
    xhr.responseType = 'json';
    xhr.timeout = 5000;

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case STATUS_SUCCESS:
          onLoad(xhr.response);
          break;
        case REQUEST_ERROR:
          error = 'Неверный запрос';
          break;
        case NOT_FOUND_ERROR:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Статус ответа: ' + xhr.status + '' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout);
    });
  };

  var download = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    setup(xhr, onLoad, onError);
    xhr.open('GET', GET_URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    setup(xhr, onLoad, onError);
    xhr.open('POST', POST_URL);
    xhr.send(data);
  };

  window.backend = {
    download: download,
    save: save
  };
})();
