import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: top;
  justify-content: center;

  top: 0;
  left: 0;

  z-index: 100;

  height: 100vh;
  width: 100vw;

  background-color: rgba(0, 0, 0, 1);
`;

export const LoadingImage = styled.img`
  background-color: transparent;
  margin-top: 8%;

  height: 14%;
`;
