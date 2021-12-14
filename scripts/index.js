let bodyMain = document.querySelector('body');
let main = document.createElement('main');
bodyMain.append(main);

//main header
let header = document.createElement('h1');
header.setAttribute('id', 'header');
let text = document.createTextNode(
  'Bored? Click one of the buttons and get a suggestion what you can listen to!'
);
header.appendChild(text);

main.appendChild(header);

//reusable func to create divs
function createDiv(id, className, appendPlace) {
  let div = document.createElement('div');
  div.id = id;
  div.className = className;

  appendPlace.append(div);

  return div;
}

//reusable func to create buttons
function createButton(id, appendPlace, btnText) {
  let btn = document.createElement('button');
  btn.id = id;
  appendPlace.append(btn); /*where to append*/
  btn.textContent = btnText; /*text inside the button*/
  return btn;
}

createDiv('btn-container', '', main);
let btnContainer = document.getElementById('btn-container');
main.appendChild(btnContainer);

createButton('btn-documentary', btnContainer, 'A Documentary');
let btnDoc = document.getElementById('btn-documentary');

createButton('btn-music', btnContainer, 'Some Music');
let btnMusic = document.getElementById('btn-music');

//-----------fetching info from SR api---------------
let listOfPrograms;

fetch(
  'https://api.sr.se/api/v2/programs/index?pagination=false&format=json&programcategoryid=82'
)
  .then(function (response) {
    return response.json();
  })
  .then(function (respData) {
    listOfPrograms = respData;
    console.log('list', listOfPrograms);
    // console.log(respData.programs[0].description);
  });

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
    // console.log(respData.programs[0].description);
  });
//---------------------------------------------------

//creating container where program info will be stored
createDiv('program-div', 'div', main);
let div = document.getElementById('program-div');

//image container
createDiv('image-div', '', div);
let imageDiv = document.getElementById('image-div');

//container with information about the program
createDiv('info-div', '', div);
let infoDiv = document.getElementById('info-div');

let h2 = document.createElement('h2');
h2.setAttribute('id', 'program-title');
infoDiv.appendChild(h2);

let p = document.createElement('p');
infoDiv.appendChild(p);

//adding listener for click on the button
btnDoc.addEventListener('click', getDocumentary);
btnMusic.addEventListener('click', getDocumentary);

let randomId;

//get a random documentary array
function getRandomId(list) {
  randomId = list.programs[[Math.floor(Math.random() * list.programs.length)]];
  console.log(randomId);
}

function getDocumentary() {
  if (btnDoc.clicked === true) {
    getRandomId(listOfPrograms);
  } else {
    getRandomId(listOfMusicPrograms);
  }
  btnDoc.removeEventListener('click', getDocumentary);
  btnMusic.removeEventListener('click', getDocumentary);

  let name = randomId.name;
  h2.textContent = name;

  let description = randomId.description;
  p.textContent = description;

  let img = document.createElement('img');
  imageDiv.appendChild(img);
  let image = randomId.socialimage;
  img.src = image;

  let anchor = document.createElement('a');
  infoDiv.appendChild(anchor);
  let link = randomId.programurl;
  anchor.setAttribute('href', link);
  anchor.textContent = 'You can listen to it here';

  let picture = randomId.programimage;
  console.log(picture);
  div.style.border = '1px solid black';
}
