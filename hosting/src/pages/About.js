import React, { useState } from 'react';
import './About.scss';
import ChatInput from '../components/chatinput.js';
import SlowText from '../components/slowtext.js';
import LoadingDots from '../components/loadingDots.js';
import Markdown from 'react-markdown'

function TeamMember({image, name, title}) {
  return (
    <section className="team-member">
      <img src={image}/>
      <div className="details">
          <h5>{name}</h5>
          <p>{title}</p>
      </div>
    </section>
  );
}

function About() {
  return (
    <div className="about">
        <div className="welcome">
            <h1>Ask Hydro any<span>Sui</span>ng</h1>
            <img src='logo_big.png' className="App-logo" alt="logo" />
        </div>
        <div className="about">
            <div className="about-content">
                <h4>Hydro, the first <span>AI-trained</span> water creature that swims in the data network of SUI.</h4>
                <p>Sui is a permissionless Layer 1 blockchain designed</p>
                <p>from the ground up to enable creators and developers to</p>
                <p>build experiences that cater to the next billion users in web3.</p>
            </div>
        </div>
        <div className="team">
            <h3>Who created Hydro?</h3>
            <div className="team-content">
                <TeamMember
                    image="panos.png"
                    name="Panos"
                    title="AI Training Master"
                />
                <TeamMember
                    image="luki.png"
                    name="Lowkey"
                    title="Hydro Caretaker"
                />
            </div>
        </div>
        <div className="powered">
            <p>Hydro‘s knowledge is powered by Chainbase and Sui.</p>
            <img src="chainbase.png"/>
            <img src="sui_text.png"/>
        </div>
    </div>
  );
}

export default About;
