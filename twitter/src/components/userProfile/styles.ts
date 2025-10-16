import styled from "styled-components";

interface Props {
  toppos: number;
  hovercolor: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;
  width: 600px;

  color: #fff;
  background-color: #000000;

  scrollbar-color: #888 transparent;
  scrollbar-width: none;

  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  transition: all 0.5s ease-in;
  @media (max-width: 1000px) {
    margin-left: 0px;
  }

  @media (max-width: 992px) {
    width: 500px;
  }

  @media (max-width: 768px) {
    width: 1600px;
  }

  @media (max-width: 600px) {
    width: 4000px;
    margin-left: 50px;
  }
  @media (max-width: 480px) {
    width: 100000px;
  }
`;

export const Background = styled.div`
  display: flex;
  justify-content: center;
  background-color: #000000;

  height: 100vh;
  width: 100vw;
`;

export const Wrapper = styled.div`
  position: relative;
  width: 600px;
  height: 455px;

  margin-top: 60px;

  @media (max-width: 992px) {
    width: 500px;
  }
  @media (max-width: 768px) {
    width: 540px;
  }
  @media (max-width: 600px) {
    width: 470px;
  }
  @media (max-width: 480px) {
    width: 435px;
  }
`;

export const Header = styled.header`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  width: 600px;
  height: 60px;

  top: 0;

  padding: 4px;
  z-index: 4;

  & > div {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 1000px) {
    width: 540px;
  }

  @media (max-width: 768px) {
    width: 590px;
  }
  @media (max-width: 600px) {
    width: 500px;
  }
  @media (max-width: 480px) {
    width: 430px;
  }
`;

export const PostCounter = styled.span`
  color: rgba(255, 255, 255, 0.8);
  text-align: left;

  font-size: 12px;

  margin-top: 4px;
`;

export const ProfileBanner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  max-height: 200px;

  & > div {
    & > img {
      width: 100%;
      height: 200px;

      background-color: blue;
    }
  }

  @media (max-width: 992px) {
    width: 500px;
  }
  @media (max-width: 768px) {
    width: 540px;
  }
  @media (max-width: 600px) {
    width: 500px;
  }
  @media (max-width: 480px) {
    width: 440px;
  }
`;

export const ProfilePicture = styled.div`
  position: absolute;
  height: 120px;
  width: 120px;

  top: 140px;
  left: 20px;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;

    border: 4px solid #000000;
    object-fit: cover;
  }

  @media (max-width: 992px) {
    top: 108px;
  }

  @media (max-width: 768px) {
    top: 120px;
  }

  @media (max-width: 600px) {
    top: 110px;
  }

  @media (max-width: 480px) {
    top: 80px;
  }
`;

export const Username = styled.h1`
  font-weight: bold;
  font-size: 24px;
`;

export const UserInteractHover = styled.div<Props>`
  position: absolute;
  display: inline-block;
  height: 40px;
  width: 40px;

  border-radius: 50%;

  top: ${(props) => (props.toppos ? props.toppos : 0)}%;
  left: 50%;

  transform: translate(-50%, -60%);

  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: rgba(
      ${(props) => (props.hovercolor ? props.hovercolor : "0,0,0,0")}
    );
  }
`;

export const UserInfos = styled.div`
  margin-left: 64px;
`;

export const ReturnArrow = styled.div`
  position: absolute;
  margin-left: 16px;
  margin-top: 14px;

  cursor: pointer;
`;

export const ProfileAt = styled.h3`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 500;
`;

export const Follow = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 500;
`;

export const ProfileInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-top: 55px;
  padding: 16px;
`;

export const EditProfileButton = styled.button`
  background-color: transparent;
  color: white;
  font-weight: bolder;
  font-size: 16px;

  width: 128px;

  padding: 8px;
  margin-top: 16px;
  margin-left: 60%;

  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 16px;

  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  cursor: pointer;

  @media (max-width: 600px) {
    margin-right: 70px;
  }
  @media (max-width: 480px) {
    margin-right: 70px;
  }
`;

export const SelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #fff;
  padding: 24px;

  width: 100%;
  height: 100%;

  border: none;

  font-weight: bolder;
  font-size: 16px;

  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  z-index: 3;

  cursor: pointer;
`;

export const SelectButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 4px;
  margin-bottom: 3px;
`;

export const DateJoined = styled.span`
  color: rgba(255, 255, 255, 0.6);
`;

export const CalendarIcon = styled.img`
  height: 16px;
  width: 16px;
`;

export const DateInfo = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

export const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 600px;

  border: 1px solid #303336;

  @media (max-width: 992px) {
    width: 500px;
  }

  @media (max-width: 768px) {
    width: 540px;
  }

  @media (max-width: 480px) {
    display: nonen;
  }
`;

export const Bio = styled.div`
  align-items: center;

  background-color: transparent;
  color: #fff;

  margin: 12px 0;
  height: 50px;

  & > span {
    word-wrap: break-word;
  }
`;
