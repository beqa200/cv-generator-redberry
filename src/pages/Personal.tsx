import React, { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { MyContext } from "../App";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import {
  CustomInputMask,
  LargeInput,
  LongInput,
  ShortInput,
} from "../styled-components/components/Inputs";
import { done, error } from "../assets";
import { useNavigate } from "react-router-dom";
import StyledForm from "../styled-components/components/Form";
import { StyledButton } from "../styled-components";

export default function Personal() {
  const context = useContext(MyContext);

  const navigate = useNavigate();

  const [name, setName] = useState(false);
  const [surname, setSurname] = useState(false);
  const [mail, setMail] = useState(false);
  const [phone_number, setPhone] = useState(false);
  const [about_me, setAbout] = useState(false);

  const {
    register,
    trigger,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "all" });

  const getLocalStorage = (
    key: "name" | "surname" | "image" | "about_me" | "email" | "phone_number",
    value: string | null
  ) => {
    if (value != undefined) {
      setValue(key, value);
    }
  };

  useEffect(() => {
    context?.setPageCount(1);
    context.setcv(true);
    if (context?.storedFormData != undefined) {
      getLocalStorage("name", JSON.parse(context?.storedFormData).name);
      getLocalStorage("surname", JSON.parse(context?.storedFormData).surname);
      getLocalStorage("image", JSON.parse(context?.storedFormData).image);
      getLocalStorage("about_me", JSON.parse(context?.storedFormData).about_me);
      getLocalStorage("email", JSON.parse(context?.storedFormData).email);
      getLocalStorage(
        "phone_number",
        JSON.parse(context?.storedFormData).phone_number
      );
      context?.setFormData(JSON.parse(context?.storedFormData));
    }

   
  }, []);

  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(context?.formData));
  }, [context?.formData]);

  const handleChange = (event: any) => {
    setValue(event.target.name, event.target.value);
    localStorage.setItem(event.target.name, event.target.value);
    context?.setFormData({
      ...context?.formData,
      [event.target.name]: event.target.value,
    });

    trigger(event.target.name);
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files![0];
    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("image", reader.result as string);
      setValue("image", reader.result as string);
      context?.setFormData({
        ...context?.formData,
        image: reader.result as string,
        image2: file,
      });
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: Inputs) => {
    if (Object.keys(watch("image")).length != 0) {
      navigate("/experience");
      context?.setPageCount(2);
    }
  };

  return (
    <PersonalWrapper>
      <Header />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <label className="name">
          სახელი
          <br />
          <ShortInput
            className={name ? (errors.name ? "error" : "right") : ""}
            type="text"
            placeholder="ანზორ"
            {...register("name", {
              minLength: { value: 2, message: "Please enter valid name" },
              required: { value: true, message: "error" },
              pattern: { value: /^[ა-ჰ]+$/, message: "error" },
            })}
            onChange={(e) => {
              handleChange(e);
              setName(true);
            }}
          />
          <p>მინიმუმ 2 ასო, ქართული ასოები</p>
          {name ? (
            errors.name ? (
              <img src={error} className="error-image" />
            ) : (
              <img src={done} className="done-image" />
            )
          ) : null}
        </label>
        <label className="surname">
          გვარი
          <br />
          <ShortInput
            className={surname ? (errors.surname ? "error" : "right") : ""}
            type="text"
            placeholder="მუმლაძე"
            {...register("surname", {
              minLength: { value: 2, message: "Please enter valid name" },
              required: { value: true, message: "error" },
              pattern: { value: /^[ა-ჰ]+$/, message: "error" },
            })}
            onChange={(e) => {
              handleChange(e);
              setSurname(true);
            }}
          />
          <p>მინიმუმ 2 ასო, ქართული ასოები</p>
          {surname ? (
            errors.surname ? (
              <img src={error} className="error-image" />
            ) : (
              <img src={done} className="done-image" />
            )
          ) : null}
        </label>
        <div className="wrapper">
          <p>პირადი ფოტოს ატვირთვა</p>
          <label className="image">
            ატვირთვა
            <input
              type="file"
              {...register("image")}
              onChange={(e) => {
                handleImageChange(e);
              }}
              style={{ display: "none" }}
            />
          </label>

          <p style={{ color: "red" }}>{errors.image?.message}</p>
        </div>
        <label className="about_me">
          ჩემ შესახებ (არასავალდებულო)
          <br />
          <LargeInput
            className={about_me ? "right" : ""}
            type="text"
            placeholder="ზოგადი ინფო შენ შესახებ"
            {...register("about_me")}
            onChange={(e) => {
              handleChange(e);
              setAbout(true);
            }}
          />
        </label>

        <label className="email">
          ელ.ფოსტა
          <LongInput
            className={mail ? (errors.email ? "error" : "right") : ""}
            type="text"
            placeholder="anzorr666@redberry.ge"
            {...register("email", {
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@redberry.ge$/,
                message: "Please enter valid email address",
              },
              required: { value: true, message: "error" },
            })}
            onChange={(e) => {
              handleChange(e);
              setMail(true);
            }}
          />
          {mail ? (
            errors.email ? (
              <img src={error} className="error-image" />
            ) : (
              <img src={done} className="done-image" />
            )
          ) : null}
          <p>უნდა მთავრდებოდეს @redberry.ge-ით</p>
        </label>

        <label className="phone_number">
          მობილურის ნომერი
          <CustomInputMask
            className={
              phone_number ? (errors.phone_number ? "error" : "right") : ""
            }
            placeholder="+995 551 12 34 56"
            mask="+999 999 99 99 99"
            maskChar={null}
            {...register("phone_number", {
              required: { value: true, message: "error" },
              minLength: { value: 17, message: "invalid" },
              pattern: {
                value: /^\+995\s\d{3}\s\d{2}\s\d{2}\s\d{2}$/,
                message: "invalid",
              },
            })}
            onChange={(e) => {
              handleChange(e);
              setPhone(true);
            }}
          />
          {phone_number ? (
            errors.phone_number ? (
              <img src={error} className="error-image" />
            ) : (
              <img src={done} className="done-image" />
            )
          ) : null}
          <p>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</p>
        </label>

        <StyledButton
          type="submit"
          onClick={(e) => {
            setName(true);
            setSurname(true);
            setAbout(true);
            setMail(true);
            setPhone(true);
          }}
        >
          ᲨᲔᲛᲓᲔᲒᲘ
        </StyledButton>
      </StyledForm>
    </PersonalWrapper>
  );
}

export const PersonalWrapper = styled.div`
  width: 1098px;
  background-color: #f9f9f9;

  form {
    label {
      font-weight: 700;
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
    .name,
    .surname {
      width: 45%;
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
    .about_me {
      width: 100%;
    }

    .email,
    .phone_number {
      width: 100%;
      margin-top: 33px;

      img {
        top: 44px;
      }
    }

    button {
      margin-left: auto;
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
