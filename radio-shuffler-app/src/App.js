// import { fetchPrograms, fetchMusic } from './components/Fetch';
import React from 'react';
import useFetch from 'react-fetch-hook';
import { Header, ProgramsContainer, Button } from './components/index';
import './App.scss';

function App() {
  // const [musicPrograms, setmusicPrograms] = useState();
  // const [docPrograms, setDocPrograms] = useState();

  // useEffect(() => {
  //   fetchMusic().then((res) => setmusicPrograms(res));
  // }, []);

  // useEffect(() => {
  //   fetchPrograms().then((res) => setDocPrograms(res));
  // }, []);

  // console.log(docPrograms);
  // console.log(musicPrograms, 'from app musicPrograms');

  const resultMusic = useFetch(
    'https://api.sr.se/api/v2/programs/index?pagination=false&format=json&programcategoryid=5',
    { formatter: (data) => data.json() }
  );
  const resultDocumentary = useFetch(
    'https://api.sr.se/api/v2/programs/index?pagination=false&format=json&programcategoryid=82',
    { formatter: (data) => data.json() }
  );

  if (resultMusic.isLoading && resultDocumentary.isLoading) return 'Loading...';
  if (resultMusic.error && resultDocumentary.error) return 'Error!';

  // const doc = resultDocumentary.data;
  // console.log(doc);
  return (
    <div className="App">
      <Header />
      <Button musicList={resultMusic.data.programs} />
      <ProgramsContainer />
    </div>
  );
}

export default App;
