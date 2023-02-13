import React, { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { MyContext } from "../App";
import Header from "../components/Header";
import { StyledAddButton, StyledButton } from "../styled-components";
import { useNavigate } from "react-router-dom";
import EducationForm from "../components/EducationForm";
import axios from "axios";
export default function Experience() {
  const context = useContext(MyContext);
  const [everyError, setEveryError] = useState<any>([{}]);
  const [form, setForm] = useState(false);
  const navigate = useNavigate();
  const [items, setItems] = useState<any>([
    {
      institute: "",
      degree_id: "",
      due_date: "",
      description: "",
    },
  ]);

  useEffect(() => {
    localStorage.setItem("errors2", everyError.length);
  }, [everyError]);

  useEffect(() => {
    if (context?.storedFormData) {
      setItems(JSON.parse(context?.storedFormData).educations);
    }

    if (context?.storedFormData) {
      context?.setFormData(JSON.parse(context?.storedFormData));
    }

    if (context?.storedErrors2) {
      const clone = [{}];
      for (let i = 0; i < context.storedErrors2 - 1; i++) {
        clone.push({});
      }
      setEveryError(clone);
    }
    context.setPageCount(3);
    context.setcv(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(context?.formData));
  }, [context?.formData]);

  const addItem = () => {
    const clone = [
      ...items,
      {
        institute: "",
        degree_id: "",
        due_date: "",
        description: "",
      },
    ];

    context?.setFormData({ ...context?.formData, educations: clone });
    const clone2 = [...everyError, {}];
    setEveryError(clone2);
  };

  function dataURLtoFile(dataurl: any, filename: any) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const submit = () => {
    let file = dataURLtoFile(context.formData.image, "image-name.png");
    console.log(file);
    let phoneNumber = context?.formData.phone_number.replace(/ /g, "");

    console.log(phoneNumber);
    const formData = new FormData();
    formData.append("name", context.formData.name);
    formData.append("surname", context.formData.surname);
    formData.append("email", context.formData.email);
    formData.append("phone_number", phoneNumber);
    context.formData.experiences.forEach((experience: any, index: number) => {
      formData.append(`experiences[${index}][position]`, experience.position);
      formData.append(`experiences[${index}][employer]`, experience.employer);
      formData.append(
        `experiences[${index}][start_date]`,
        experience.start_date
      );
      formData.append(`experiences[${index}][due_date]`, experience.due_date);
      formData.append(
        `experiences[${index}][description]`,
        experience.description
      );
    });
    context.formData.educations.forEach((education: any, index: number) => {
      formData.append(`educations[${index}][institute]`, education.institute);
      formData.append(`educations[${index}][degree_id]`, education.degree_id);
      formData.append(`educations[${index}][due_date]`, education.due_date);
      formData.append(
        `educations[${index}][description]`,
        education.description
      );
    });
    // formData.append("experiences",  JSON.stringify(context.formData.experiences));
    // formData.append("educations", JSON.stringify(context.formData.educations));
    formData.append("image", file);
    formData.append("about_me", context.formData.about_me);
    console.log(formData.getAll("experiences[]"));
    axios
      .post("https://resume.redberryinternship.ge/api/cvs", formData)
      .then(() => {
        navigate("/resume");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ExperienceWrapper>
      <main>
        <Header />

        {context?.formData.educations.map((item: any, index: any) => (
          <EducationForm
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
          სხვა სასწავლებლის დამატება
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
            type="submit"
            onClick={() => {
              setForm(true);
              submit();
            }}
          >
            ᲓᲐᲡᲠᲣᲚᲔᲑᲐ
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
