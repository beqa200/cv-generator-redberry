import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: "Helvetica Neue";
  src: url("../assets/fonts/HelveticaNeue.ttc") format("TTC");
}

    * {
        font-family: "Helvetica Neue";
        margin: 0px;
        padding: 0px;
    }

     body {
        width: 100vw;
        overflow-x: hidden;
     }

     a{
        text-decoration: none;
     }

     button {
        cursor: pointer;
     }
`;

export { GlobalStyles };
