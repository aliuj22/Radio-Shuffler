let listOfMusicPrograms;

fetch(
  'https://api.sr.se/api/v2/programs/index?pagination=false&format=json&programcategoryid=5'
)
  .then(function (response) {
    return response.json();
  })
  .then(function (respData) {
    listOfMusicPrograms = respData;
    console.log('music list', listOfMusicPrograms);
  });
