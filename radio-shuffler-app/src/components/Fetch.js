export async function fetchMusic() {
  return fetch(
    'https://api.sr.se/api/v2/programs/index?pagination=false&format=json&programcategoryid=5'
  )
    .then((response) => response.json())
    .then((respData) => respData.programs)
    .catch((err) => console.log(err));
}

export async function fetchPrograms() {
  return fetch(
    'https://api.sr.se/api/v2/programs/index?pagination=false&format=json&programcategoryid=82'
  )
    .then((response) => response.json())
    .then((respData) => respData.programs)
    .catch((err) => console.log(err));
}
