import styled from "styled-components";

export const Container = styled.div`
  position: absolute;

  height: 100vh;
  width: 100vw;

  top: 0;
  left: 0;

  background-color: rgba(75, 168, 230, 0.25);
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  flex-direction: column;

  margin: 5% auto;

  background-color: #000000;
  border-radius: 16px;

  padding: 0 6%;

  height: 70%;
  width: 40%;

  @media (max-width: 1000px) {
    width: 55%;
  }
  @media (max-width: 768px) {
    width: 65%;
    margin: 10% auto;
  }
  @media (max-width: 600px) {
    height: 60%;
    width: 75%;
    margin: 20% auto;
  }
  @media (max-width: 600px) {
    height: 55%;
    width: 80%;
    margin: 30% auto;
  }
`;

export const TwitterLogo = styled.img`
  background-color: transparent;
  height: 12%;
  width: 17%;

  padding: 4%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  align-items: start;
  justify-content: center;

  height: 100%;
  width: 100%;
  background-color: transparent;
`;

export const CreateAccountText = styled.h4`
  background-color: transparent;
  color: white;

  font-weight: bolder;
  font-size: 32px;

  margin-top: 2%;
`;

export const Input = styled.input`
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);

  border-radius: 16px;

  width: 100%;
  height: 14%;

  padding: 4%;
  margin-top: 5%;

  font-size: 16px;
`;

export const CreateAccountButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  align-self: center;

  background-color: #fff;
  color: #000000;

  border: none;
  border-radius: 24px;

  width: 60%;
  height: 10%;

  font-weight: bolder;
  font-size: 26px;

  padding: 4%;
  margin-top: 16%;

  cursor: pointer;
`;

export const CloseButton = styled.img`
  position: absolute;

  top: 3%;
  left: 3%;

  height: 6%;
  width: 6%;

  object-fit: fill;

  border-radius: 50%;

  background-color: transparent;

  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  cursor: pointer;
`;

export const Error = styled.span`
  background-color: transparent;
  color: red;
`;

export const AccountError = styled.span`
  align-self: center;

  padding: 16px;
  font-weight: bolder;
  font-size: 24px;

  background-color: transparent;
  color: red;
`;