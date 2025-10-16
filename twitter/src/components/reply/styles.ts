import styled from "styled-components";

interface Props {
  hovercolor?: string;
  toppos?: number;
}

export const Container = styled.div`
  position: relative;
  height: 100%;
  width: 600px;

  padding: 20px;

  border: 1px solid #303336;
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  @media (max-width: 992px) {
    width: 500px;
  }
  @media (max-width: 480px) {
    width: 400px;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  gap: 8px;
  height: 30px;
`;

export const ProfilePicture = styled.img`
  height: 42px;
  width: 42px;

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
  margin-left: 50px;

  display: flex;
  flex-direction: column;
`;

export const PostText = styled.span`
  font-size: 16px;
  font-family: "Times New Roman", Times, serif;

  width: 500px;

  word-wrap: break-word;
`;

export const PostAttachment = styled.div`
  margin-top: 12px;

  & > img,
  video {
    max-width: 550px;
    max-height: 380px;

    border-radius: 22px;

    cursor: pointer;
  }
`;

export const PostInteract = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

export const PostUserInteract = styled.div<Props>`
  display: flex;
  align-items: start;
  gap: 4px;

  margin-top: 2px;

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
