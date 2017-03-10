const getQuote = document.getElementById('quote-btn');

getQuote.addEventListener('click', function() {
  const request	 = new XMLHttpRequest(),
				tweetBtn = document.getElementById('tweet-link'),
				quoteHolder = document.getElementById("quote"),
      	url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';

  request.open('GET', url, true);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {

      let data = JSON.parse(request.responseText),
          collected = data[0],
					tweetUrl = `https://twitter.com/share?text=${encodeURIComponent(collected)}&url=/`;

      quoteHolder.innerHTML = collected;
			tweetBtn.setAttribute('href', tweetUrl);

    } else {
			quoteHolder.innerHTML = 'Everything went as planned but the API is not playing nicely. Please try again later';
    }
  };

  request.onerror = () => {
		quoteHolder.innerHTML = 'There\'s been an issue connecting to the API, we\'re sorry please try again later.';
  };
  request.send();
});
