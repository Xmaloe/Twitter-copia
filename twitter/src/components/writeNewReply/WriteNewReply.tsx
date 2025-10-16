import { useEffect, useState } from "react";
import axios from "axios";

import API_BASE_URL from "../../config/api";
import type { PostApiType, ProfileApiType } from "../../types";

import * as S from "./styles";
import PageLoading from "../loadingPage/LoadingPage";

type ReplyProp = {
  openReplyMenu: boolean;
  setOpenReplyMenu: (value: boolean) => void;
  postId?: string;
  userId?: string;
};

function NewReply({
  openReplyMenu,
  setOpenReplyMenu,
  postId,
  userId,
}: ReplyProp) {
  const [state, setState] = useState({
    replyMessage: "",
    postInfo: undefined as PostApiType | undefined,
    publisherInfo: undefined as ProfileApiType | undefined,
    userInfo: undefined as ProfileApiType | undefined,

    isLoaded: false,
  });

  const SubmitReply = async () => {
    if (state.replyMessage) {
      try {
        await Promise.all([
          axios.post(
            `${API_BASE_URL}replies/`,
            {
              username: state.userInfo?.username,
              userat: state.userInfo?.userat,
              user: state.userInfo?.id,
              text: state.replyMessage,
              post: postId,
              profile: state.userInfo?.id,
            },
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          ),
          axios.patch(
            `${API_BASE_URL}posts/${postId}/`,
            {
              comments: Number(state.postInfo?.comments) + 1,
            },
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          ),
        ]);

        setOpenReplyMenu(false);
      } finally {
        console.log("Reply enviada");
      }
    }
  };

  useEffect(() => {
    const fetchAsync = async () => {
      try {
        const [postRes, profileRes, userRes] = await Promise.all([
          axios.get(`${API_BASE_URL}posts/${postId}`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
          axios.get(`${API_BASE_URL}profiles/${Number(userId)}`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
          axios.get(
            `${API_BASE_URL}profiles/${localStorage.getItem("userId")}`,
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          ),
        ]);

        setState((prev) => ({ ...prev, postInfo: postRes.data }));
        setState((prev) => ({ ...prev, publisherInfo: profileRes.data }));
        setState((prev) => ({ ...prev, userInfo: userRes.data }));

        setInterval(() => {
          setState((prev) => ({ ...prev, isLoaded: true }));
        }, 200);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAsync();
  }, [postId, userId]);

  return (
    <div>
      {state.isLoaded ? (
        <>
          <S.Background
            style={{ display: openReplyMenu ? "block" : "none" }}
            onClick={() => setOpenReplyMenu(false)}
          />
          <S.Container style={{ display: openReplyMenu ? "block" : "none" }}>
            <S.Wrapper>
              <S.ProfileInfo>
                <S.ProfilePicture src={state.publisherInfo?.profile} />
                <S.Username>{state.publisherInfo?.username}</S.Username>
                <S.UserAt>@{state.publisherInfo?.userat}</S.UserAt>
              </S.ProfileInfo>
              <S.PostTextWrapper>
                <S.PostText>{state.postInfo?.text}</S.PostText>
              </S.PostTextWrapper>
              <S.LoggedUserInfo>
                <S.ProfilePicture src={state.userInfo?.profile} />
                <S.ReplyText
                  value={state.replyMessage}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      replyMessage: e.target.value,
                    }))
                  }
                  placeholder="Publique sua resposta"
                ></S.ReplyText>
              </S.LoggedUserInfo>

              <S.ReplyDiv>
                <S.ReplyButton
                  onClick={SubmitReply}
                  style={{
                    backgroundColor: state.replyMessage
                      ? "rgba(255, 255, 255, 0.9)"
                      : "rgba(255, 255, 255, 0.3)",
                    cursor: state.replyMessage ? "pointer" : "default",
                  }}
                >
                  Responder
                </S.ReplyButton>
              </S.ReplyDiv>
            </S.Wrapper>
          </S.Container>
        </>
      ) : (
        <PageLoading />
      )}
    </div>
  );
}

export default NewReply;
