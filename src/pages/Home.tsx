import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MyContext } from "../App";
import { background, logo, redberryLogo } from "../assets";

export default function Home() {
  const navigate = useNavigate();
    const context = useContext(MyContext);
  useEffect(() => {
    context.setcv(false);
  }, [])
  return (
    <HomeWrapper>
      <header>
        <img src={redberryLogo} />
      </header>
      <div>
        <button
          onClick={() => {
            navigate("/personal");
          }}
        >
          ᲠᲔᲖᲘᲣᲛᲔᲡ ᲓᲐᲛᲐᲢᲔᲑᲐ
        </button>
      </div>
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  height: 100vh;
  width: 100%;
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
