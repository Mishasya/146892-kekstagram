'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'mp4'];

  window.photoEdit.uploadFile.addEventListener('change', function () {
    var file = window.photoEdit.uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        window.photoEdit.imgUploadPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
