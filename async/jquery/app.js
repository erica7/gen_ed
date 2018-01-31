// async requests with the jQuery library 

const key = UNSPLASH_KEY;
const form = $('#search-form')[0];
const searchField = $('#search-keyword')[0];
const responseContainer = $('#response-container')[0];
var searchedForText;

$('#search-form').on('submit', function (e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;

  // var settings = {
  //   url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}&client_id=${key}`
  // }

  var settings = {
    url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
    headers: {
      'Authorization': `Client-ID ${key}`
    }
  }

  $.ajax(settings).done(addImage).fail(requestError)
});

function handleResponse(data) {
  console.log('The ajax request has finished.')
  console.log(data)
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




