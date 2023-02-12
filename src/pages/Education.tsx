import React, { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { MyContext } from "../App";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import ExperienceForm from "../components/ExperienceForm";
import { StyledAddButton, StyledButton } from "../styled-components";
import { useNavigate } from "react-router-dom";
import StyledForm from "../styled-components/components/Form";
export default function Experience() {
  const context = useContext(MyContext);
  const [everyError, setEveryError] = useState<any>([{}]);
  const [check, setCheck] = useState(false);
  console.log(check);
  const [items, setItems] = useState<any>([
    {
        institute: "",
        degree_id: "",
        due_date: "",
        description: "",
    },
  ]);
  const [form, setForm] = useState(false);
  const navigate = useNavigate();

  const addItem = () => {
    const clone = [
      ...items,
      {
        institute: "",
        degree_id: "",
        due_date: "",
        description: "",
      },
    ];

    context?.setFormData({ ...context?.formData, experiences: clone });
    const clone2 = [...everyError, {}];
    setEveryError(clone2);
  };

  useEffect(() => {
    localStorage.setItem("errors", everyError.length);
  }, [everyError]);

  useEffect(() => {
    if (context?.storedFormData) {
      setItems(JSON.parse(context?.storedFormData).educations);
    }

    if (context?.storedFormData) {
      context?.setFormData(JSON.parse(context?.storedFormData));
    }

    if (context?.storedErrors2) {
      const clone = [{}];
      for (let i = 0; i < context.storedErrors2 - 1; i++) {
        clone.push({});
      }
      setEveryError(clone);
    }
    context.setcv(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(context?.formData));
  }, [context?.formData]);

  console.log(everyError);

  if (everyError.every((obj: any) => Object.keys(obj).length === 0) && form) {
    navigate("/");
  }
  return (
    <ExperienceWrapper>
      <main>
        <Header />

        {context?.formData.experiences.map((item: any, index: any) => (
          <ExperienceForm
            item={item}
            form={form}
            setForm={setForm}
            items={items}
            setItems={setItems}
            index={index}
            everyError={everyError}
            setEveryError={setEveryError}
            setCheck={setCheck}
          />
        ))}
        <StyledAddButton onClick={addItem} className="add">
          მეტი გამოცდილების დამატება
        </StyledAddButton>

        <div className="buttons">
          <StyledButton
            onClick={() => {
              navigate(-1);
            }}
          >
            ᲣᲙᲐᲜ
          </StyledButton>
          <StyledButton
            type="submit"
            onClick={() => {
              setForm(true);
            }}
          >
            ᲨᲔᲛᲓᲔᲒᲘ
          </StyledButton>
        </div>
      </main>
    </ExperienceWrapper>
  );
}

const ExperienceWrapper = styled.div`
  display: flex;
  main {
    width: 1098px;
    background-color: #f9f9f9;

    .add {
      margin-left: 150px;
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      width: 798px;
      margin: 111px auto;
    }
  }
`;
