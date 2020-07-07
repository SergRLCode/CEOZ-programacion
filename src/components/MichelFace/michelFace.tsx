import React from 'react';
import Michel from '../../assets/michel.png';
import './michelface.style.sass';
const chupas = require('../../assets/chupas.opus');

const Home = () => {
  return (
    <div className="home">
      <img src={Michel} alt="MichelFace" />
      <audio autoPlay>
        <source src={chupas} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Home;
