import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MyContext } from "../App";
import { LongInput, ShortInput } from "../styled-components/components/Inputs";
import { useForm } from "react-hook-form";
import { done, error } from "../assets";
export default function ExperienceForm(props: any) {
  const context = useContext(MyContext);
  const [position, setPosition] = useState(false);
  const [employer, setEmployer] = useState(false);

  const storedForm = localStorage.getItem("form");

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
    trigger(`employer${props.index}`);
    trigger(`position${props.index}`);
  };

  const clearEveryErrors = () => {
    setEmployer(false);
    setPosition(false);
    clearErrors();
  };

  useEffect(() => {
    if (props.form == true) {
      if (props.index == 0 && storedForm) {
        triggerErrors();
      } else {
        if (
          watch(`employer${props.index}`) != "" ||
          watch(`position${props.index}`) != ""
        ) {
          triggerErrors();
        } else {
          clearEveryErrors();
        }
      }
    }
  }, [props.form]);

  useEffect(() => {
    if (
      props.index != 0 &&
      watch(`position${props.index}`) == "" &&
      watch(`employer${props.index}`) == ""
    ) {
      clearEveryErrors();
    }
  }, [watch(`position${props.index}`), watch(`employer${props.index}`)]);

  const getLocalStorage = (key: any, value: string | null) => {
    if (value != undefined) {
      setValue(key, value);
    }
  };

  useEffect(() => {
    context?.setPageCount(2);
    const storedEmployer = localStorage.getItem(`employer${props.index}`);
    const storedPosition = localStorage.getItem(`position${props.index}`);
    getLocalStorage(`employer${props.index}`, storedEmployer);
    getLocalStorage(`position${props.index}`, storedPosition);
  }, []);

  const handleChange = (event: any) => {
    setValue(event.target.name, event.target.value);
    localStorage.setItem(event.target.name, event.target.value);
    props.setForm(false);
    trigger(event.target.name);
  };

  return (
    <ExperienceFormWrapper>
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
            props.item.position = e.target.value;
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
        დამსქმებელი
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
          placeholder="დეველოპერი, დიზაინერი, ა.შ."
          {...register(`employer${props.index}`, {
            minLength: { value: 2, message: "Please enter valid name" },
            required: { value: true, message: "error" },
          })}
          onChange={(e) => {
            handleChange(e);
            setEmployer(true);
            props.item.employer = e.target.value;
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
    </ExperienceFormWrapper>
  );
}

const ExperienceFormWrapper = styled.div`
  display: flex;

  form {
    .position,
    .employer {
      width: 100%;
    }
  }
`;
