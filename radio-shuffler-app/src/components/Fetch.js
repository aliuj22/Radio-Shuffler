const defaultApi =
  'https://api.sr.se/api/v2/programs/index?pagination=false&format=json&programcategoryid=';

export async function fetchMusic() {
  return fetch(`${defaultApi}5`)
    .then((response) => response.json())
    .then((respData) => respData.programs)
    .catch((err) => console.log(err));
}

export async function fetchPrograms() {
  return fetch(`${defaultApi}82`)
    .then((response) => response.json())
    .then((respData) => respData.programs)
    .catch((err) => console.log(err));
}
