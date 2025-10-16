import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #000000;
  height: 100vh;
  width: 100vw;
`;

export const FeedPosts = styled.ul`
  width: 600px;

  border-left: 1px solid #303336;
  border-right: 1px solid #303336;

  list-style-type: none;
  scrollbar-color: #888 transparent;
  scrollbar-width: none;

  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (max-width: 1200px) {
    width: 500px;
  }
  @media (max-width: 768px) {
    width: 550px;
    margin-left: 0px;
  }
  @media (max-width: 600px) {
    width: 450px;
    margin-left: 50px;
  }
  @media (max-width: 480px) {
    width: 420px;
    margin-left: 60px;
  }
`;

export const ChangeFeed = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.8);

  width: 600px;

  z-index: 4;

  & > button {
    width: 298px;
  }

  @media (max-width: 1200px) {
    display: flex;
    align-items: start;
    justify-content: start;

    & > button {
      width: 41.5%;
    }
  }
  @media (max-width: 768px) {
    display: flex;
    align-items: start;
    justify-content: start;

    & > button {
      width: 45.65%;
    }
  }
  @media (max-width: 600px) {
    display: flex;
    align-items: start;
    justify-content: start;

    & > button {
      width: 37.45%;
    }
  }
  @media (max-width: 480px) {
    display: flex;
    align-items: start;
    justify-content: start;

    & > button {
      width: 29.1%;
    }
  }
`;

export const SelectedFeed = styled.button`
  height: 50px;

  background-color: transparent;
  border: none;

  font-weight: bolder;
  font-size: 18px;
  text-align: center;

  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }

  cursor: pointer;
`;
