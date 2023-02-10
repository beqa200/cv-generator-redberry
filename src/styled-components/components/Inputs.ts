import styled from "styled-components";
import InputMask from "react-input-mask";

const LongInput = styled.input`
  height: 48px;
  padding-left: 16px;
  border: 1px solid #bcbcbc;
  border-radius: 4px;
  width: calc(100% - 16px);
  margin: 8px 0px;

  
`;

const ShortInput = styled(LongInput)``;

const LargeInput = styled(LongInput)`
  padding-bottom: 69px;
`;

const CustomInputMask = styled(InputMask)`
  height: 48px;
  padding-left: 16px;
  border: 1px solid #bcbcbc;
  border-radius: 4px;
  width: calc(100% - 16px);
  margin: 8px 0px;
`;

export { LongInput, ShortInput, LargeInput, CustomInputMask };
