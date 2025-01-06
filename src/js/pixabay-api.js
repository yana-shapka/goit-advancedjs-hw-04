export const fetchPhotosByQuery = searchQuery => {
  return fetch(
    `https://pixabay.com/api/?key=47683521-7bc13f64e806eb93b38e1f294&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};
