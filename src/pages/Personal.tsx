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
import CV from "../components/CV";
import StyledForm from "../styled-components/components/Form";
import { StyledButton } from "../styled-components";

export default function Personal() {
  const context = useContext(MyContext);

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(false);
  const [lastName, setLastName] = useState(false);
  const [mail, setMail] = useState(false);
  const [phone, setPhone] = useState(false);
  const [about, setAbout] = useState(false);

  const {
    register,
    trigger,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "all" });

  const getLocalStorage = (
    key: "firstname" | "lastname" | "image" | "about" | "email" | "phone",
    value: string | null
  ) => {
    if (value != undefined) {
      setValue(key, value);
    }
  };

  useEffect(() => {
    context?.setPageCount(1);

    const storedFirstname = localStorage.getItem("firstname");
    const storedLastname = localStorage.getItem("lastname");
    const storedImage = localStorage.getItem("image");
    const storedAbout = localStorage.getItem("about");
    const storedMail = localStorage.getItem("email");
    const storedPhone = localStorage.getItem("phone");

    getLocalStorage("firstname", storedFirstname);
    getLocalStorage("lastname", storedLastname);
    getLocalStorage("image", storedImage);
    getLocalStorage("about", storedAbout);
    getLocalStorage("email", storedMail);
    getLocalStorage("phone", storedPhone);
  }, []);

  const handleChange = (event: any) => {
    setValue(event.target.name, event.target.value);
    localStorage.setItem(event.target.name, event.target.value);

    trigger(event.target.name);
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files![0];
    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("image", reader.result as string);
      setValue("image", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: Inputs) => {
    console.log(data);
    if (Object.keys(watch("image")).length != 0) {
      navigate("/experience");
      context?.setPageCount(2);
    }
  };

  return (
    <PersonalWrapper>
      <main>
        <Header />
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <label className="firstname">
            სახელი
            <br />
            <ShortInput
              className={
                firstName ? (errors.firstname ? "error" : "right") : ""
              }
              type="text"
              placeholder="ანზორ"
              {...register("firstname", {
                minLength: { value: 2, message: "Please enter valid name" },
                required: { value: true, message: "error" },
                pattern: { value: /^[ა-ჰ]+$/, message: "error" },
              })}
              onChange={(e) => {
                handleChange(e);
                setFirstName(true);
              }}
            />
            <p>მინიმუმ 2 ასო, ქართული ასოები</p>
            {firstName ? (
              errors.firstname ? (
                <img src={error} className="error-image" />
              ) : (
                <img src={done} className="done-image" />
              )
            ) : null}
          </label>
          <label className="lastname">
            გვარი
            <br />
            <ShortInput
              className={lastName ? (errors.lastname ? "error" : "right") : ""}
              type="text"
              placeholder="მუმლაძე"
              {...register("lastname", {
                minLength: { value: 2, message: "Please enter valid name" },
                required: { value: true, message: "error" },
                pattern: { value: /^[ა-ჰ]+$/, message: "error" },
              })}
              onChange={(e) => {
                handleChange(e);
                setLastName(true);
              }}
            />
            <p>მინიმუმ 2 ასო, ქართული ასოები</p>
            {lastName ? (
              errors.lastname ? (
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
          <label className="about">
            ჩემ შესახებ (არასავალდებულო)
            <br />
            <LargeInput
              className={about ? "right" : ""}
              type="text"
              placeholder="ზოგადი ინფო შენ შესახებ"
              {...register("about")}
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

          <label className="phone">
            მობილურის ნომერი
            <CustomInputMask
              className={phone ? (errors.phone ? "error" : "right") : ""}
              placeholder="+995 551 12 34 56"
              mask="+999 999 99 99 99"
              maskChar={null}
              {...register("phone", {
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
            {phone ? (
              errors.phone ? (
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
              setFirstName(true);
              setLastName(true);
              setAbout(true);
              setMail(true);
              setPhone(true);
            }}
          >
            ᲨᲔᲛᲓᲔᲒᲘ
          </StyledButton>
        </StyledForm>
      </main>
      <CV
        firstname={watch("firstname")}
        lastname={watch("lastname")}
        image={watch("image")}
        about={watch("about")}
        email={watch("email")}
        phone={watch("phone")}
      />
    </PersonalWrapper>
  );
}

export const PersonalWrapper = styled.div`
  display: flex;
  main {
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
      .firstname,
      .lastname {
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
      .about {
        width: 100%;
      }

      .email,
      .phone {
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
