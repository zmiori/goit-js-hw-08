const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

// REFS
const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const closeLightBoxBtnRef = document.querySelector(
  '[data-action="close-lightbox"]',
);
const largeImageRef = document.querySelector('.lightbox__image');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');

// console.log(lightboxOverlayRef);

// CLICKS HANDLER
galleryRef.addEventListener('click', handleImageClick);

// CLOSE LIGHTBOX
closeLightBoxBtnRef.addEventListener('click', closeLightBox);
lightboxOverlayRef.addEventListener('click', closeLightBox);

// KEYS LISTENER
document.addEventListener('keydown', event => {
  // console.log(event.key);
  if (lightboxRef.classList.contains('is-open') && event.key === 'Escape') {
    closeLightBox();
  } else if (
    lightboxRef.classList.contains('is-open') &&
    event.key === 'ArrowRight'
  ) {
    switchForward();
  } else if (
    lightboxRef.classList.contains('is-open') &&
    event.key === 'ArrowLeft'
  ) {
    switchBackward();
  }
  return;
});

// ADD HTML FOR GALLERY ITEM
function insertGalleryItem(item) {
  const galleryItemRef = document.createElement('li');
  galleryItemRef.classList.add('gallery__item');

  galleryItemRef.innerHTML = '<a>';
  const galleryLinkRef = galleryItemRef.querySelector('a');
  galleryLinkRef.classList.add('gallery__link');
  galleryLinkRef.setAttribute('href', item.original);

  galleryLinkRef.innerHTML = '<img>';
  const galleryImageRef = galleryItemRef.querySelector('img');
  galleryImageRef.classList.add('gallery__image');
  galleryImageRef.setAttribute('alt', item.description);
  galleryImageRef.setAttribute('src', item.preview);
  galleryImageRef.setAttribute('data-source', item.original);

  return galleryRef.insertAdjacentElement('afterbegin', galleryItemRef);
}

// ADD IN HTML IMAGES FROM THE ARRAY
function addToGallery(array) {
  array.forEach(item => insertGalleryItem(item));
}
addToGallery(images);

// HANDLE IMAGE CLICK
function handleImageClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') return;

  openLightbox();
  setLargeImage(event.target);

  return;
}

function openLightbox() {
  lightboxRef.classList.add('is-open');
}

function closeLightBox() {
  lightboxRef.classList.remove('is-open');
  largeImageRef.src = '';
  largeImageRef.alt = '';
  // console.log(largeImageRef);
}

function setLargeImage(image) {
  largeImageRef.src = image.dataset.source;
  largeImageRef.alt = image.alt;
  // console.log(largeImageRef);
}

function switchForward() {
  images.map(item => {
    if (item.description === largeImageRef.alt) {
      const i = images.indexOf(item);

      if (i > 0) {
        // console.log(images[i - 1].original);
        largeImageRef.src = images[i - 1].original;
        largeImageRef.alt = images[i - 1].description;
      } else {
        return;
      }
    }
  });
}

function switchBackward() {
  for (let i = images.length - 1; i >= 0; i -= 1) {
    if (images[i].description === largeImageRef.alt) {
      if (i !== images.length - 1) {
        largeImageRef.src = images[i + 1].original;
        largeImageRef.alt = images[i + 1].description;
        break;
      }
    }
  }
}
