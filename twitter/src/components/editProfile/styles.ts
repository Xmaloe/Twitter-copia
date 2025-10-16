import styled from "styled-components";

export const Container = styled.div`
  top: 0;
  left: 0;
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(37, 44, 52, 0.7);

  height: 100vh;
  width: 100vw;

  z-index: 10;
`;

export const EditContainer = styled.form`
  background-color: #000000;

  scrollbar-color: #888 transparent;
  scrollbar-width: none;

  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  border-radius: 16px;

  height: 600px;
  width: 600px;

  @media (max-width: 1200) {
    width: 500px;
  }

  @media (max-width: 600px) {
    height: 600px;
    width: 550px;
  }

  @media (max-width: 480px) {
    width: 440px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > div {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  margin-top: 8px;
`;

export const CloseButton = styled.img`
  background-color: transparent;
  margin-left: 16px;

  padding: 6px;
  border-radius: 50%;

  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: rgba(20, 20, 20, 1);
  }
  cursor: pointer;
`;

export const EditProfileText = styled.h1`
  color: #fff;
  font-size: 24px;
  font-weight: bold;

  padding: 8px;
`;

export const SaveButton = styled.button`
  background-color: #fff;
  color: #000000;

  border-radius: 16px;
  border: none;

  height: 32px;
  width: 80px;

  font-weight: 500;
  font-size: 16px;

  margin-right: 20px;

  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }

  cursor: pointer;
`;

export const ProfileBanner = styled.img`
  max-width: 100%;
  height: 200px;
`;

export const ProfileImages = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;

  border-left: 1px solid #000000;
  border-right: 1px solid #000000;

  margin-top: 8px;

  @media (max-width: 1200) {
    width: 500px;
  }
`;

export const ProfilePicture = styled.img`
  position: absolute;
  height: 120px;
  width: 120px;

  border-radius: 50%;
  border: 4px solid #000000;

  left: 8px;
  top: 140px;

  object-fit: cover;
`;

export const NewUsername = styled.textarea`
  border: none;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 8px;

  background-color: transparent;

  resize: none;

  width: 570px;
  height: 60px;

  padding: 8px;
  font-size: 16px;

  @media (max-width: 600px) {
    width: 480px;
  }

  @media (max-width: 480px) {
    width: 380px;
  }
`;

export const UserBio = styled.textarea`
  border: none;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 8px;

  background-color: transparent;

  resize: none;

  width: 570px;
  height: 130px;

  padding: 8px;
  font-size: 16px;

  @media (max-width: 600px) {
    width: 500px;
  }

  @media (max-width: 480px) {
    width: 400px;
  }
`;

export const UsernameBio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 32px;

  width: 100%;

  margin-top: 80px;
`;

export const AddImageImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;

  padding: 12px;

  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: rgba(20, 20, 20, 0.7);
  }

  cursor: pointer;
`;

export const AddProfilePicture = styled.img`
  position: absolute;

  top: 92%;
  left: 9.5%;

  transform: translate(-30%, -25%);

  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;

  padding: 10px;

  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: rgba(20, 20, 20, 0.7);
  }

  cursor: pointer;
`;
