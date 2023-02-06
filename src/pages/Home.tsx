import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { background, logo, redberryLogo } from "../assets";

export default function Home() {
  return (
    <HomeWrapper>
      <header>
        <img src={redberryLogo} />
      </header>
      <div>
        <Link to="/personal">
          <button>ᲠᲔᲖᲘᲣᲛᲔᲡ ᲓᲐᲛᲐᲢᲔᲑᲐ</button>
        </Link>
      </div>
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  height: 100vh;
  background-image: url(${background}), url(${logo});
  background-size: cover, 299px;
  background-repeat: no-repeat;
  background-position: 0, left 1076px top 473px;

  header {
    display: flex;
    align-items: center;
    width: 1780px;
    height: 89px;
    margin: auto;
    border-bottom: 1px solid #1a1a1a;
  }

  div {
    display: flex;
    justify-content: center;

    a {
        width: 464px;
    height: 60px;    
    }

    button {
    width: 464px;
    height: 60px;
    background: #1a1a1a;
    border-radius: 8px;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #ffffff;
    margin-top: 424px;
  }
  }

  

  
`;
