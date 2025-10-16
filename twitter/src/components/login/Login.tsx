import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import API_BASE_URL from "../../config/api";

import * as S from "./styles";

type MenuType = {
  isLoginOpen: boolean;
  setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Login({ isLoginOpen, setIsLoginOpen }: MenuType) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);

  const createAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginAsync = async () => {
      try {
        const res = await axios.post(`${API_BASE_URL}/login/`, {
          username: username,
          password: password,
          token: localStorage.getItem("token"),
        });

        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.user_id);

          if (localStorage.getItem("token") !== undefined) {
            navigate("/home");

            setError(false);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.log(err);

        return <h1>Error</h1>;
      }
    };

    loginAsync();
  };

  const closeMenu = () => {
    setIsLoginOpen(false);
  };

  return (
    <S.Container style={{ display: isLoginOpen ? "block" : "none" }}>
      <S.Wrapper>
        <S.TwitterLogo src="/twitter.png" />

        <S.Form onSubmit={(e) => createAccount(e)}>
          <S.CloseButton onClick={closeMenu} src="x.svg" />
          <S.CreateAccountText>Logar na sua conta</S.CreateAccountText>

          <S.Input
            required
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nome"
            type="text"
            maxLength={30}
          />
          <S.Input
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            type="password"
          />
          <S.AccountError style={{ display: error ? "block" : "none" }}>
            Credenciais invalidas
          </S.AccountError>
          <S.CreateAccountButton>Entrar</S.CreateAccountButton>
        </S.Form>
      </S.Wrapper>
    </S.Container>
  );
}

export default Login;
