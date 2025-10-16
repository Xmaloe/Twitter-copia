import React, { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import API_BASE_URL from "../../config/api";

import type { ProfileApiType } from "../../types";

import * as S from "./styles";

function CreateNewPost() {
  const navigate = useNavigate();

  const fileRef = useRef<HTMLInputElement>(null);

  const [filePreview, setFilePreview] = useState<File | null>(null);
  const [textPreview, setTextPreview] = useState("");

  const [userInfo, setUserInfo] = useState<ProfileApiType>();

  const selectFile = () => {
    if (fileRef.current) {
      fileRef.current.value = "";
      fileRef.current.click();
    }
  };

  const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFilePreview(file);
    }
  };

  const removeFilePreview = () => {
    if (fileRef.current) {
      setFilePreview(null);
    }
  };

  const publishNewPost = (e: React.FormEvent) => {
    e.preventDefault();

    const postPost = async () => {
      if (textPreview || filePreview) {
        const formData = new FormData();

        formData.append("username", userInfo?.username || "");
        formData.append("user_at", userInfo?.userat || "");
        formData.append("user", String(userInfo?.id) || "");
        formData.append("profile", String(userInfo?.id) || "");
        formData.append("text", textPreview || "");

        if (filePreview) {
          formData.append("attachment", filePreview);
        }

        try {
          await axios.post(`${API_BASE_URL}/posts/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          });
        } catch (err) {
          console.log(err);
        }
      }
      setFilePreview(null);
      setTextPreview("");

      updatePostsMade();
    };

    postPost();
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        await axios
          .get(`${API_BASE_URL}/profiles/${localStorage.getItem("userId")}/`, {
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

    fetchUserInfo();
  }, []);

  const updatePostsMade = async () => {
    if (userInfo) {
      try {
        await axios
          .patch(
            `${API_BASE_URL}/profiles/${userInfo.user}/`,
            {
              user: userInfo.user,
              id: userInfo.id,
              userat: userInfo.userat,
              posts_made: Number(userInfo.posts_made) + 1,
            },
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            console.log("Perfil atualizado", res);
          })
          .catch((res) => {
            console.log("Erro na atualizacao do perfil", res);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const userProfile = () => {
    navigate(`/${userInfo?.userat}/${userInfo?.id}/profile`);
  };

  return (
    <S.Form onSubmit={(e) => publishNewPost(e)}>
      <S.PostInfos>
        <S.ProfilePicture onClick={userProfile} src={userInfo?.profile} />
        <S.InputText
          maxLength={200}
          placeholder="Nova publicação"
          onChange={(e) => setTextPreview(e.target.value)}
          value={textPreview}
        ></S.InputText>
      </S.PostInfos>

      {filePreview ? (
        <S.DivPreview>
          <S.ImagePreview
            src={URL.createObjectURL(filePreview)}
            alt="Image Preview"
          />
          <S.RemovePreviewImage src="x.svg" onClick={removeFilePreview} />
        </S.DivPreview>
      ) : (
        ""
      )}

      <S.AddAttachment>
        <input
          accept=".png,.jpg,.jpeg,.mp4,.gif"
          onChange={fileSelected}
          style={{ display: "none" }}
          ref={fileRef}
          type="file"
        />
        <div onClick={selectFile} style={{ position: "relative" }}>
          <img src="/image.svg" alt="Select Media" />
          <S.UserInteractHover hovercolor="29, 146, 227, 0.4" />
        </div>
        <S.Post
          style={{
            backgroundColor:
              textPreview || filePreview ? "rgb(245, 238, 238)" : "gray",
            cursor: textPreview || filePreview ? "pointer" : "default",
          }}
        >
          Post
        </S.Post>
      </S.AddAttachment>
    </S.Form>
  );
}

export default CreateNewPost;
