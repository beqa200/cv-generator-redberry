import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MyContext } from "../App";
import { mail, phone } from "../assets";

export default function CV() {
  const context = useContext(MyContext);
  const [options, setOptions] = useState<any>();

  function isEmpty(value: any) {
    return (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim().length === 0) ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === "object" && Object.keys(value).length === 0)
    );
  }

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        "https://resume.redberryinternship.ge/api/degrees"
      );
      setOptions(result.data);
    }
    fetchData();
  }, []);
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

      <section
        className="experience"
        style={
          context?.pageCount == 3 ? { borderBottom: "1px solid #C8C8C8" } : {}
        }
      >
        {context.formData.experiences.every((object: any) => {
          return Object.values(object).every((value) => isEmpty(value));
        }) == false && <h2>გამოცდილება</h2>}
        {context.formData.experiences.map((item: any) => (
          <div className="inner">
            <h3 className="position">
              {item.position} {item.employer && ","} {item.employer}
            </h3>

            <p className="date">
              {item.start_date} {item.start_date && item.due_date && "-"}{" "}
              {item.due_date}
            </p>

            <p className="description">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="education">
        {context.formData.educations.every((object: any) => {
          return Object.values(object).every((value) => isEmpty(value));
        }) == false && <h2>განათლება</h2>}
        {context.formData.educations.map((item: any) => (
          <div className="inner">
            <h3 className="position">
              {item.institute}
              {", "}
              {item.degree_id != 0 ? options?.[item.degree_id - 1].title : null}
            </h3>

            <p className="date">{item.due_date}</p>

            <p className="description">{item.description}</p>
          </div>
        ))}
      </section>
    </CVWrapper>
  );
}

const CVWrapper = styled.div`
  width: 662px;
  height: 968px;
  overflow-y: auto;
  padding: 68px 80px 44px;
  background-color: white;

  h2 {
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #f93b1d;
    margin-top: 34px;
  }

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

  .experience,
  .education {
    h2 {
      margin-top: 24px;
    }

    .position {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      margin-top: 15px;
      color: #1a1a1a;
    }

    .date {
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: #919191;
      margin-top: 7px;
    }

    .description {
      width: 662px;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      text-transform: capitalize;
      color: #000000;
      word-wrap: break-word;
      margin-bottom: 32px;
    }
  }
`;
