"use strict";
(function () {
  var answerOK = 200;
  var answerNotFound = 404;
  var answerInternalServer = 500;
  var answerServerFauld = 503;


  var xhrRequestJson = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case answerOK:

          onSuccess(xhr.response);
          break;
        case answerNotFound:
          onError('Статус ответа: ' + xhr.status + ' Ошибка, страницы не существует');
          break;
        case answerInternalServer:
          onError('Статус ответа: ' + xhr.status + ' Ошибка на сервере');
          break;
        case answerServerFauld:
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

  var sendData = function (data, onSuccess, onError) {
    var URL = 'https://js.dump.academy/keksobooking';

    var xhrJson = xhrRequestJson(onSuccess, onError);

    xhrJson.open('POST', URL);
    xhrJson.send(data);
  };

  window.backEnd = {
    'loadData': loadData,
    'sendData': sendData
  };

})();
