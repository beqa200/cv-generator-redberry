import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { MyContext } from "../App";
import { mail, phone } from "../assets";

export default function CV() {
  const context = useContext(MyContext);
  console.log(context?.pageCount);

 
  return (
    <CVWrapper>
      <section
        className="personal"
        style={
          context?.pageCount == 2 ? { borderBottom: "1px solid #C8C8C8" } : {}
        }
      >
        <div style={{ minWidth: "432px" }}>
          <div className="fullname">
            <h1>{context?.formData.name}</h1>
            <h1>{context?.formData.surname}</h1>
          </div>

          <div className="contact">
            {context?.formData.email && (
              <div className="email">
                <img src={mail} />
                <p>{context?.formData.email}</p>
              </div>
            )}
            {context?.formData.phone_number && (
              <div className="phone">
                <img src={phone} />
                <p>{context?.formData.phone_number}</p>
              </div>
            )}
          </div>
          {context?.formData.about_me && (
            <div className="about">
              <h2>ᲩᲔᲛ ᲨᲔᲡᲐᲮᲔᲑ</h2>
              <p>{context?.formData.about_me}</p>
            </div>
          )}
        </div>
        <img className="profile-image" src={context?.formData.image} />
      </section>
    </CVWrapper>
  );
}

const CVWrapper = styled.div`
  width: 662px;
  height: 968px;
  padding: 68px 80px 44px;
  background-color: white;

  .personal {
    display: flex;
    justify-content: space-between;
    .fullname {
      display: flex;
      gap: 20px;
      h1 {
        font-style: normal;
        font-weight: 700;
        font-size: 34px;
        line-height: 42px;
        color: #f93b1d;
      }
    }

    .contact {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 17px;

      div {
        display: flex;
        gap: 11px;

        p {
          font-weight: 400;
          font-size: 18px;
          line-height: 21px;
        }
      }
    }

    .about {
      h2 {
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        color: #f93b1d;
        margin-top: 34px;
      }

      p {
        margin-top: 15px;
        margin-bottom: 19px;
        width: 432px;
        word-wrap: break-word;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        text-transform: lowercase;
      }
    }

    .profile-image {
      width: 246px;
      height: 246px;
      border-radius: 100%;
      margin-bottom: 47px;
    }
  }
`;
