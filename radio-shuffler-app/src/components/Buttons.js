import { useState } from 'react';
import './Buttons.scss';
import { ProgramsContainer } from './index';

const Button = ({ programList, musicList }) => {
  const [name, setName] = useState('🎧🎶');
  const [image, setImage] = useState(
    'https://images.unsplash.com/photo-1488109811119-98431feb6929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80'
  );
  const [description, setDescription] = useState('What Will It Be? 🧐');
  const [link, setLink] = useState('');
  const [broadcastInfo, setBroadcastInfo] = useState('');

  let randomId;
  let getRandomProgramId = (list) => {
    randomId = list[[Math.floor(Math.random() * list.length)]];
    console.log(randomId);
    getChosenProgramData();
  };

  const getChosenProgramData = () => {
    setName(randomId.name);
    setImage(randomId.socialimage);
    setDescription(randomId.description);
    setLink(randomId.programurl);
    setBroadcastInfo(randomId.broadcastinfo);
  };

  return (
    <>
      <div id="btn-container">
        {/* <button id="btn-documentary" onClick={getRandomProgramId(programList)}>
          En Dokumentär
        </button> */}
        <button id="btn-music" onClick={() => getRandomProgramId(musicList)}>
          Lite Musik
        </button>
      </div>
      <div id="programs">
        <ProgramsContainer
          name={name}
          image={image}
          description={description}
          link={link}
          bInfo={broadcastInfo}
        />
      </div>
    </>
  );
};
export default Button;
