'use strict';

{
  const images = [
    './assets/img/640480.jpg',
    './assets/img/480480.jpg',
    './assets/img/480640.jpg',
    './assets/img/640640.jpg',
    './assets/img/320240.jpg',
    './assets/img/240320.jpg',
    './assets/img/720480.jpg',
    './assets/img/240240.jpg',
    './assets/img/512512.jpg',
    './assets/img/400400c.jpg',
  ];

  let currentIndex = 0;

  // メイン画像領域に画像をセット
  const mainImageBox = document.getElementById('main-image-box');
  const img = document.createElement('img');
  img.src = images[currentIndex];
  img.classList.add('main-image');
  img.setAttribute('data-src', img.src);
  mainImageBox.appendChild(img);

  // 画像配列からサムネイルを生成
  images.forEach((image, index) => {
    // サムネイル画像生成
    const img = document.createElement('img');
    img.classList.add('thumbnail');
    img.src = image;
    img.setAttribute('data-src', img.src);
    // サムネイル画像Box生成
    const thumbnailBox = document.createElement('div');
    thumbnailBox.classList.add('thumbnail-box');
    // 起動時は images[0] === 0
    if (index === currentIndex) {
      thumbnailBox.classList.add('current');
    }
    // サムネイル画像をクリック
    thumbnailBox.addEventListener('click', () => {
      // forEach の image を代入
      img.src = image;
      // メイン画像にセット
      let mainImage = document.querySelector('.main-image');
      mainImage.setAttribute('src', img.src);
      mainImage.setAttribute('data-src', img.src);
      // サムネイル画像にセット
      let thumbnailElement = document.querySelectorAll('.thumbnail-box');
      thumbnailElement[currentIndex].classList.remove('current');
      currentIndex = index;
      thumbnailElement[currentIndex].classList.add('current');
    });
    // 下記が生成される
    // <div class="thumbnail-box"><img class="thumbnail" src="xxx.jpg" data-src="xxx.jpg"></div>
    thumbnailBox.appendChild(img);
    // 親要素に挿入
    document.getElementById('thumbnails').appendChild(thumbnailBox);
  });

  // 戻る、進むボタン
  let thumbnailElement = document.querySelectorAll('.thumbnail-box');

  function prevBtn(ele, target) {
    ele.addEventListener('click', (e) => {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = images.length - 1;
        thumbnailElement[0].classList.remove('current');
        thumbnailElement[currentIndex].classList.add('current');
      } else {
        thumbnailElement[currentIndex + 1].classList.remove('current');
        thumbnailElement[currentIndex].classList.add('current');
      }
      document.querySelectorAll('.thumbnail-box')[currentIndex].click();
      // let mainImage = document.querySelector('.main-image');
      target.setAttribute('src', images[currentIndex]);
      target.setAttribute('data-src', img.src);

      e.stopPropagation();
    });
  }

  function nextBtn(ele, target) {
    ele.addEventListener('click', (e) => {
      currentIndex++;
      if (currentIndex > images.length - 1) {
        currentIndex = 0;
        thumbnailElement[images.length - 1].classList.remove('current');
        thumbnailElement[currentIndex].classList.add('current');
      } else {
        thumbnailElement[currentIndex - 1].classList.remove('current');
        thumbnailElement[currentIndex].classList.add('current');
      }
      document.querySelectorAll('.thumbnail-box')[currentIndex].click();
      // let mainImage = document.querySelector('.main-image');
      target.setAttribute('src', images[currentIndex]);
      target.setAttribute('data-src', img.src);

      e.stopPropagation();
    });
  }

  let mainImage = document.querySelector('.main-image');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  prevBtn(prev, mainImage);
  nextBtn(next, mainImage)

  // モーダル表示ここから
  function modal() {
    // モーダル器
    const modalWrapper = document.querySelector('.modal-wrapper');
    const modalShowImage = document.querySelector('.modal-image');
    // 現在表示されている画像
    const mainImages = document.querySelectorAll('.main-image');
    // 現在表示されている画像をクリック
    mainImages.forEach(function (image) {
      image.addEventListener('click', function () {
        // モーダル表示
        modalWrapper.classList.add('show');
        modalShowImage.classList.add('show');
        // 画像表示
        var imageSrc = image.getAttribute('data-src');
        modalShowImage.src = imageSrc;
        // 戻る、進むボタン
        const modalImagePrev = document.getElementById('modal-image-prev');
        const modalImageNext = document.getElementById('modal-image-next');
        prevBtn(modalImagePrev, modalShowImage);
        prevBtn(modalImageNext, modalShowImage);
      });
    });
    // 閉じる
    const closeBtn = document.querySelector('#close');
    modalWrapper.addEventListener('click', function () {
      if (modalWrapper.classList.contains('show')) {
        modalWrapper.classList.remove('show');
        modalShowImage.classList.remove('show');
      }
    });
  }

  modal();

}