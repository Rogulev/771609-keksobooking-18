'use strict';

(function () {
  var Code = {
    OK: 200,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
    SERVER_ON_REBUILD: 503
  };
  var loadedData = {};

  var xhrRequestJson = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Code.OK:
          loadedData.allPins = xhr.response;
          onSuccess(xhr.response);
          break;
        case Code.NOT_FOUND:
          onError('Статус ответа: ' + xhr.status + ' Ошибка, страницы не существует');
          break;
        case Code.INTERNAL_SERVER:
          onError('Статус ответа: ' + xhr.status + ' Ошибка на сервере');
          break;
        case Code.SERVER_ON_REBUILD:
          onError('Статус ответа: ' + xhr.status + ' Производятся работы на сервере');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    return xhr;
  };

  var loadData = function (onSuccess, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';

    var xhrJson = xhrRequestJson(onSuccess, onError);

    xhrJson.open('GET', URL);
    xhrJson.send();

  };

  var saveData = function (data, onSuccess, onError) {
    var URL = 'https://js.dump.academy/keksobooking';

    var xhrJson = xhrRequestJson(onSuccess, onError);

    xhrJson.open('POST', URL);
    xhrJson.send(data);
  };

  window.backend = {
    'loadData': loadData,
    'saveData': saveData,
    'loadedData': loadedData,
  };
})();
