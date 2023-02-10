import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MyContext } from "../App";
import { leftArrow } from "../assets";

export default function Header() {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  return (
    <HeaderWrapper>
      <h1>პირადი ინფო</h1>
      <p>{context?.pageCount}/3</p>
      <img
        src={leftArrow}
        onClick={() => {
          navigate("/");
        }}
      />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  position: relative;
  display: flex;
  width: 798px;
  border-bottom: 1px solid #1a1a1a;
  height: 88px;
  justify-content: space-between;
  margin: auto;

  h1 {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    margin-top: 47px;
  }

  p {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #1a1a1a;
    margin-top: 47px;
  }

  img {
    position: absolute;
    width: 9.21px;
    height: 16px;
    padding: 12px 16px 12px 14px;
    border-radius: 100%;
    background-color: white;
    left: -78px;
    top: 45px;
  }
`;
