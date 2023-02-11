import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MyContext } from "../App";
import {
  LargeInput,
  LongInput,
  ShortInput,
} from "../styled-components/components/Inputs";
import { useForm } from "react-hook-form";
import { done, error } from "../assets";
import StyledForm from "../styled-components/components/Form";
export default function ExperienceForm(props: any) {
  const context = useContext(MyContext);
  const [position, setPosition] = useState(false);
  const [employer, setEmployer] = useState(false);
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const [description, setDescription] = useState(false);
  const storedForm = localStorage.getItem("form");

  const updateFormState = (index: number, event: any, property: string) => {
    const newItems = [...props.items];
    newItems[index][property] = event;
    props.setItems(newItems);
  };

  const {
    register,
    trigger,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<any>({ mode: "all" });

  const triggerErrors = () => {
    setEmployer(true);
    setPosition(true);
    setStartDate(true);
    setEndDate(true);
    setDescription(true);
    trigger(`employer${props.index}`);
    trigger(`position${props.index}`);
    trigger(`startDate${props.index}`);
    trigger(`endDate${props.index}`);
    trigger(`description${props.index}`);
  };

  const clearEveryErrors = () => {
    setEmployer(false);
    setPosition(false);
    setStartDate(false);
    setEndDate(false);
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
  console.log(
    watch(`position${props.index}`) == "" &&
      watch(`employer${props.index}`) == "" &&
      watch(`startDate${props.index}`) == "" &&
      watch(`endDate${props.index}`) == "" &&
      watch(`description${props.index}`) == ""
  );
  useEffect(() => {
    if (props.form == true) {
      if (props.index == 0 && storedForm) {
        if (isAllPropertiesEmpty(JSON.parse(storedForm))) {
          triggerErrors();
        } else {
          if (
            watch(`position${props.index}`) == "" &&
            watch(`employer${props.index}`) == "" &&
            watch(`startDate${props.index}`) == "" &&
            watch(`endDate${props.index}`) == "" &&
            watch(`description${props.index}`) == ""
          ) {
            clearEveryErrors();
          } else {
            triggerErrors();
          }
        }
      } else {
        if (
          watch(`employer${props.index}`) != "" ||
          watch(`position${props.index}`) != "" ||
          watch(`startDate${props.index}`) != "" ||
          watch(`endDate${props.index}`) != "" ||
          watch(`description${props.index}`) == ""
        ) {
          triggerErrors();
        } else {
          clearEveryErrors();
        }
      }
    }
  }, [props.form, watch(`position${props.index}`)]);

  useEffect(() => {
    if (
      watch(`position${props.index}`) == "" &&
      watch(`employer${props.index}`) == "" &&
      watch(`startDate${props.index}`) == "" &&
      watch(`endDate${props.index}`) == "" &&
      watch(`description${props.index}`) == ""
    ) {
      clearEveryErrors();
    }
  }, [
    watch(`position${props.index}`),
    watch(`employer${props.index}`),
    watch(`startDate${props.index}`),
    watch(`endDate${props.index}`),
    watch(`description${props.index}`),
  ]);

  const getLocalStorage = (key: any, value: string | null) => {
    if (value != undefined) {
      setValue(key, value);
    }
  };

  useEffect(() => {
    context?.setPageCount(2);
    const storedEmployer = localStorage.getItem(`employer${props.index}`);
    const storedPosition = localStorage.getItem(`position${props.index}`);
    const storedStartDate = localStorage.getItem(`startDate${props.index}`);
    const storedEndDate = localStorage.getItem(`endDate${props.index}`);
    const storedDescription = localStorage.getItem(`description${props.index}`);
    getLocalStorage(`employer${props.index}`, storedEmployer);
    getLocalStorage(`position${props.index}`, storedPosition);
    getLocalStorage(`startDate${props.index}`, storedStartDate);
    getLocalStorage(`endDate${props.index}`, storedEndDate);
    getLocalStorage(`description${props.index}`, storedDescription);
  }, []);

  const handleChange = (event: any) => {
    setValue(event.target.name, event.target.value);
    localStorage.setItem(event.target.name, event.target.value);
    props.setForm(false);
    trigger(event.target.name);
  };

  return (
    <ExperienceFormWrapper>
      <StyledForm>
        <label className="position">
          თანამდებობა
          <br />
          <LongInput
            className={
              position
                ? errors[`position${props.index}`]
                  ? "error"
                  : "right"
                : ""
            }
            type="text"
            placeholder="დეველოპერი, დიზაინერი, ა.შ."
            {...register(`position${props.index}`, {
              minLength: { value: 2, message: "Please enter valid name" },
              required: { value: true, message: "error" },
            })}
            onChange={(e) => {
              handleChange(e);
              setPosition(true);
              updateFormState(props.index, e.target.value, "position");
            }}
          />
          <p>მინიმუმ 2 სიმბოლო</p>
          {position ? (
            errors[`position${props.index}`] + props.index ? (
              <img src={error} className="error-image" />
            ) : (
              <img src={done} className="done-image" />
            )
          ) : null}
        </label>

        <label className="employer">
          დამსაქმებელი
          <br />
          <LongInput
            className={
              employer
                ? errors[`employer${props.index}`]
                  ? "error"
                  : "right"
                : ""
            }
            type="text"
            placeholder="დამსაქმებელი"
            {...register(`employer${props.index}`, {
              minLength: { value: 2, message: "Please enter valid name" },
              required: { value: true, message: "error" },
            })}
            onChange={(e) => {
              handleChange(e);
              setEmployer(true);
              updateFormState(props.index, e.target.value, "employer");
            }}
          />
          <p>მინიმუმ 2 სიმბოლო</p>
          {employer ? (
            errors[`employer${props.index}`] ? (
              <img src={error} className="error-image" />
            ) : (
              <img src={done} className="done-image" />
            )
          ) : null}
        </label>
        <label className="start-date">
          დაწყების რიცხვი
          <br />
          <ShortInput
            className={
              startDate
                ? errors[`startDate${props.index}`]
                  ? "error"
                  : "right"
                : ""
            }
            type="date"
            {...register(`startDate${props.index}`, {
              required: { value: true, message: "error" },
            })}
            onChange={(e) => {
              handleChange(e);
              setStartDate(true);
              updateFormState(props.index, e.target.value, "startDate");
            }}
          />
        </label>
        <label className="end-date">
          დამთავრების რიცხვი
          <br />
          <ShortInput
            className={
              endDate
                ? errors[`endDate${props.index}`]
                  ? "error"
                  : "right"
                : ""
            }
            type="date"
            placeholder="დეველოპერი, დიზაინერი, ა.შ."
            {...register(`endDate${props.index}`, {
              required: { value: true, message: "error" },
            })}
            onChange={(e) => {
              handleChange(e);
              setEndDate(true);
              updateFormState(props.index, e.target.value, "endDate");
            }}
          />
        </label>
        <label className="description">
          დამთავრების რიცხვი
          <br />
          <LargeInput
            className={
              description
                ? errors[`description${props.index}`]
                  ? "error"
                  : "right"
                : ""
            }
            type="text"
            placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
            {...register(`description${props.index}`, {
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
    .position,
    .employer,
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
    .start-date,
    .end-date {
      width: calc(45% - 7px);

      input {
        padding-right: 15px;
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
      }
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
