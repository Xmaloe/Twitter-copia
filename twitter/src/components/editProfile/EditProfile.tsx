import type React from "react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import axios from "axios";

import API_BASE_URL from "../../config/api";

import type { ProfileApiType } from "../../types";

import * as S from "./styles";
import { useParams } from "react-router-dom";

type Prop = {
  isEditOpen: boolean;
  setIsEditOpen: (value: boolean) => void;
};

function EditProfile({ isEditOpen, setIsEditOpen }: Prop) {
  const profilePictureRef = useRef<HTMLInputElement>(null);
  const profileBannerRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState({
    picturePreview: undefined as File | undefined,
    bannerPreview: undefined as File | undefined,
    username: "",
    bio: "",
    userInfo: undefined as ProfileApiType | undefined,
  });

  const { userId } = useParams();

  const openPicturePic = () => {
    if (profilePictureRef.current) {
      profilePictureRef.current.value = "";
      profilePictureRef.current.click();
    }
  };

  const openBannerPic = () => {
    if (profileBannerRef.current) {
      profileBannerRef.current.value = "";
      profileBannerRef.current.click();
    }
  };

  const PictureSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setState((prev) => ({ ...prev, picturePreview: file }));
    }
  };

  const BannerSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setState((prev) => ({ ...prev, bannerPreview: file }));
    }
  };

  const editProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updateProfile = async () => {
      if (state.userInfo) {
        const formData = new FormData();

        formData.append(
          "username",
          state.username ? state.username : state.userInfo.username
        );
        formData.append("bio", state.bio ? state.bio : state.userInfo.bio);

        if (state.picturePreview) {
          formData.append("profile", state.picturePreview);
        }
        if (state.bannerPreview) {
          formData.append("banner", state.bannerPreview);
        }

        try {
          await Promise.all([
            axios.patch(`${API_BASE_URL}profiles/${userId}/`, formData, {
              headers: {
                "Content-type": "multipart/form-data",
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }),
          ]);
        } finally {
          console.log("perfil editado");

          setState((prev) => ({ ...prev, picturePreview: undefined }));
          setState((prev) => ({ ...prev, bannerPreview: undefined }));

          setIsEditOpen(false);
        }
      }
    };

    updateProfile();
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const [userRes] = await Promise.all([
          axios.get(`${API_BASE_URL}profiles/${userId}`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        setState((prev) => ({ ...prev, userInfo: userRes.data }));
      } finally {
        console.log("informacoes pegas");
      }
    };

    fetchUserInfo();
  }, [isEditOpen, userId]);

  const closeGui = () => {
    setIsEditOpen(false);

    setState((prev) => ({ ...prev, picturePreview: undefined }));
    setState((prev) => ({ ...prev, bannerPreview: undefined }));
  };

  return (
    <S.Container style={{ display: isEditOpen ? "flex" : "none" }}>
      <S.EditContainer onSubmit={editProfile}>
        <S.Header>
          <div>
            <S.CloseButton onClick={closeGui} src="/x.svg" />
            <S.EditProfileText>Editar perfil</S.EditProfileText>
          </div>

          <S.SaveButton>Salvar</S.SaveButton>
        </S.Header>

        <S.ProfileImages>
          <div style={{ position: "relative" }}>
            <input
              onChange={BannerSelected}
              ref={profileBannerRef}
              style={{ display: "none" }}
              type="file"
              accept=".png,.jpg,.jpeg,.mp4,.gif"
            />
            <S.ProfileBanner
              src={
                state.bannerPreview
                  ? URL.createObjectURL(state.bannerPreview)
                  : state.userInfo?.banner
              }
            />
            <S.AddImageImage onClick={openBannerPic} src="/add-image.svg" />
          </div>
          <div>
            <input
              onChange={PictureSelected}
              ref={profilePictureRef}
              style={{ display: "none" }}
              type="file"
              accept=".png,.jpg,.jpeg,.mp4,.gif"
            />
            <S.ProfilePicture
              src={
                state.picturePreview
                  ? URL.createObjectURL(state.picturePreview)
                  : state.userInfo?.profile
              }
            />
            <S.AddProfilePicture
              onClick={openPicturePic}
              src="/add-image.svg"
            />
          </div>
        </S.ProfileImages>

        <S.UsernameBio>
          <S.NewUsername
            maxLength={23}
            onChange={(e) =>
              setState((prev) => ({ ...prev, username: e.target.value }))
            }
            defaultValue={state.userInfo?.username}
            placeholder="Nome"
          ></S.NewUsername>
          <S.UserBio
            maxLength={120}
            onChange={(e) => {
              setState((prev) => ({ ...prev, bio: e.target.value }));
            }}
            defaultValue={state.userInfo?.bio}
            placeholder="Bio"
          ></S.UserBio>
        </S.UsernameBio>
      </S.EditContainer>
    </S.Container>
  );
}

export default EditProfile;
