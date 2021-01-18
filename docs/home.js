/******/ (() => { // webpackBootstrap
/*!*********************!*\
  !*** ./src/home.js ***!
  \*********************/
document.addEventListener('DOMContentLoaded', function () {
  var downloadButton = document.getElementById('download-button');
  var allDownloadButton = document.getElementById('all-downloads-button');
  var OS;
  var extension;
  var className;

  if (navigator.appVersion.includes('Win')) {
    OS = 'Windows';
    className = 'fa-windows';
    extension = 'exe';
  } else if (navigator.appVersion.includes('Mac')) {
    OS = 'MacOS';
    className = 'fa-apple';
    extension = 'dmg';
  } else if (navigator.appVersion.includes('Linux')) {
    OS = 'Linux';
    className = 'fa-linux';
    extension = 'appImage';
  }

  if (OS) {
    fetch('https://api.github.com/repos/fabio286/antares/releases/latest').then(function (response) {
      return response.json();
    }).then(function (data) {
      var expString = ".*".concat(extension, "$");
      var exp = new RegExp(expString);
      var latest = data.assets.find(function (asset) {
        return exp.test(asset.browser_download_url);
      });
      downloadButton.href = latest.browser_download_url;
      downloadButton.innerHTML = "<i class=\"fa ".concat(className, " is-size-5 mr-2\"></i> Download Antares (").concat(data.name, ")");
      allDownloadButton.classList.toggle('is-hidden');
    });
  }
});
/******/ })()
;
//# sourceMappingURL=home.js.map