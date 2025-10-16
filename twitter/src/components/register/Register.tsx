import { useState } from "react";
import * as S from "./styles";
import axios from "axios";
import API_BASE_URL from "../../config/api";

type MenuType = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Register({ isMenuOpen, setIsMenuOpen }: MenuType) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [accountCreated, setAccountCreated] = useState(false);
  const [error, setError] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const createAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const createAccountAsync = async () => {
      try {
        const res = await axios.post(`${API_BASE_URL}register/`, {
          username: username,
          email: email,
          password: password,
        });

        const token = res.data.token;
        localStorage.setItem("token", token);

        if (res.data.token) {
          setAccountCreated(true);

          setUsername("");
          setEmail("");
          setPassword("");

          setTimeout(() => {
            setAccountCreated(false);
          }, 2000);
        } else {
          setError(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    createAccountAsync();
  };

  return (
    <S.Container style={{ display: isMenuOpen ? "block" : "none" }}>
      <S.Wrapper>
        <S.TwitterLogo src="/twitter.png" />

        <S.Form onSubmit={createAccount}>
          <S.CloseButton onClick={closeMenu} src="x.svg" />
          <S.CreateAccountText>Crie sua conta</S.CreateAccountText>

          <S.Input
            required
            onSelect={() => setError(false)}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nome"
            type="text"
            maxLength={30}
          />
          <S.Input
            required
            onSelect={() => setError(false)}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
          />
          <S.Input
            required
            onSelect={() => setError(false)}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            type="password"
          />
          <S.AccountCreated
            style={{ display: accountCreated ? "block" : "none" }}
          >
            Conta criada
          </S.AccountCreated>
          <S.AccountError style={{ display: error ? "block" : "none" }}>
            Usuario ja existe
          </S.AccountError>
          <S.CreateAccountButton>Criar conta</S.CreateAccountButton>
        </S.Form>
      </S.Wrapper>
    </S.Container>
  );
}

export default Register;
