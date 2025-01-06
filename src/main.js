import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import { createGalleryCardTemplate } from './js/render-functions';
import { fetchPhotosByQuery } from './js/pixabay-api';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader');

let lightbox;

const onSearchFormSubmit = event => {
  event.preventDefault();

  const inputValue = event.currentTarget.elements.user_query.value.trim();

  if (inputValue === '') {
    iziToast.error({
      message: 'Please enter a search word',
      position: 'topRight',
      timeout: 3000,
    });

    return;
  }

  galleryEl.innerHTML = '';

  loaderEl.classList.remove('is-hidden');

  fetchPhotosByQuery(inputValue)
    .finally(() => {
      loaderEl.classList.add('is-hidden');
    })
    .then(data => {
      if (data.total === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          timeout: 3000,
        });

        galleryEl.innerHTML = '';

        return;
      }

      galleryEl.innerHTML = createGalleryCardTemplate(data.hits);
      if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery-link', {
          captions: true,
          captionsData: 'alt',
          captionDelay: 250,
        });
      } else {
        lightbox.refresh();
      }
    })
    .catch(err => {
      console.log(err);
    });
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
