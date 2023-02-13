import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MyContext } from "../App";
import {
  LargeInput,
  LongInput,
  ShortInput,
  ShortInputSelect,
} from "../styled-components/components/Inputs";
import { useForm } from "react-hook-form";
import { done, error } from "../assets";
import StyledForm from "../styled-components/components/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function ExperienceForm(props: any) {
  const context = useContext(MyContext);
  const [institute, setInstitute] = useState(false);
  const [degree_id, setDegree_id] = useState(false);
  const [due_date, setDue_Date] = useState(false);
  const [description, setDescription] = useState(false);
  const [options, setOptions] = useState([]);

  const updateFormState = (index: number, event: any, property: string) => {
    const newItems = [...context?.formData.educations];
    newItems[index][property] = event;
    context?.setFormData({ ...context?.formData, educations: newItems });
    localStorage.setItem("formData", JSON.stringify(context?.formData));
  };

  const {
    register,
    trigger,
    setValue,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm<any>({ mode: "all" });

  const triggerErrors = () => {
    setDegree_id(true);
    setInstitute(true);
    setDue_Date(true);
    setDescription(true);
    trigger(`degree_id${props.index}`);
    trigger(`institute${props.index}`);
    trigger(`due_date${props.index}`);
    trigger(`description2${props.index}`);
  };

  const clearEveryErrors = () => {
    setDegree_id(false);
    setInstitute(false);
    setDue_Date(false);
    setDescription(false);
    clearErrors();
  };

  function isAllPropertiesEmpty(arr: any) {
    for (let i = 0; i < arr.length; i++) {
      for (let property in arr[i]) {
        if (arr[i][property] !== "") {
          return false;
        }
      }
    }
    return true;
  }

  const checkEverythingEmpty = () => {
    if (
      watch(`institute${props.index}`) == "" &&
      watch(`degree_id${props.index}`) == "" &&
      watch(`due_date${props.index}`) == "" &&
      watch(`description2${props.index}`) == ""
    ) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (props.form == true) {
      if (props.index == 0) {
        if (isAllPropertiesEmpty(context?.formData.educations)) {
          triggerErrors();
        } else {
          if (checkEverythingEmpty()) {
            clearEveryErrors();
          } else {
            triggerErrors();
          }
        }
      } else {
        if (checkEverythingEmpty()) {
          clearEveryErrors();
        } else {
          triggerErrors();
        }
      }
    }
  }, [props.form]);

  useEffect(() => {
    if (checkEverythingEmpty()) {
      clearEveryErrors();
    }
  }, [
    watch(`institute${props.index}`),
    watch(`degree_id${props.index}`),
    watch(`due_date${props.index}`),
    watch(`description2${props.index}`),
  ]);

  const getLocalStorage = (key: any, value: string | null) => {
    if (value != undefined) {
      setValue(key, value);
    }
  };

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(context?.formData));
    async function fetchData() {
      const result = await axios.get(
        "https://resume.redberryinternship.ge/api/degrees"
      );
      setOptions(result.data);
    }
    fetchData();
    context?.setPageCount(3);
    const storedDegree = localStorage.getItem(`degree_id${props.index}`);
    const storedInstitute = localStorage.getItem(`institute${props.index}`);
    const storedEndDate = localStorage.getItem(`due_date${props.index}`);
    const storedDescription = localStorage.getItem(
      `description2${props.index}`
    );
    getLocalStorage(`degree_id${props.index}`, storedDegree);
    getLocalStorage(`institute${props.index}`, storedInstitute);
    getLocalStorage(`due_date${props.index}`, storedEndDate);
    getLocalStorage(`description2${props.index}`, storedDescription);
  }, []);

  if (errors) {
    const clone = props.everyError;
    clone[props.index] = errors;
    props.setEveryError(clone);
  }

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(context?.formData));
  }, [context?.formData]);

  const handleChange = (event: any) => {
    setValue(event.target.name, event.target.value);
    localStorage.setItem(event.target.name, event.target.value);
    props.setForm(false);
    trigger(event.target.name);
  };

  return (
    <ExperienceFormWrapper>
      <StyledForm>
        <label className="institute">
          სასწავლებელი
          <br />
          <LongInput
            className={
              institute
                ? errors[`institute${props.index}`]
                  ? "error"
                  : "right"
                : ""
            }
            type="text"
            placeholder="სასწავლებელი"
            {...register(`institute${props.index}`, {
              minLength: { value: 2, message: "Please enter valid name" },
              required: { value: true, message: "error" },
            })}
            onChange={(e) => {
              handleChange(e);
              setInstitute(true);
              updateFormState(props.index, e.target.value, "institute");
            }}
          />
          <p>მინიმუმ 2 სიმბოლო</p>
          {institute ? (
            errors[`institute${props.index}`] + props.index ? (
              <img src={error} className="error-image" />
            ) : (
              <img src={done} className="done-image" />
            )
          ) : null}
        </label>

        <label className="degree_id">
          ხარისხი
          <br />
          <ShortInputSelect
            className={
              degree_id
                ? errors[`degree_id${props.index}`]
                  ? "error"
                  : "right"
                : ""
            }
            value={watch(`degree_id${props.index}`)}
            placeholder="აირჩიეთ ხარისხი"
            {...register(`degree_id${props.index}`, {
              required: { value: true, message: "error" },
            })}
            onChange={(e) => {
              handleChange(e);
              setDegree_id(true);
              localStorage.setItem("degree", watch(`degree_id${props.index}`));
              updateFormState(props.index, e.target.value, "degree_id");
            }}
          >
            <option value={""}>აირჩიეთ ხარისხი</option>
            {options.map((item: any) => (
              <option value={item.id}>{item.title}</option>
            ))}
          </ShortInputSelect>
          <p>მინიმუმ 2 სიმბოლო</p>
        </label>

        <label className="end-date">
          დამთავრების რიცხვი
          <br />
          <ShortInput
            className={
              due_date
                ? errors[`due_date${props.index}`]
                  ? "error"
                  : "right"
                : ""
            }
            type="date"
            placeholder="დეველოპერი, დიზაინერი, ა.შ."
            {...register(`due_date${props.index}`, {
              required: { value: true, message: "error" },
            })}
            onChange={(e) => {
              handleChange(e);
              setDue_Date(true);
              updateFormState(props.index, e.target.value, "due_date");
            }}
          />
        </label>
        <label className="description">
          აღწერა
          <br />
          <LargeInput
            className={
              description
                ? errors[`description2${props.index}`]
                  ? "error"
                  : "right"
                : ""
            }
            type="text"
            placeholder="განათლების აღწერა"
            {...register(`description2${props.index}`, {
              required: { value: true, message: "error" },
            })}
            onChange={(e) => {
              handleChange(e);
              setDescription(true);
              updateFormState(props.index, e.target.value, "description");
            }}
          />
        </label>
      </StyledForm>
    </ExperienceFormWrapper>
  );
}

const ExperienceFormWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #c1c1c1;
  width: 798px;
  margin: auto;
  padding-bottom: 58px;
  form {
    option {
      width: 100px;
    }
    label {
      margin-top: 31px;
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      position: relative;
      p {
        font-weight: 300;
        font-size: 14px;
        line-height: 21px;
        color: #2e2e2e;
      }

      img {
        position: absolute;
        top: calc(50% - 8.25px);
      }

      .error-image {
        right: -35.75px;
      }

      .done-image {
        right: 13.5px;
      }
    }
    .institute,
    .degree_id,
    .description {
      width: 100%;
    }

    .wrapper {
      display: flex;
      align-items: center;
      gap: 19px;
      margin: 54px 0px;

      p {
        height: 22px;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        color: #1a1a1a;
      }

      .image {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 107px;
        color: #ffffff;
        background: #0e80bf;
        border-radius: 4px;
        font-size: 14px;
      }
    }

    .end-date,
    .degree_id {
      width: calc(45% - 7px);

      input {
        padding-right: 15px;
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
      }
    }
  }
  .degree_id {
    select {
      padding: 0px 15px;
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;
    }
  }

  .error {
    border: 1px solid red;
    outline: none;
  }

  .right {
    border: 1px solid green;
    outline: none;
  }
`;
