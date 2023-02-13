import Home from "./pages/Home";
import { GlobalStyles } from "./styled-components";
import { createContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Personal from "./pages/Personal";
import Experience from "./pages/Experience";
import CV from "./components/CV";
import styled from "styled-components";
import Education from "./pages/Education";
import Resume from "./pages/Resume";

export const MyContext = createContext<ContextProps | any>(null);
function App() {
  const [pageCount, setPageCount] = useState<number>(1);
  const [cv, setcv] = useState(false);
  const storedFormData = localStorage.getItem("formData");
  const storedErrors = localStorage.getItem("errors");
  const storedErrors2 = localStorage.getItem("errors2");
  
  const [formData, setFormData] = useState<FormData | any>({
    name: "",
    surname: "",
    email: "",
    phone_number: "",
    experiences: [
      {
        position: "",
        employer: "",
        start_date: "",
        due_date: "",
        description: "",
      },
    ],
    educations: [
      {
        institute: "",
        degree_id: "",
        due_date: "",
        description: "",
      },
    ],
    image: "",
    about_me: "",
  });
  useEffect(() => {
    if (storedFormData != undefined) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);
  console.log(formData);

  return (
    <MyContext.Provider
      value={{
        pageCount,
        setPageCount,
        storedFormData,
        formData,
        setFormData,
        storedErrors,
        storedErrors2,
        setcv
      }}
    >
      <GlobalStyles />
      <MainWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/education" element={<Education />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </BrowserRouter>
        {cv && <CV />}
      </MainWrapper>
    </MyContext.Provider>
  );
}

const MainWrapper = styled.div`
  display: flex;
`;

export default App;
