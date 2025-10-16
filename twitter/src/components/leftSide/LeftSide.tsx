import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import API_BASE_URL from "../../config/api";
import type { ProfileApiType } from "../../types";

import * as S from "./styles";

function LeftSide() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<ProfileApiType>();
  const [openMenu, setOpenMenu] = useState(false);

  const ReturnHome = () => {
    navigate("/home");
  };

  const GoToProfile = () => {
    navigate(`/${userInfo?.userat}/${userInfo?.id}/profile`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(`${API_BASE_URL}profiles/${localStorage.getItem("userId")}/`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setUserInfo(res.data);
          });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const logOut = () => {
    navigate("/register");

    localStorage.removeItem("token");
  };

  return (
    <>
      <S.CloseDiv
        onClick={() => setOpenMenu(false)}
        style={{ display: openMenu ? "block" : "none" }}
      />
      <S.Container>
        <S.Background>
          <S.ButtonsList>
            <div>
              <div onClick={ReturnHome} style={{ position: "relative" }}>
                <S.LogoButton src="/twitter.png" />
                <S.ButtonInteraction />
              </div>
              <S.Wrapper onClick={ReturnHome}>
                <S.ButtonImage src="/house.svg" />
                <S.Button>Home</S.Button>
              </S.Wrapper>
              <S.Wrapper onClick={GoToProfile}>
                <S.ButtonImage src="/profile.svg" />
                <S.Button>Perfil</S.Button>
              </S.Wrapper>
            </div>
            <S.SignOutMenu style={{ display: openMenu ? "flex" : "none" }}>
              <S.SignOutButton onClick={() => logOut()}>
                Sair da conta @{userInfo?.userat}
              </S.SignOutButton>
            </S.SignOutMenu>
            <S.UserInfo onClick={() => setOpenMenu(!openMenu)}>
              <S.ProfilePicture src={userInfo?.profile} />
              <div>
                <S.Username>{userInfo?.username}</S.Username>
                <S.UserAt>@{userInfo?.userat}</S.UserAt>
              </div>
            </S.UserInfo>
          </S.ButtonsList>
        </S.Background>
      </S.Container>
    </>
  );
}

export default LeftSide;
