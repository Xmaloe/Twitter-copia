import { useState } from "react";

import Register from "../register/Register";
import Login from "../login/Login";

import * as S from "./styles";

function Registration() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const openLoginMenu = () => {
    setIsLoginOpen(true);
  };

  return (
    <S.Container>
      <Register isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Login isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />
      <S.TwitterLogo src="/twitter.png" />
      <S.Div>
        <S.HappeningNow>Acontecendo agora</S.HappeningNow>
        <S.SubscribeText>Inscreva-se hoje mesmo.</S.SubscribeText>
        <S.Buttons>
          <S.CreateAccButton onClick={openMenu}>
            Criar uma conta
          </S.CreateAccButton>
          <S.HaveAccount>Já tem uma conta?</S.HaveAccount>
          <S.LoginButton onClick={openLoginMenu}>Entrar</S.LoginButton>
        </S.Buttons>
      </S.Div>
    </S.Container>
  );
}

export default Registration;
