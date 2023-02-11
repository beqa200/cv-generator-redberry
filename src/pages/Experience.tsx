import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MyContext } from "../App";
import Header from "../components/Header";
import StyledForm from "../styled-components/components/Form";
import { ShortInput } from "../styled-components/components/Inputs";
import { useForm } from "react-hook-form";
import { error } from "../assets";
import ExperienceForm from "../components/ExperienceForm";
import { StyledAddButton, StyledButton } from "../styled-components";
import { useNavigate } from "react-router-dom";
export default function Experience() {
  const context = useContext(MyContext);

  const [items, setItems] = useState<any>([{position: "", employer: "", startDate: "", endDate: "", description: ""}]);
  const [form, setForm] = useState(false);
  const navigate = useNavigate();
  const addItem = () => {
    const clone = [...items, {position: "", employer: "", startDate: "", endDate: "", description: ""}];
    setItems(clone);
  };
  console.log(items);
  const {
    register,
    trigger,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "all" });
  useEffect(() => {
   
 const storedForm = localStorage.getItem("form");
    if (storedForm) {
      setItems(JSON.parse(storedForm));
    }
    localStorage.removeItem("form")
  }, []);

  useEffect(() => {
    localStorage.setItem("form", JSON.stringify(items));
  }, [items]);

  return (
    <ExperienceWrapper>
      <main>
        <Header />

        {items.map((item: any, index: any) => (
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
          <StyledButton onClick={() => {
            navigate(-1);
          }}>ᲣᲙᲐᲜ</StyledButton>
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
