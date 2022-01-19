import React, { useEffect, useState } from 'react';
import { Header, Button, ProgramsContainer } from './components/index';
import './App.scss';
import axios from 'axios';

function App() {

  //----fetch----//
  const defaultApi =
    'https://api.sr.se/api/v2/programs/index?pagination=false&format=json&programcategoryid=';

  const [musicPrograms, setmusicPrograms] = useState([]);
  const [docPrograms, setDocPrograms] = useState([]);

  const fetchData = () => {
    const musicAPI = `${defaultApi}5`;
    const docAPI = `${defaultApi}82`;

    const getMusicData = axios.get(musicAPI);
    const getDocData = axios.get(docAPI);

    axios
      .all([getMusicData, getDocData])
      .then(
        axios.spread((...allData) => {
          const allDataMusic = allData[0].data.programs;
          const allDataDoc = allData[1].data.programs;

          setmusicPrograms(allDataMusic);
          setDocPrograms(allDataDoc);
        })
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  //---Button and ProgramsContainer functionality---//

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

//data later passed to ProgramsContainer to be printed to the screen
  const getChosenProgramData = () => {
    setName(randomId.name);
    setImage(randomId.socialimage);
    setDescription(randomId.description);
    setLink(randomId.programurl);
    setBroadcastInfo(randomId.broadcastinfo);
  };

  return (
    <div className="App">
      <Header />

      <div id="btn-container">
        <Button
          id={'btn-documentary'}
          text={'En Dokumentär'}
          onClick={() => {
            getRandomProgramId(docPrograms);
          }}
        />
        <Button
          id={'btn-music'}
          text={'Lite Musik'}
          onClick={() => {
            getRandomProgramId(musicPrograms);
          }}
        />
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
    </div>
  );
}

export default App;
