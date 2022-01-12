import { React } from 'react';
import './Buttons.scss';

const Button = ({ programList, musicList }) => {
  let getRandomId = (list) => {
    let randomId = list[[Math.floor(Math.random() * list.length)]];
    console.log(randomId);
  };

  return (
    <div id="btn-container">
      {/* <button id="btn-documentary" onClick={getRandomId(programList)}>
        En Dokumentär
      </button> */}
      <button id="btn-music" onClick={() => getRandomId(musicList)}>
        Lite Musik
      </button>
    </div>
  );
};
export default Button;
