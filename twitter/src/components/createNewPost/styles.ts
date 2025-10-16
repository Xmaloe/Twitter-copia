import styled from "styled-components";

interface Props {
  hovercolor: string;
}

export const Form = styled.form`
  padding: 16px;

  border-top: 1px solid #303336;
  margin-top: 50px;
`;

export const PostInfos = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ProfilePicture = styled.img`
  height: 48px;
  width: 48px;

  border-radius: 50%;
  cursor: pointer;
`;

export const InputText = styled.textarea`
  height: 60px;
  width: 100%;

  background-color: transparent;
  border: none;
  color: #fff;

  word-wrap: break-word;
  word-break: break-all;

  font-size: 16px;

  margin-top: 16px;
  padding: 8px;

  resize: none;

  &::placeholder {
    text-align: left;
  }
`;

export const Post = styled.button`
  height: 35px;
  width: 100px;

  font-size: 16px;
  font-weight: bolder;

  background-color: #71767b;
  color: #000000;

  border: none;
  border-radius: 32px;

  transition: all 0.1s ease-in-out;
`;

export const AddAttachment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;

  margin-top: 16px;

  border-top: 1px solid #303336;
  border-bottom: 1px solid #303336;
`;

export const UserInteractHover = styled.div<Props>`
  position: absolute;
  display: inline-block;
  height: 40px;
  width: 40px;

  border-radius: 50%;

  top: 58%;
  left: 50%;

  transform: translate(-50%, -58%);

  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: rgba(
      ${(props) => (props.hovercolor ? props.hovercolor : "0,0,0,0")}
    );
  }

  cursor: pointer;
`;

export const ImagePreview = styled.img`
  max-height: 500px;
  max-width: 560px;

  border-radius: 16px;

  @media (max-width: 1200px) {
    max-width: 460px;
  }
  @media (max-width: 992px) {
    max-width: 440px;
  }

  @media (max-width: 600px) {
    max-width: 400px;
  }
  @media (max-width: 480px) {
    max-width: 300px;
  }
`;

export const RemovePreviewImage = styled.img`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  color: #fff;

  top: 8px;
  right: 8px;

  height: 38px;
  width: 38px;

  border: none;

  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }

  cursor: pointer;
`;

export const DivPreview = styled.div`
  margin-top: 16px;

  max-width: 560px;

  position: relative;
  display: inline-block;
`;
