import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import LeftSide from "../leftSide/LeftSide";
import NewReply from "../writeNewReply/WriteNewReply";
import ReplyModel from "../reply/ReplyModel";

import API_BASE_URL from "../../config/api";
import type { PostApiType, ReplyApiType, ProfileApiType } from "../../types";

import * as S from "./styles";
import PageLoading from "../loadingPage/LoadingPage";

function ReadPost() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    postInfo: undefined as PostApiType | undefined,
    repliesInfo: undefined as [ReplyApiType] | undefined,
    date: "",
    openMenu: false,
    canLike: true,
    isEditing: false,
    newEditMessage: "",
    openReplyMenu: false,
    userInfo: undefined as ProfileApiType | undefined,
    publisherInfo: undefined as ProfileApiType | undefined,
    isLoaded: false,
  });

  const returnHome = () => {
    navigate("/home");
  };

  const visitProfile = () => {
    navigate(`/${state.postInfo?.user_at}/${state.postInfo?.user}/profile`);
  };

  const { postId, userId } = useParams();

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const [postsRes, repliesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/posts/${postId}`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),

          axios.get(`${API_BASE_URL}/replies/`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        setState((prev) => ({ ...prev, postInfo: postsRes.data }));
        setState((prev) => ({ ...prev, repliesInfo: repliesRes.data }));
      } finally {
        console.log("pronto");
      }
    };

    fetchReplies();
  }, [state.openReplyMenu]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const [userRes, postRes, repliesRes, publisherRes] = await Promise.all([
          axios.get(
            `${API_BASE_URL}/profiles/${localStorage.getItem("userId")}/`,
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          ),
          axios.get(`${API_BASE_URL}/posts/${postId}/`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
          axios.get(`${API_BASE_URL}/replies/`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
          axios.get(`${API_BASE_URL}/profiles/${Number(userId)}/`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        setState((prev) => ({ ...prev, userInfo: userRes.data }));
        setState((prev) => ({ ...prev, postInfo: postRes.data }));
        setState((prev) => ({ ...prev, repliesInfo: repliesRes.data }));
        setState((prev) => ({ ...prev, publisherInfo: publisherRes.data }));
        setState((prev) => ({ ...prev, isLoaded: true }));

        console.log(userRes.data);
      } catch (err) {
        console.log(err);
      } finally {
        if (state.postInfo) {
          const date = new Date(state.postInfo.created_at);
          const formatted = date.toLocaleDateString("pt-BR");
          setState((prev) => ({ ...prev, date: formatted }));
        }
      }
    };

    fetchInfo();
  }, []);

  const likePost = () => {
    const updatePost = async () => {
      if (state.postInfo && state.canLike && state.userInfo) {
        setState((prev) => ({ ...prev, canLike: false }));

        const isLiked = state.userInfo?.posts_liked.includes(state.postInfo.id);
        const updatedLikes = isLiked
          ? state.postInfo.likes - 1
          : state.postInfo.likes + 1;
        const updatedPostsLiked = isLiked
          ? state.userInfo.posts_liked.filter((id) => id !== state.postInfo?.id)
          : [...state.userInfo.posts_liked, state.postInfo.id];

        try {
          await Promise.all([
            axios.patch(
              `${API_BASE_URL}/posts/${postId}/`,
              { likes: updatedLikes },
              {
                headers: {
                  Authorization: `Token ${localStorage.getItem("token")}`,
                },
              }
            ),
            axios.patch(
              `${API_BASE_URL}/profiles/${state.userInfo.id}/`,
              { posts_liked: updatedPostsLiked },
              {
                headers: {
                  Authorization: `Token ${localStorage.getItem("token")}`,
                },
              }
            ),
          ]);

          const [postRes, publisherRes, userRes] = await Promise.all([
            axios.get(`${API_BASE_URL}/posts/${postId}`, {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }),
            axios.get(`${API_BASE_URL}/profiles/${userId}`, {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }),
            axios.get(`${API_BASE_URL}/profiles/${state.userInfo.id}`, {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }),
          ]);

          setState((prev) => ({ ...prev, postInfo: postRes.data }));
          setState((prev) => ({ ...prev, publisherInfo: publisherRes.data }));
          setState((prev) => ({ ...prev, userInfo: userRes.data }));
        } catch (err) {
          console.error("Erro ao atualizar likes:", err);
        } finally {
          setTimeout(
            () => setState((prev) => ({ ...prev, canLike: true })),
            200
          );
        }
      }
    };

    updatePost();
  };

  const openMenuEvent = () => {
    setState((prev) => ({ ...prev, openMenu: !prev.openMenu }));
  };

  const handleEditing = () => {
    setState((prev) => ({ ...prev, isEditing: !prev.isEditing }));
    setState((prev) => ({ ...prev, openMenu: false }));
  };

  const updatePost = async () => {
    if (state.newEditMessage) {
      try {
        const [postRes] = await Promise.all([
          axios.patch(
            `${API_BASE_URL}/posts/${postId}/`,
            {
              text: state.newEditMessage,
              post_edited: true,
            },
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          ),

          axios.get(`${API_BASE_URL}/posts/${postId}/`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        setState((prev) => ({ ...prev, isEditing: false }));
        setState((prev) => ({ ...prev, openMenu: false }));
        setState((prev) => ({ ...prev, postInfo: postRes.data }));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deletePost = async () => {
    try {
      await Promise.all([
        axios.delete(`${API_BASE_URL}/posts/${postId}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }),
      ]);
    } finally {
      setState((prev) => ({ ...prev, isEditing: false }));
      setState((prev) => ({ ...prev, openMenu: false }));

      navigate("/home");
    }
  };

  const openReplyMenuHandle = () => {
    const change = () => {
      setState((prev) => ({ ...prev, openReplyMenu: true }));
    };

    change();
  };

  return (
    <div>
      {state.isLoaded ? (
        <>
          {state.openReplyMenu && (
            <NewReply
              postId={postId}
              userId={userId}
              openReplyMenu={state.openReplyMenu}
              setOpenReplyMenu={(value: boolean) =>
                setState((prev) => ({ ...prev, openReplyMenu: value }))
              }
            />
          )}

          <S.Background>
            <LeftSide />

            <S.ScreenCancelButton
              style={{ display: state.openMenu ? "block" : "none" }}
              onClick={() => setState((prev) => ({ ...prev, openMenu: false }))}
            />

            <S.Wrapper>
              <S.Div>
                <S.ReturnHome>
                  <div
                    onClick={returnHome}
                    style={{ position: "absolute", marginLeft: "16px" }}
                  >
                    <img src="/arrow-left.svg" alt="Return arrow" />
                    <S.UserInteractHover
                      toppos={62}
                      hovercolor="255, 255, 255, 0.3"
                    />
                  </div>

                  <h1 style={{ marginLeft: "64px" }}>Post</h1>
                </S.ReturnHome>
                <S.Container>
                  <S.ProfileInfo>
                    <S.ProfilePicture
                      onClick={visitProfile}
                      src={state.publisherInfo?.profile}
                      alt="Profile Picture"
                    />
                    <div>
                      <S.OptionsDiv>
                        <S.UserName onClick={visitProfile}>
                          {state.postInfo?.username}
                        </S.UserName>
                        <S.EditedPost
                          style={{
                            display: state.postInfo?.post_edited
                              ? "block"
                              : "none",
                          }}
                        >
                          <span style={{ position: "absolute" }}>
                            (editado)
                          </span>
                        </S.EditedPost>
                        <S.OpenOptions
                          style={{
                            display:
                              Number(userId) === state.userInfo?.id
                                ? "block"
                                : "none",
                          }}
                          onClick={openMenuEvent}
                        >
                          <span>. . .</span>
                          <S.UserInteractHover
                            toppos={78}
                            leftpos={97.8}
                            hovercolor="29, 146, 227, 0.4"
                          />
                        </S.OpenOptions>
                        <S.SelectionMenu
                          style={{
                            display: state.openMenu ? "flex" : "none",
                          }}
                        >
                          <S.ActionsContainer>
                            <S.ActionDecorations
                              onClick={handleEditing}
                              style={{
                                backgroundColor: state.isEditing
                                  ? "rgba(255, 255, 255, 0.08)"
                                  : "",
                              }}
                            >
                              <S.ActionImage src="/pencil.svg" />
                              <S.ActionButton style={{ color: "#fff" }}>
                                Editar
                              </S.ActionButton>
                            </S.ActionDecorations>

                            <S.ActionDecorations>
                              <S.ActionImage src="/trash.svg" />
                              <S.ActionButton onClick={deletePost}>
                                Excluir
                              </S.ActionButton>
                            </S.ActionDecorations>
                          </S.ActionsContainer>
                        </S.SelectionMenu>
                      </S.OptionsDiv>
                      <S.UserAt onClick={visitProfile}>
                        @{state.postInfo?.user_at}
                      </S.UserAt>
                    </div>
                  </S.ProfileInfo>

                  <S.PostInfo>
                    <S.PostText
                      style={{ display: state.isEditing ? "none" : "block" }}
                    >
                      {state.postInfo?.text}
                    </S.PostText>
                    <S.EditedMessageInput
                      style={{ display: !state.isEditing ? "none" : "block" }}
                      maxLength={200}
                      placeholder="Nova mensagem"
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          newEditMessage: e.target.value,
                        }))
                      }
                      value={state.newEditMessage}
                    ></S.EditedMessageInput>
                    <S.ContinueButtonsContainer
                      style={{ display: state.isEditing ? "flex" : "none" }}
                    >
                      <S.ContinueButton onClick={updatePost}>
                        Salvar
                      </S.ContinueButton>
                      <S.ContinueButton
                        onClick={() =>
                          setState((prev) => ({ ...prev, isEditing: false }))
                        }
                      >
                        Cancelar
                      </S.ContinueButton>
                    </S.ContinueButtonsContainer>
                    <S.PostAttachment>
                      {state.postInfo?.attachment ? (
                        <img
                          style={{ marginTop: "4px" }}
                          loading="lazy"
                          src={state.postInfo?.attachment}
                          alt="Post Image"
                        />
                      ) : (
                        ""
                      )}
                      <S.TimePosted>{state.date}</S.TimePosted>
                      <S.PostInteract>
                        <S.PostUserInteract
                          onClick={openReplyMenuHandle}
                          hovercolor="29, 146, 227, 0.4"
                        >
                          <div style={{ position: "relative" }}>
                            <img src="/message.svg" alt="Post Comments" />
                            <S.UserInteractHover
                              toppos={62}
                              hovercolor="29, 146, 227, 0.4"
                            />
                          </div>
                          <span>{state.postInfo?.comments}</span>
                        </S.PostUserInteract>
                        <S.PostUserInteract hovercolor="249, 54, 128, 0.4">
                          {state.postInfo ? (
                            <div
                              onClick={likePost}
                              style={{ position: "relative" }}
                            >
                              <img
                                src={
                                  state.userInfo?.posts_liked.includes(
                                    Number(postId)
                                  )
                                    ? "/fullHeart.png"
                                    : "/heart.svg"
                                }
                                alt="Like Post"
                              />
                              <S.UserInteractHover
                                toppos={62}
                                hovercolor="249, 54, 128, 0.4"
                              />
                            </div>
                          ) : (
                            ""
                          )}
                          <span>{state.postInfo?.likes}</span>
                        </S.PostUserInteract>
                        <S.PostUserInteract hovercolor="0, 186, 124, 0.4">
                          <div style={{ position: "relative" }}>
                            <img src="/eye.svg" alt="Post Views" />
                            <S.UserInteractHover
                              toppos={62}
                              hovercolor="0, 186, 124, 0.4"
                            />
                          </div>
                          <span>{state.postInfo?.views}</span>
                        </S.PostUserInteract>
                        <S.PostUserInteract>
                          <div style={{ position: "relative" }}>
                            <img src="/bookmark.svg" alt="Save post" />
                            <S.UserInteractHover
                              toppos={62}
                              hovercolor="255, 249, 31, 0.6"
                            />
                          </div>
                        </S.PostUserInteract>
                      </S.PostInteract>
                    </S.PostAttachment>
                  </S.PostInfo>
                </S.Container>
                <S.Replies>
                  {state.repliesInfo && state.postInfo
                    ? state.repliesInfo.map((reply) => {
                        if (reply.post === Number(postId)) {
                          return (
                            <ul key={reply.id}>
                              <ReplyModel comment={reply} />
                            </ul>
                          );
                        }
                      })
                    : ""}
                </S.Replies>
              </S.Div>
            </S.Wrapper>
          </S.Background>
        </>
      ) : (
        <PageLoading />
      )}
    </div>
  );
}

export default ReadPost;
