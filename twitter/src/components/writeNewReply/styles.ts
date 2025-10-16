import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  background-color: transparent;

  width: 25%;
  height: 30%;

  z-index: 8;

  @media (max-width: 1200px) {
    width: 30%;
  }
  @media (max-width: 1000px) {
    width: 35%;
  }
  @media (max-width: 768px) {
    width: 50%;
  }
  @media (max-width: 600px) {
    width: 80%;
  }
  @media (max-width: 480px) {
    width: 80%;
  }
`;

export const Wrapper = styled.div`
  background-color: #000000;

  width: 100%;
  height: 100%;

  border-radius: 32px;
`;

export const ProfileInfo = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  height: 12px;

  padding: 12px;

  gap: 8px;

  background-color: transparent;
`;

export const ProfilePicture = styled.img`
  height: 42px;
  width: 42px;

  border-radius: 50%;
  margin-top: 10%;
`;

export const UserAt = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.3);
  margin-top: 3%;
`;

export const Username = styled.h2`
  font-size: 16px;
  font-weight: bolder;
  margin-top: 3%;
`;

export const PostText = styled.span`
  font-weight: normal;
  background-color: transparent;

  font-weight: 300;

  word-wrap: break-word;
  overflow-wrap: break-word;

  background-color: transparent;

  margin-left: 4.2%;
`;

export const PostTextWrapper = styled.div`
  background-color: transparent;
  width: 80%;
  margin-left: 13.25%;
  margin-top: 1%;

  @media (max-width: 1200px) {
    margin-left: 16.2%;
  }
  @media (max-width: 1000px) {
    margin-left: 16.5%;
  }
  @media (max-width: 768px) {
    margin-left: 14.8%;
  }
  @media (max-width: 600px) {
    margin-left: 12.2%;
  }
  @media (max-width: 480px) {
    margin-left: 15.2%;
  }
`;

export const Background = styled.div`
  position: absolute;
  display: block;

  top: 0;
  left: 0;

  height: 100vh;
  width: 100vw;

  z-index: 7;

  background-color: rgba(255, 255, 255, 0.1);
`;

export const LoggedUserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  gap: 4.5%;
  height: 30%;

  padding-left: 8px;

  background-color: transparent;

  margin-top: 5%;
`;

export const ReplyText = styled.textarea`
  resize: none;
  background-color: transparent;

  width: 80%;
  height: 80%;

  border: none;
  padding: 8px;
  margin-top: 10%;

  font-size: 16px;
`;

export const ReplyButton = styled.button`
  height: 40%;
  width: 40%;

  border-radius: 32px;
  border: none;

  color: #000000;

  font-weight: bolder;
  font-size: 16px;

  padding: 8px;

  margin: 8px;
`;

export const ReplyDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 40%;
  width: 100%;
`;
