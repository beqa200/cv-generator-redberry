import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MyContext } from "../App";
import Header from "../components/Header";
import StyledForm from "../styled-components/components/Form";
import { ShortInput } from "../styled-components/components/Inputs";
import { useForm } from "react-hook-form";
import { error } from "../assets";
import ExperienceForm from "../components/ExperienceForm";
export default function Experience() {
  const context = useContext(MyContext);

  const [items, setItems] = useState<any>([{ position: "", employer: "" }]);
  const [form, setForm] = useState(false);
  const addItem = () => {
    const clone = [...items, { position: "", employer: "" }];
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
    const storedForm =  localStorage.getItem("form");
    if (storedForm) {
      setItems(JSON.parse(storedForm));
    }

    // localStorage.removeItem("form")
  }, []);

  useEffect(() => {
    localStorage.setItem("form", JSON.stringify(items));

  }, [items])

  return (
    <ExperienceWrapper>
      <main>
        <Header />

        {items.map((item: any, index: any) => (
          <ExperienceForm item={item} form={form} setForm={setForm} index={index} />
        ))}
        <button onClick={addItem}>Add</button>
        <button
          onClick={() => {
            setForm(true);
          }}
        >
          NExt
        </button>
      </main>
    </ExperienceWrapper>
  );
}

const ExperienceWrapper = styled.div`
  display: flex;
  main {
    width: 1098px;
    background-color: #f9f9f9;

    button {
      width: 40px;
      height: 40px;
    }
  }
`;
