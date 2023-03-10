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
import { useNavigate } from "react-router-dom";
export default function ExperienceForm(props: any) {
  const context = useContext(MyContext);
  const [position, setPosition] = useState(false);
  const [employer, setEmployer] = useState(false);
  const [start_date, setStart_date] = useState(false);
  const [due_date, setDue_Date] = useState(false);
  const [description, setDescription] = useState(false);
  const navigate = useNavigate();
  const updateFormState = (index: number, event: any, property: string) => {
    const newItems = [...context?.formData.experiences];
    newItems[index][property] = event;
    context?.setFormData({ ...context?.formData, experiences: newItems });
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
    setEmployer(true);
    setPosition(true);
    setStart_date(true);
    setDue_Date(true);
    setDescription(true);
    trigger(`employer${props.index}`);
    trigger(`position${props.index}`);
    trigger(`start_date${props.index}`);
    trigger(`due_date${props.index}`);
    trigger(`description${props.index}`);

    if (errors) {
      const clone = props.everyError;
      clone[props.index] = errors;
      props.setEveryError(clone);
    }
  };

  const clearEveryErrors = () => {
    setEmployer(false);
    setPosition(false);
    setStart_date(false);
    setDue_Date(false);
    setDescription(false);
    clearErrors();
    const clone = props.everyError;
    clone[props.index] = {};
    props.setEveryError(clone);
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
      watch(`position${props.index}`) == "" &&
      watch(`employer${props.index}`) == "" &&
      watch(`start_date${props.index}`) == "" &&
      watch(`due_date${props.index}`) == "" &&
      watch(`description${props.index}`) == ""
    ) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (props.form == true) {
      if (props.index == 0) {
        if (errors) {
          const clone = props.everyError;
          clone[props.index] = errors;
          props.setEveryError(clone);
        }
        if (isAllPropertiesEmpty(context?.formData.experiences)) {
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

    if (
      props.everyError.every((obj: any) => Object.keys(obj).length === 0) &&
      props.form
    ) {
      navigate("/education");
    }
  }, [props.form]);

  useEffect(() => {
    if (
      props.everyError.every((obj: any) => Object.keys(obj).length === 0) &&
      props.form
    ) {
      context.setPageCount(3);
    }
  }, [props.everyError, errors]);
  useEffect(() => {
    if (checkEverythingEmpty()) {
      clearEveryErrors();
    }
    if (errors) {
      const clone = props.everyError;
      clone[props.index] = errors;
      props.setEveryError(clone);
    }
  }, [
    watch(`position${props.index}`),
    watch(`employer${props.index}`),
    watch(`start_date${props.index}`),
    watch(`due_date${props.index}`),
    watch(`description${props.index}`),
  ]);

  const getLocalStorage = (key: any, value: string | null) => {
    if (value != undefined) {
      setValue(key, value);
    }
  };

  useEffect(() => {
    triggerErrors();
    localStorage.setItem("formData", JSON.stringify(context?.formData));
    if (checkEverythingEmpty()) {
      clearEveryErrors();
    }
  }, [context.formData]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(context?.formData));
    context?.setPageCount(2);
    const storedEmployer = localStorage.getItem(`employer${props.index}`);
    const storedPosition = localStorage.getItem(`position${props.index}`);
    const storedStartDate = localStorage.getItem(`start_date${props.index}`);
    const storedEndDate = localStorage.getItem(`due_date${props.index}`);
    const storedDescription = localStorage.getItem(`description${props.index}`);
    getLocalStorage(`employer${props.index}`, storedEmployer);
    getLocalStorage(`position${props.index}`, storedPosition);
    getLocalStorage(`start_date${props.index}`, storedStartDate);
    getLocalStorage(`due_date${props.index}`, storedEndDate);
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
          ?????????????????????????????????
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
            placeholder="??????????????????????????????, ???????????????????????????, ???.???."
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
          <p>????????????????????? 2 ?????????????????????</p>
          {position ? (
            errors[`position${props.index}`] + props.index ? (
              <img src={error} className="error-image" />
            ) : (
              <img src={done} className="done-image" />
            )
          ) : null}
        </label>

        <label className="employer">
          ????????????????????????????????????
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
            placeholder="????????????????????????????????????"
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
          <p>????????????????????? 2 ?????????????????????</p>
          {employer ? (
            errors[`employer${props.index}`] ? (
              <img src={error} className="error-image" />
            ) : (
              <img src={done} className="done-image" />
            )
          ) : null}
        </label>
        <label className="start-date">
          ???????????????????????? ??????????????????
          <br />
          <ShortInput
            className={
              start_date
                ? errors[`start_date${props.index}`]
                  ? "error"
                  : "right"
                : ""
            }
            type="date"
            {...register(`start_date${props.index}`, {
              required: { value: true, message: "error" },
            })}
            onChange={(e) => {
              handleChange(e);
              setStart_date(true);
              updateFormState(props.index, e.target.value, "start_date");
            }}
          />
        </label>
        <label className="end-date">
          ????????????????????????????????? ??????????????????
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
            placeholder="??????????????????????????????, ???????????????????????????, ???.???."
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
          ??????????????????
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
            placeholder="?????????????????????????????? ??????????????????"
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
