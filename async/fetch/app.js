
// fetch API: promised-based async requests

const key = UNSPLASH_KEY;
const form = document.querySelector('#search-form');
const searchField = document.querySelector('#search-keyword')
const responseContainer = document.querySelector('#response-container');
let searchedForText;

form.addEventListener('submit', function (e) {
  e.preventDefault();
  searchedForText = searchField.value;
  responseContainer.innerHTML = '';
  let url = `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`;
  fetch(url, {
    headers: {
      Authorization: `Client-ID ${key}`
    }
  })
  .then(responseError)
  .then(response => {
    let jsonResponse = response.json();
    // console.log(jsonResponse);
    return jsonResponse;
  })
  .then(addImage)
  .catch(e => requestError(e));

  // NOTE .catch runs when network error is encountered, although this usually means permissions issues or similar (e.g. bad origin)
});

function responseError(response) {
  if (!response.ok) {
    console.log("There was an error with the response.")
    console.log(response.statusText)
  }
  return response;
}

function addImage(data) {
  clearSearch();
  let htmlContent = '';
  if(data && data.results && data.results[0]) {
    const firstImage = data.results[0];
    htmlContent = `
      <figure>
        <img src="${firstImage.urls.small}" alt="${searchedForText}" />
        <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
      </figure>
    `;
  } else {
    htmlContent = '<div>No images available</div>';
  }
  responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
}

function requestError(err) {
  console.log("There was an error with the request.")
  console.log(err)
}

function clearSearch() {
  searchField.value = '';
}
