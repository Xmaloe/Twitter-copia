import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;

  gap: 200px;

  background-color: #000000;
  height: 100vh;
  width: 100vw;

  padding: 6%;

  @media (max-width: 1000px) {
    gap: 150px;
  }
  @media (max-width: 768px) {
    gap: 0;
    padding: 0;
    justify-content: center;
  }
`;

export const TwitterLogo = styled.img`
  height: 50%;
  width: 25%;

  @media (max-width: 1200px) {
    height: 40%;
    width: 25%;
  }
  @media (max-width: 1000px) {
    height: 30%;
    width: 25%;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const HappeningNow = styled.h1`
  font-weight: bolder;
  font-size: 80px;

  margin-bottom: 5%;

  @media (max-width: 600px) {
    font-size: 60px;
  }
  @media (max-width: 478px) {
    font-size: 50px;
  }
`;

export const SubscribeText = styled.h2`
  font-weight: bolder;
  font-size: 40px;

  margin-bottom: 6%;

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

export const CreateAccButton = styled.button`
  background-color: #1b8cd8;
  color: #fff;

  border: none;
  border-radius: 32px;

  font-weight: bolder;
  font-size: 16px;

  height: 35px;
  width: 100%;

  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: #1879b9;
  }

  cursor: pointer;
`;

export const HaveAccount = styled.span`
  background-color: transparent;
  font-weight: bolder;

  align-self: center;
`;

export const LoginButton = styled.button`
  background-color: transparent;
  color: #1b8cd8;

  height: 35px;
  width: 100%;

  font-weight: bolder;

  border-radius: 32px;
  border: 2px solid #1b8cd8;

  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: rgba(24, 121, 185, 0.1);
  }

  cursor: pointer;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  gap: 12px;

  background-color: transparent;
  width: 40%;
`;

export const Div = styled.div`
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;
