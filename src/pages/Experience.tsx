import React, { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { MyContext } from "../App";
import Header from "../components/Header";
import ExperienceForm from "../components/ExperienceForm";
import { StyledAddButton, StyledButton } from "../styled-components";
import { useNavigate } from "react-router-dom";
export default function Experience() {
  const context = useContext(MyContext);
  const [everyError, setEveryError] = useState<any>([{}]);
  const [form, setForm] = useState(false);
  const navigate = useNavigate();

  const [items, setItems] = useState<any>([
    {
      position: "",
      employer: "",
      start_date: "",
      due_date: "",
      description: "",
    },
  ]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(context?.formData))
    if (context?.storedFormData) {
      setItems(JSON.parse(context?.storedFormData).experiences);
    }

    if (context?.storedFormData) {
      context?.setFormData(JSON.parse(context?.storedFormData));
    }

    if (context?.storedErrors) {
      const clone = [{}];
      for (let i = 0; i < context.storedErrors - 1; i++) {
        clone.push({});
      }
      setEveryError(clone);
    }
    context.setPageCount(2);
    context.setcv(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("errors", everyError.length);
  }, [everyError]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(context?.formData));
  }, [context?.formData]);

  const addItem = () => {
    const clone = [
      ...items,
      {
        position: "",
        employer: "",
        start_date: "",
        due_date: "",
        description: "",
      },
    ];
    setItems(clone);
    context?.setFormData({ ...context?.formData, experiences: clone });
    const clone2 = [...everyError, {}];
    setEveryError(clone2);
  };

 

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
          />
        ))}
        <StyledAddButton onClick={addItem} className="add">
          მეტი გამოცდილების დამატება
        </StyledAddButton>

        <div className="buttons">
          <StyledButton
            onClick={() => {
              navigate("/personal");
              // localStorage.setItem("formData", JSON.stringify(context?.formData));
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
