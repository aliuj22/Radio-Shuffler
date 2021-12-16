let bodyMain = document.querySelector('body');
let main = document.createElement('main');
bodyMain.append(main);

//main header
let header = document.createElement('h1');
header.setAttribute('id', 'header');
let text = document.createTextNode(
  /*'Bored? Click one of the buttons and get a suggestion what you can listen to!'*/ ' Uttråkad? Klicka på en av knapparna och få ett förslag på vad du kan lyssna på!'
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

createButton('btn-documentary', btnContainer, 'En Dokumentär');
let btnDoc = document.getElementById('btn-documentary');

createButton('btn-music', btnContainer, 'Lite Musik');
let btnMusic = document.getElementById('btn-music');

//-----------fetching info from SR api---------------
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

//program title
let h2 = document.createElement('h2');
h2.setAttribute('id', 'program-title');
infoDiv.appendChild(h2);

//description
let p = document.createElement('p');
infoDiv.appendChild(p);
p.id = 'p';

//adding listener for click on the button
btnDoc.addEventListener('click', () => {
  console.log('clicked doc');
  getRandomId(listOfPrograms);
});
btnMusic.addEventListener('click', () => {
  console.log('clicked music');
  getRandomId(listOfMusicPrograms);
});

let randomId;
//get a random documentary array
function getRandomId(list) {
  randomId = list.programs[[Math.floor(Math.random() * list.programs.length)]];
  console.log(randomId);
  getDocumentary();
}

function removeEventList(element, functionName) {
  element.removeEventListener('click', functionName);
}

//creating tags that will later be filled with information
let img = document.createElement('img');
let anchor = document.createElement('a');
let p2 = document.createElement('p');
p2.id = 'p2';

function getDocumentary() {
  removeEventList(btnDoc, getDocumentary);
  removeEventList(btnMusic, getDocumentary);

  let name = randomId.name;
  h2.textContent = name;

  let description = randomId.description;
  p.textContent = description;

  imageDiv.appendChild(img);
  let image = randomId.socialimage;
  img.src = image;

  infoDiv.appendChild(anchor);
  let link = randomId.programurl;
  anchor.setAttribute('href', link);
  anchor.id = 'link';
  anchor.textContent = 'Lyssna Här';

  infoDiv.appendChild(p2);
  let broadcastInfo = randomId.broadcastinfo;
  if (broadcastInfo === 'Sidan uppdateras inte. ') {
    console.log('doesnt exist');
    p2.innerHTML = '';
  } else if (broadcastInfo) {
    console.log('exists');
    p2.innerHTML = `<strong>Annars sänds på: </strong> <br> ${broadcastInfo}`; /* innerHtml to be able to add a tag inside the string */
  }
}
