function buttonClicked() {
  const clickButton = document.getElementById('btn');
  clickButton.addEventListener('click', () => {
    const query = document.getElementById('search').value
    console.log('query:', query);
    const options = {
      method: 'POST',
      headers: { "Content-Type": "text/plain" },
      body: query,
    };
    // send chinese search to ibm-translate api in index.js
    const response = fetch('/api', options);

  })
}

function setup(query) {
  const apiKey = "i0YNx60dA7EtWa0WIt3490EklKT1h7Ib"
  const limit = "1"
  const offset = "0"
  const rating = "g"
  const giphyAPI = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${limit}&offset=${offset}&rating=${rating}&lang=en`
  getGIF(giphyAPI)
    .then(url => {
      const gif = document.getElementById('giphy');
      gif.src = url;
  })
    .catch(err => console.error('You have an error'))
}

async function getGIF(giphyAPI) {
  const response = await fetch(giphyAPI);
  const json = await response.json();
  const url = json.data[0].images['original'].url;
  return url;
}

buttonClicked();