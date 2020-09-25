import galleryItems from './gallery-items.js';
import images from './gallery-items.js';

const galleryListEl = document.querySelector('.js-gallery');
const galleryMarkup = createGalleryCardsMarkup(images);
galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);
function createGalleryCardsMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
    <a
        class="gallery__link"
        href="${original}"
    >
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
</li>`;
    })
    .join('');
}

// відкрити модалку
galleryListEl.addEventListener('click', onGalleryImgContainerClick);
const modalEl = document.querySelector('.js-lightbox');
const modalImg = document.querySelector('.lightbox__image');

function onGalleryImgContainerClick(e) {
  const isImgEl = e.target.classList.contains('gallery__image');
  const modalImgLink = e.target.dataset.source;
  const modalImgAlt = e.target.alt;

  if (!isImgEl) {
    return;
  }
  e.preventDefault();
  modalEl.classList.add('is-open');
  modalImg.src = modalImgLink;
  modalImg.alt = modalImgAlt;

  window.addEventListener('keydown', onEscBtnClick);

  window.addEventListener('keydown', onArrBtnClick);
}
// закрити модалку
const closeBtn = document.querySelector('button[data-action="close-lightbox"]');
closeBtn.addEventListener('click', onModalCloseBtnClick);
function closeModal() {
  modalEl.classList.remove('is-open');
  modalImg.src = '';
  modalImg.alt = '';

  window.removeEventListener('keydown', onEscBtnClick);

  window.removeEventListener('keydown', onArrBtnClick);
}
function onModalCloseBtnClick(e) {
  closeModal();
}
// закрити модалку по кліку в оверлей
window.addEventListener('click', onModalOverlayClick);
function onModalOverlayClick(e) {
  if (!e.target.classList.contains('lightbox__overlay')) {
    return;
  }
  closeModal();
}
// закрити модалку на Esc
window.addEventListener('keydown', onEscBtnClick);
function onEscBtnClick(e) {
  if (e.code !== 'Escape') {
    return;
  }
  closeModal();
}

// гортання картинок стрілками

// window.addEventListener('keydown', onArrBtnClick);
function onArrBtnClick(e) {
  let imgInd = images.findIndex(image => image.original === modalImg.src);

  if (e.code === 'ArrowLeft') {
    if (imgInd === 0) {
      imgInd = images.length - imgInd;
    }
    imgInd -= 1;
  }

  if (e.code === 'ArrowRight') {
    if (imgInd === images.length - 1) {
      imgInd = imgInd - images.length;
    }
    imgInd += 1;
  }

  modalImg.src = images[imgInd].original;
}
