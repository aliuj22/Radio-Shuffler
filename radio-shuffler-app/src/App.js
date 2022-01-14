import { fetchPrograms, fetchMusic } from './components/Fetch';
import React, { useEffect, useState } from 'react';
// import useFetch from 'react-fetch-hook';
import { Header, Button } from './components/index';
import './App.scss';

function App() {
  // const defaultApi =
  //   'https://api.sr.se/api/v2/programs/index?pagination=false&format=json&programcategoryid=';

  const [musicPrograms, setmusicPrograms] = useState([]);
  const [docPrograms, setDocPrograms] = useState([]);

  useEffect(() => {
    fetchMusic()
      .then((res) => setmusicPrograms(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchPrograms()
      .then((res) => setDocPrograms(res))
      .catch((err) => console.log(err));
  }, []);

  console.log(docPrograms, 'app docum');
  console.log(musicPrograms, 'app musicPrograms');

  // const resultMusic = useFetch(
  //   'https://api.sr.se/api/v2/programs/index?pagination=false&format=json&programcategoryid=5',
  //   { formatter: (data) => data.json() }
  // );

  // const resultDocumentary = useFetch(
  //   'https://api.sr.se/api/v2/programs/index?pagination=false&format=json&programcategoryid=82',
  //   { formatter: (data) => data.json() }
  // );
  // if (resultDocumentary.data === undefined) {

  // }
  // if (resultMusic.isLoading && resultDocumentary.isLoading) return 'Loading...';
  // if (resultMusic.error && resultDocumentary.error) return 'Error!';

  // const doc = resultDocumentary.data;
  // console.log(doc);

  // let music;
  // let documentaries;

  // const fetchReq1 = fetch(`${defaultApi}5`)
  //   .then((res) => res.json())
  //   .then((res) => (music = res))
  //   .catch((err) => console.log(err));

  // const fetchReq2 = fetch(`${defaultApi}82`)
  //   .then((res) => res.json())
  //   .then((res) => (documentaries = res))
  //   .catch((err) => console.log(err));
  // // do fetch requests in parallel
  // // using the Promise.all() method
  // let allData = Promise.all([fetchReq1, fetchReq2]);

  // let test;
  // // attach then() handler to the allData Promise
  // allData.then((res) => (test = res));
  // console.log(fetchReq1, 'out');

  return (
    <div className="App">
      <Header />
      <Button musicList={musicPrograms} programList={docPrograms} />
    </div>
  );
}

export default App;
