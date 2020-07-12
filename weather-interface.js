let weatherKey = [d01302b2876fd63f75c5b0d31eac7ae3];
let giphyKey = [fHBhfMsPtKSg5z0ID8jRyAX7SO9mjeTS];

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    $('#location').val("");

    weatherCall()
    .then(function(response) {
      let body = JSON.parse(response);
      let humidity = body.main.humidity;
      return giphyCall(humidity);
    })
    .then(function(response) {
    let giphyResponse = JSON.parse(response);
    let image = giphyResponse["data"][0]["images"]["downsized"]["url"];
    $('.showImage').html(`<img src='${image}'>`);
  });

    function giphyCall(humidity) {
      return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        let url = `http://api.giphy.com/v1/gifs/search?q=${humidity}&api_key=${giphyKey}&limit=5`

        request.onload = function() {
          if (this.status === 200) {
            resolve(request.response);
          } else {
            reject(Error(request.statusText));
          }
        }

        request.open("GET", url, true);
        request.send();
      });
    }

    weatherCall()
      .then(function(response) {
        let body = JSON.parse(response);
        let humidity = body.main.humidity;
        return giphyCall(humidity);
      })
      .then(function(response) {
      let giphyResponse = JSON.parse(response);
      let image = giphyResponse["data"][0]["images"]["downsized"]["url"];
      $('.showImage').html(`<img src='${image}'>`);
    });
  });
});