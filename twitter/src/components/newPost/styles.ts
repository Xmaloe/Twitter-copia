import styled from "styled-components";

interface Props {
  hovercolor?: string;
  toppos?: number;
}

export const Container = styled.div`
  display: block;
  position: relative;
  width: 598px;
  padding: 20px;

  height: 100%;

  cursor: pointer;
  transition: all 0.1s ease-in-out;

  border: 1px solid #303336;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  gap: 8px;

  height: 26px;

  cursor: pointer;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & > button {
      border: none;
      height: 20px;
      width: 40px;

      font-weight: bolder;
      font-size: 12px;
    }
  }
`;

export const OpenOptions = styled.button`
  background-color: transparent;

  cursor: pointer;

  @media (max-width: 1200px) {
    margin-right: 100px;
  }

  @media (max-width: 1000px) {
    margin-right: 100px;
  }

  @media (max-width: 900px) {
    margin-right: 110px;
  }

  @media (max-width: 768px) {
    margin-right: 64px;
  }

  @media (max-width: 600px) {
    margin-right: 150px;
  }
  @media (max-width: 480px) {
    margin-right: 180px;
  }
`;

export const ProfilePicture = styled.img`
  height: 42px;
  width: 42px;

  margin-top: 4px;

  border-radius: 50%;
`;

export const UserName = styled.h1`
  font-size: 19px;
  font-weight: bold;
`;

export const PostInfo = styled.div`
  display: flex;
  align-items: left;
  justify-content: center;

  width: 400px;
  margin-left: 45px;

  left: 70px;
  top: 45px;

  flex-direction: column;

  cursor: pointer;
`;

export const PostText = styled.span`
  font-size: 16px;
  font-family: "Times New Roman", Times, serif;

  width: 100%;

  word-wrap: break-word;
  margin-left: 6px;
`;

export const PostAttachment = styled.div`
  margin-top: 12px;
  height: 100%;

  & > img,
  video {
    max-width: 380px;
    max-height: 380px;

    border-radius: 22px;
  }
`;

export const PostInteract = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  margin-top: 10px;

  gap: 85px;

  height: 100%;
  width: 100%;
`;

export const PostUserInteract = styled.div<Props>`
  position: relative;
  display: flex;
  align-items: start;
  gap: 4px;

  & > span {
    position: absolute;
    left: 20px;
    font-size: 15px;
  }

  & > div > img {
    display: block;
    object-fit: cover;
    height: 18px;
  }
`;

export const EditedPost = styled.div`
  & > span {
    color: rgba(255, 255, 255, 0.3);

    top: 7.5px;
    left: 40%;

    font-size: 12px;
  }
`;
