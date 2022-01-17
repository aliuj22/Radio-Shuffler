import React from 'react';
import './ProgramsContainer.scss';

const ProgramsContainer = (props) => {
  const altText = `The logo of ${props.name}`;
  const infotext = `Sänds annars på: ${props.bInfo} `;

  return (
    <div id="program-div">
      <div id="image-div">
        <img src={props.image} alt={altText} />
      </div>
      <div id="infoDiv">
        <h2 id="program-title">
          {props.name} <hr />
        </h2>
        <p id="p">{props.description}</p>
        <a target="_blank" rel="noreferrer" href={props.link} id="link">
          {!props.link ? '' : 'Lyssna Här'}
        </a>
        <p id="p2">
          {!props.bInfo || props.bInfo === 'Sidan uppdateras inte. ' ? (
            ''
          ) : (
            <i>{infotext}</i>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProgramsContainer;
