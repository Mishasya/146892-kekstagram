'use strict';

var commentsMocks = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var descriptionMocks = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var namesMocks = [
  'Артём',
  'Екатерина',
  'Олег',
  'Василий',
  'Лиза',
  'Александр',
  'Анна',
  'Эльза'
];

var numberOffObject = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENT_NUMBER = 1;
var MAX_COMMENT_NUMBER = 5;
var MIN_AVATAR = 1;
var MAX_AVATAR = 6;
var ESC_KEYCODE = 27;
var fragment = document.createDocumentFragment();
var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
var picturesContainer = document.querySelector('.pictures');
var commentsContainer = document.querySelector('.social__comments');
var commentNode = commentsContainer.querySelector('.social__comment');
var bigPicture = document.querySelector('.big-picture');


var generateRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};


var generateRandomElement = function (arr) {
  return arr[generateRandomNumber(0, arr.length - 1)];
};

var shuffleRandomArr = function (arr) {
  var incomingArr = arr;
  for (var i = incomingArr.length - 1; i > 0; i--) {
    var random = Math.floor(Math.random() * (i + 1));
    var temp = incomingArr[i];
    incomingArr[i] = incomingArr[random];
    incomingArr[random] = temp;
  }
  return incomingArr;
};


var generateRandomUrl = function (number) {
  var arrAdresses = [];
  for (var i = 0; i < number; i++) {
    arrAdresses[i] = i + 1;
  }
  return shuffleRandomArr(arrAdresses);
};

var urlArrNumbers = generateRandomUrl(numberOffObject);


var generateArrObjectComments = function () {
  var arrObjectsReports = {
    avatar: 'img/avatar-' + generateRandomNumber(MIN_AVATAR, MAX_AVATAR) + '.svg',
    message: generateRandomElement(commentsMocks),
    name: generateRandomElement(namesMocks)
  };
  return arrObjectsReports;
};


var generateArrObjectsPhoto = function (number) {
  var arrPhotos = [];
  for (var i = 0; i < number; i++) {
    arrPhotos[i] = {
      url: 'photos/' + urlArrNumbers[i] + '.jpg',
      likes: generateRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: generateArrObjectComments()
    };
  }
  return arrPhotos;
};
var arrObjectsPhotos = generateArrObjectsPhoto(numberOffObject);


var createPicture = function (element) {
  var pictureElement = templatePicture.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = element.url;
  pictureElement.querySelector('.picture__likes').textContent = element.likes;
  pictureElement.querySelector('.picture__comments').textContent = element.comments.length;

  return pictureElement;
};


var showBigPicture = function (firstArrEl) {


  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = firstArrEl.url;
  bigPicture.querySelector('.likes-count').textContent = firstArrEl.likes;
  bigPicture.querySelector('.comments-count').textContent = firstArrEl.comments.length;
  bigPicture.querySelector('.social__caption').textContent = generateRandomElement(descriptionMocks);

  return bigPicture;
};


while (commentsContainer.firstChild) {
  commentsContainer.removeChild(commentsContainer.firstChild);
}


var renderCommentsBigPicture = function () {
  for (var i = 0; i < generateRandomNumber(MIN_COMMENT_NUMBER, MAX_COMMENT_NUMBER); i++) {

    var commentElement = commentNode.cloneNode(true);

    commentElement.querySelector('.social__picture').src = 'img/avatar-' + generateRandomNumber(MIN_AVATAR, MAX_AVATAR) + '.svg';
    commentElement.querySelector('.social__text').textContent = generateRandomElement(commentsMocks);
    fragment.appendChild(commentElement);
  }
  return fragment;
};


var renderPictures = function (arr) {
  var fragmentPhoto = document.createDocumentFragment();

  arr.forEach(function (item, i) {
    fragmentPhoto.appendChild(createPicture(arrObjectsPhotos[i]));
  });
  renderCommentsBigPicture();
  commentsContainer.appendChild(fragment);
  return fragmentPhoto;
};
picturesContainer.appendChild(renderPictures(arrObjectsPhotos));

var minPicture = document.querySelectorAll('.picture');
var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

// Клик по миниатюре, открытие большой фотографии

var openBigPhoto = function (minPhoto, num) {
  minPhoto.addEventListener('click', function () {
    document.querySelector('body').classList.add('modal-open');
    showBigPicture(arrObjectsPhotos[num]);
    document.addEventListener('keydown', onCloseBigPictureEsc);
  });
};

for (var k = 0; k < minPicture.length; k++) {
  openBigPhoto(minPicture[k], k);
}

var onCloseBigPictureEsc = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPhoto();
  }
};

var closeBigPhoto = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onCloseBigPictureEsc);
};

bigPictureCancel.addEventListener('click', function () {
  closeBigPhoto();
});


document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');

// 4-ый модуль

var uploadFile = document.querySelector('#upload-file');
var formEditPicture = document.querySelector('.img-upload__overlay');
var btnCloseFormEditPicture = formEditPicture.querySelector('.img-upload__cancel');
var armChangeDeepPicture = formEditPicture.querySelector('.effect-level__pin');
var effectLevelDepth = formEditPicture.querySelector('.effect-level__depth');
var slider = formEditPicture.querySelector('.img-upload__effect-level');
var imgUploadPreview = formEditPicture.querySelector('.img-upload__preview img');
var imgUploadPreviewInner = formEditPicture.querySelector('.img-upload__preview');
var radiobuttonsEffect = formEditPicture.querySelectorAll('.effects__radio');
var imgUploadClasses = [
  'effects__preview--no-filter',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat'
];


var onFormEditPictureEscClose = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeFormEditPicture();
    openBigPhoto();
  }
};

var openFormEditPicture = function () {
  formEditPicture.classList.remove('hidden');
  document.addEventListener('keydown', onFormEditPictureEscClose);
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


var onBtnEffectClick = function (radiobutton, classEffect) {

  slider.classList.add('hidden');
  radiobutton.addEventListener('click', function () {
    imgUploadPreview.style.removeProperty('filter');
    imgUploadPreview.removeAttribute('class');
    imgUploadPreview.setAttribute('class', classEffect);
    armChangeDeepPicture.style.left = '100%';
    effectLevelDepth.style.width = '100%';
    scaleControlValue.value = '100%';
    imgUploadPreviewInner.style.transform = 'scale(1)';

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

var effectLevelLine = formEditPicture.querySelector('.effect-level__line');
var effectLevelValue = formEditPicture.querySelector('.effect-level__value');
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

    if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
      imgUploadPreview.style.filter = 'grayscale' + '(' + (effectLevelValue.value / 100) + ')';
    } else if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
      imgUploadPreview.style.filter = 'sepia' + '(' + (effectLevelValue.value / 100) + ')';
    } else if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
      imgUploadPreview.style.filter = 'invert' + '(' + effectLevelValue.value + '%' + ')';
    } else if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
      imgUploadPreview.style.filter = 'blur' + '(' + (effectLevelValue.value / 100 * 3) + 'px' + ')';
    } else if (imgUploadPreview.classList.contains('effects__preview--heat')) {
      imgUploadPreview.style.filter = 'brightness' + '(' + (effectLevelValue.value / 100 * 2 + 1) + ')';
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


// scale

var scaleControlSmaller = formEditPicture.querySelector('.scale__control--smaller');
var scaleControlBigger = formEditPicture.querySelector('.scale__control--bigger');
var scaleControlValue = formEditPicture.querySelector('.scale__control--value');
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
