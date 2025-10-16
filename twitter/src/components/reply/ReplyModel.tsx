import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import API_BASE_URL from "../../config/api";
import type { ProfileApiType, ReplyApiType } from "../../types";

import * as S from "./styles";

type Comment = {
  comment: ReplyApiType;
};

function ReplyModel({ comment }: Comment) {
  const navigate = useNavigate();

  const [state, setState] = useState({
    userInfo: undefined as ProfileApiType | undefined,
    publisherInfo: undefined as ProfileApiType | undefined,
  });

  const visitProfile = () => {
    navigate(`/${comment.userat}/${comment.user}/profile`);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const [userRes, publisherRed] = await Promise.all([
          axios.get(
            `${API_BASE_URL}profiles/${localStorage.getItem("userId")}/`,
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          ),
          axios.get(`${API_BASE_URL}profiles/${comment.user}/`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        setState((prev) => ({ ...prev, userInfo: userRes.data }));
        setState((prev) => ({ ...prev, publisherInfo: publisherRed.data }));
      } finally {
        console.log("Dados fodas");
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <S.Container>
      <S.ProfileInfo>
        <S.ProfilePicture
          onClick={visitProfile}
          src={state.publisherInfo?.profile}
          alt="Profile Picture"
        />
        <S.UserName onClick={visitProfile}>{comment.username}</S.UserName>
      </S.ProfileInfo>

      <S.PostInfo>
        <S.PostText>{comment.text}</S.PostText>
      </S.PostInfo>
    </S.Container>
  );
}

export default ReplyModel;
