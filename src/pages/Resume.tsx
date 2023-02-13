import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MyContext } from "../App";
import { deleteIcon, leftArrow } from "../assets";
import CV from "../components/CV";

export default function Resume() {
  const context = useContext(MyContext);
  const [message, setMessage] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    context.setcv(false);
  }, []);
  return (
    <ResumeWrapper>
      <img
        src={leftArrow}
        className="back"
        onClick={() => {
          localStorage.removeItem("formData");
          navigate("/");
        }}
      />
      <div className="cvWrapper">
        <CV />{" "}
      </div>

      {message && (
        <div className="success">
          <img
            src={deleteIcon}
            onClick={() => {
              setMessage(false);
            }}
          />
          <p>რეზიუმე წარმატებით გაიგზავნა 🎉</p>
        </div>
      )}
    </ResumeWrapper>
  );
}

const ResumeWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  .back {
    position: absolute;
    padding: 12px 16px 12px 14px;
    background: #f9f9f9;
    border-radius: 50%;
    left: 48px;
    top: 45px;
  }

  .cvWrapper {
    border: 0.8px solid #000000;
  }

  .success {
    position: absolute;
    width: 364px;
    height: 87px;
    padding: 39px 33px 41px 30px;
    background: #ffffff;
    border: 1px solid #e4e4e4;
    box-shadow: 0px 4px 28px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    top: 53px;
    right: 70px;

    img {
      position: absolute;
      top: 17px;
      right: 11px;
    }
    p {
      font-size: 28px;
      line-height: 43px;
      color: #1a1a1a;
    }
  }
`;
