import styled from "styled-components";

interface Props {
  hovercolor?: string;
  toppos?: number;
  leftpos?: number;
}

export const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 600px;

  border-left: 1px solid #303336;
  border-right: 1px solid #303336;

  transition: all 0.1s ease-in-out;

  @media (max-width: 992px) {
    width: 500px;
  }
  @media (max-width: 768px) {
    width: 500px;
  }

  @media (max-width: 600px) {
    margin-left: 36px;
  }
  @media (max-width: 480px) {
    margin-left: 40px;
    width: 400px;
  }
`;

export const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;

  overflow-y: hidden;
  overflow-x: hidden;
`;

export const Container = styled.div`
  position: relative;
  width: 600px;
  padding: 20px;

  margin-top: 20px;

  @media (max-width: 992px) {
    width: 500px;
  }
  @media (max-width: 768px) {
    width: 500px;
  }
  @media (max-width: 480px) {
    max-width: 400px;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  gap: 8px;
`;

export const OpenOptions = styled.button`
  display: flex;
  flex-direction: column;
  align-items: start;

  background-color: transparent;
  border: none;

  cursor: pointer;

  font-weight: bolder;
  font-size: 16px;

  height: 20px;
`;

export const OptionsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: relative;

  width: 520px;

  @media (max-width: 992px) {
    width: 400px;
  }

  @media (max-width: 768px) {
    width: 400px;
  }
  @media (max-width: 600px) {
    width: 400px;
  }

  @media (max-width: 480px) {
    max-width: 300px;
  }
`;

export const ProfilePicture = styled.img`
  background-color: purple;
  height: 42px;
  width: 42px;

  margin-top: 3px;

  border-radius: 50%;
  cursor: pointer;
`;

export const UserName = styled.h1`
  font-size: 19px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }

  cursor: pointer;
`;

export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 8px;
`;

export const PostText = styled.span`
  font-size: 18px;
  font-family: "Times New Roman", Times, serif;

  width: 500px;
  margin-top: 20px;

  word-wrap: break-word;
`;

export const PostAttachment = styled.div`
  margin-top: 12px;

  & > img,
  video {
    max-width: 460px;
    max-height: 380px;

    border-radius: 22px;
    cursor: pointer;
  }
`;

export const PostInteract = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 64px;

  margin-top: 16px;

  background-color: transparent;
  padding: 8px;

  border-top: 1px solid #303336;
  border-bottom: 1px solid #303336;
`;

export const PostUserInteract = styled.div<Props>`
  display: flex;
  align-items: start;
  gap: 4px;

  margin-top: 6px;
  margin-bottom: 2px;

  & > span {
    font-size: 15px;
  }

  & > div > img {
    display: block;
    object-fit: cover;
    height: 18px;
  }

  cursor: pointer;
`;

export const UserInteractHover = styled.div<Props>`
  position: absolute;
  display: inline-block;
  height: 30px;
  width: 30px;

  border-radius: 50%;

  top: ${(props) => (props.toppos ? props.toppos : 0)}%;
  left: ${(props) => (props.leftpos ? props.leftpos : 50)}%;

  transform: translate(-50%, -60%);

  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: rgba(
      ${(props) => (props.hovercolor ? props.hovercolor : "0,0,0,0")}
    );
  }
`;

export const ReturnHome = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 18px;

  position: fixed;
  z-index: 4;

  top: 0;

  width: 600px;
  height: 50px;

  font-size: 10px;

  background-color: rgba(0, 0, 0, 0.8);

  border-left: 1px solid #303336;
  border-right: 1px solid #303336;

  & > img,
  & > div {
    margin-left: 16px;
    cursor: pointer;
  }

  @media (max-width: 992px) {
    width: 500px;
  }
  @media (max-width: 480px) {
    width: 400px;
  }
`;

export const Replies = styled.div`
  width: 100%;

  margin-top: 42px;
`;

export const Div = styled.div`
  height: 800px;
  padding: 45px;

  scrollbar-color: #888 transparent;
  scrollbar-width: none;

  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (max-width: 992px) {
    padding-top: 20px;
  }
`;

export const TimePosted = styled.div`
  background-color: transparent;

  margin-top: 8px;
  color: #3b3d40;
`;

export const UserAt = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 500;

  cursor: pointer;
`;

export const SelectionMenu = styled.div`
  align-items: center;
  justify-content: space-between;

  position: absolute;
  right: 20px;
  top: 20px;

  background-color: #000000;

  height: 100px;
  width: 120px;

  z-index: 4;

  border-radius: 12px;

  border: 1px solid rgba(255, 255, 255, 0.4);

  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.6);
`;

export const ActionButton = styled.button`
  color: red;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const ActionImage = styled.img`
  height: 24px;
  width: 24px;
  cursor: pointer;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  & > div {
    display: flex;
    gap: 12px;
  }
`;

export const ActionDecorations = styled.div`
  transition: all 0.2s ease-in-out;
  width: 118px;
  padding: 6px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  cursor: pointer;
`;

export const EditedMessageInput = styled.textarea`
  background-color: transparent;

  border: 1px solid #fff;
  border-radius: 8px;

  height: 64px;
  font-size: 16px;

  padding: 8px;
  margin-top: 16px;

  resize: none;
`;

export const ContinueButton = styled.button`
  border: 1px solid #fff;
  border-radius: 8px;

  height: 32px;
  width: 64px;

  background-color: transparent;

  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  cursor: pointer;
`;

export const ContinueButtonsContainer = styled.div`
  display: flex;
  gap: 16px;

  align-items: center;
  justify-content: center;

  margin-top: 8px;
`;

export const ScreenCancelButton = styled.div`
  display: block;
  position: absolute;
  top: 0;
  right: 0;

  z-index: 4;

  background-color: transparent;

  height: 100vh;
  width: 100vw;
`;

export const EditedPost = styled.div`
  & > span {
    color: rgba(255, 255, 255, 0.3);

    top: 6px;
    left: 150px;

    font-size: 12px;
  }
`;
