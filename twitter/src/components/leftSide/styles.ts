import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  color: white;

  top: 0;
  left: 22%;

  background-color: transparent;
  height: 100%;

  @media (max-width: 1200px) {
    left: 0%;
  }

  @media (max-width: 992px) {
    left: 0%;
  }
  @media (max-width: 768px) {
    left: 0%;
  }
  @media (max-width: 600px) {
    left: 0%;
  }
`;

export const Background = styled.div`
  height: 100px;
  width: 0px;

  margin-right: 120px;

  @media (max-width: 1200px) {
    width: 0px;
    margin-left: 300px;
  }
  @media (max-width: 1000px) {
    width: 0px;
    margin-left: 200px;
  }
  @media (max-width: 992px) {
    width: 0px;
    margin-left: 200px;
  }
  @media (max-width: 820px) {
    width: 0px;
    margin-left: 100px;
  }
  @media (max-width: 768px) {
    width: 0px;
    margin-left: 60px;
  }
  @media (max-width: 600px) {
    width: 0px;
    margin-left: 20px;
  }
  @media (max-width: 480px) {
    width: 0px;
    margin-left: -10px;
  }
`;

export const ButtonsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  position: relative;

  height: 760px;
  background-color: transparent;

  @media (max-width: 1200px) {
    height: 200px;
  }
`;

export const LogoButton = styled.img`
  height: 24px;
  width: 24px;

  margin-top: 14px;

  cursor: pointer;

  margin-left: 18px;

  @media (max-width: 600px) {
    margin-left: 80px;
  }
  @media (max-width: 480px) {
    margin-left: 90px;
  }
`;

export const ButtonInteraction = styled.div`
  position: absolute;

  left: 5px;
  top: 1px;

  border-radius: 50%;

  height: 50px;
  width: 50px;

  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }

  cursor: pointer;

  @media (max-width: 600px) {
    left: 67px;
  }
`;

export const Button = styled.button`
  font-weight: bolder;

  background-color: transparent;
  border: none;

  height: 50px;
  width: 120px;

  font-size: 24px;
  cursor: pointer;

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const ButtonImage = styled.img`
  height: 32px;
  width: 32px;

  margin-left: 12px;
  @media (max-width: 768px) {
    margin-top: 16px;
  }
  @media (max-width: 600px) {
    margin-left: 75px;
  }
  @media (max-width: 480px) {
    margin-left: 85px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  width: 180px;

  margin-top: 12px;

  transition: all 0.1s ease-in-out;

  border-radius: 32px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }

  cursor: pointer;

  @media (max-width: 1200px) {
    width: 0;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  width: 240px;
  padding: 6px;

  border-radius: 32px;

  background-color: transparent;

  transition: all 0.05s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  cursor: pointer;

  @media (max-width: 1200px) {
    width: 64px;
    margin-left: 15px;
  }
  @media (max-width: 768px) {
    margin-top: 27px;
    margin-left: 15px;
  }
  @media (max-width: 600px) {
    margin-left: 80px;
  }
  @media (max-width: 480px) {
    margin-left: 90px;
  }
`;

export const ProfilePicture = styled.img`
  height: 52px;
  width: 52px;

  border-radius: 50%;
`;

export const Username = styled.h3`
  font-weight: bolder;
  font-size: 20px;

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const UserAt = styled.h2`
  font-weight: bold;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.1);

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const OpenMenu = styled.span`
  background-color: transparent;
  font-weight: bolder;

  margin-left: 22px;
  margin-bottom: 8px;

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const SignOutMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;

  height: 40px;
  width: 220px;

  bottom: 80px;
  right: -110px;

  background-color: #000000;

  border-radius: 12px;

  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);

  @media (max-width: 1200px) {
    left: -20px;
    bottom: -50px;
  }

  @media (max-width: 768px) {
    left: -86px;
    bottom: -100px;
  }
  @media (max-width: 600px) {
    left: -24px;
    bottom: -100px;
  }
  @media (max-width: 480px) {
    left: -5px;
    bottom: -100px;
  }

  z-index: 9;
`;

export const SignOutButton = styled.button`
  background-color: transparent;
  border: none;

  font-size: 16px;
  z-index: 9;

  &:hover {
    text-decoration: underline;
  }

  cursor: pointer;
`;

export const CloseDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  z-index: 8;

  height: 100vh;
  width: 100vw;

  background-color: transparent;
`;
