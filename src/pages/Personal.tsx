import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { MyContext } from "../App";
import Header from "../components/Header";

export default function Personal() {
  const context = useContext(MyContext);
  useEffect(() => {
    context?.setPageCount(1);
  }, []);

  return (
      <PersonalWrapper>
        <div className="form">
          <Header />
        </div>
      </PersonalWrapper>
  );
}

const PersonalWrapper = styled.div`
  .form {
    width: 1098px;
    background-color: #f9f9f9;
    height: 100vh;
  }
`;
