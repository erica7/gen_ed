// XHR requests 

(function () {
  const key = "c3f46be33b42052c824c21899cea4ab783ffb2618961597c5a9624592c24ac96";
  const form = document.querySelector('#search-form');
  const searchField = document.querySelector('#search-keyword')
  let searchedForText;
  const responseContainer = document.querySelector('#response-container');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    // const searchedForText = 'hippos'
    
    const unsplashRequest = new XMLHttpRequest();
    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    unsplashRequest.onload = addImage;
    unsplashRequest.onerror = handleError;
    unsplashRequest.setRequestHeader('Authorization', `Client-ID ${key}`);
    unsplashRequest.send();


    function clearSearch () {
      // let searchField = document.querySelector('#search-keyword')
      searchField.value = '';
    }

    /// Add image to html
    function addImage () {
      clearSearch();
      let htmlContent = '';
      const data = JSON.parse(this.responseText);

      if (data && data.results && data.results[0]) {
        const firstImage = data.results[0];
        htmlContent = `
          <figure>
            <img src="${firstImage.urls.small}" alt="${searchedForText}" />
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
          </figure>
        `
      } else {
        htmlContent = '<div>No images available</div>'
      }

      responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }
    /// Print the response text (e.g. html)
    function handleSuccess () { 
      console.log( this.responseText ); 
    }
    /// Print a note in event of error 
    function handleError () { 
      console.log( 'An error occurred \uD83D\uDE1E' );
    }

  });
})();