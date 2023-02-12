import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MyContext } from "../App";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import ExperienceForm from "../components/ExperienceForm";
import { StyledAddButton, StyledButton } from "../styled-components";
import { useNavigate } from "react-router-dom";
export default function Experience() {
  const context = useContext(MyContext);

  const [items, setItems] = useState<any>([
    { position: "", employer: "", start_date: "", due_date: "", description: "" },
  ]);

  const [form, setForm] = useState(false);
  const navigate = useNavigate();

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
    context?.setFormData({ ...context?.formData, experiences: clone });
  };

  useEffect(() => {
    if (context?.storedFormData) {
      setItems(JSON.parse(context?.storedFormData).experiences);
    }

    if (context?.storedFormData) {
      context?.setFormData(JSON.parse(context?.storedFormData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(context?.formData));
  }, [context?.formData]);

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
