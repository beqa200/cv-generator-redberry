import styled from "styled-components";

const StyledButton = styled.button`
  margin-top: 160px;

  padding: 14px 35px;
  right: 972px;
  bottom: 65px;
  background: #6b40e3;
  border-radius: 4px;
  letter-spacing: 0.08em;
  color: #ffffff;
  border: none;
`;

const StyledAddButton = styled(StyledButton)`
  background-color: #62a1eb;
  padding: 14px 21px;
`;

export { StyledButton, StyledAddButton };
