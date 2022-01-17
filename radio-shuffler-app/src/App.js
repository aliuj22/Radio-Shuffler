import React, { useEffect, useState } from 'react';
import { Header, Button } from './components/index';
import './App.scss';
import axios from 'axios';

function App() {
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

  return (
    <div className="App">
      <Header />
      <Button musicList={musicPrograms} programList={docPrograms} />
    </div>
  );
}

export default App;
