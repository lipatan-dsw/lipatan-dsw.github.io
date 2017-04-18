(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        //appendString += '<li><a href="' + item.url + '"><h3>' + item.title + '</h3></a>';
        //appendString += '<p>' + item.content.substring(0, 150) + '...</p></li>';
        appendString += '<div class="col-sm-4">';
        appendString += '<div class="product-image-wrapper">';
        appendString += '<div class="single-products">';
        appendString += '<div class="productinfo text-center">';
        appendString += '<img src="' + item.image + '" alt="' + item.product + '" title="' + item.product + '" />';
        appendString += '<p>' + item.price + '</p>';
        appendString += '<h2>' + item.product + '</h2>';
        appendString += '<a href="' + item.permalink + '" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Beli</a>';
        appendString += '</div>';
        appendString += '<div class="product-overlay">';
        appendString += '<div class="overlay-content">';
        appendString += '<p>' + item.price + '</p>';
        appendString += '<h2>' + item.product + '</h2>';
        appendString += '<a href="' + item.permalink + '" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Beli</a>';
        appendString += '</div>';
        appendString += '</div>';
        appendString += '</div>';
        appendString += '</div>';
        appendString += '</div>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<div>No results found</div>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('author');
      this.field('category');
      this.field('content');
      this.field('image');
      this.field('price');
      this.field('product');
      this.field('permalink');
    });

    for (var key in window.store) { // Add the data to lunr
      idx.add({
        'id': key,
        'title': window.store[key].title,
        'author': window.store[key].author,
        'category': window.store[key].category,
        'content': window.store[key].content,
        'image': window.store[key].image,
        'price': window.store[key].price,
        'product': window.store[key].product,
        'permalink': window.store[key].permalink
      });

      var results = idx.search(searchTerm); // Get lunr to perform a search
      displaySearchResults(results, window.store); // We'll write this in the next section
    }
  }
})();