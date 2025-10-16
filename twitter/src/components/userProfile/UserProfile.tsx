import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import LeftSide from "../leftSide/LeftSide";
import ReplyModel from "../reply/ReplyModel";
import Post from "../newPost/Post";
import EditProfile from "../editProfile/EditProfile";

import API_BASE_URL from "../../config/api";
import type { PostApiType, ProfileApiType, ReplyApiType } from "../../types";

import * as S from "./styles";
import PageLoading from "../loadingPage/LoadingPage";

function UserProfile() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    inPost: true,
    editOpen: false,
    posts: undefined as [PostApiType] | undefined,
    userInfo: undefined as ProfileApiType | undefined,
    loading: true,
    userReplies: undefined as [ReplyApiType] | undefined,
    ownerInfo: undefined as ProfileApiType | undefined,
  });

  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, postsRes, repliesRes, ownerRes] = await Promise.all([
          axios.get(
            `${API_BASE_URL}/profiles/${localStorage.getItem("userId")}/`,
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          ),
          axios.get(`${API_BASE_URL}/posts/`, {
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
        setState((prev) => ({ ...prev, posts: postsRes.data }));
        setState((prev) => ({ ...prev, userReplies: repliesRes.data }));
        setState((prev) => ({ ...prev, ownerInfo: ownerRes.data }));

        setInterval(() => {
          setState((prev) => ({ ...prev, loading: false }));
        }, 1000);
      } catch (err) {
        console.log("Erro ao carregar perfil", err);
      } finally {
        console.log("carregado");
      }
    };

    setState((prev) => ({ ...prev, loading: true }));
    fetchData();
  }, [userId]);

  useEffect(() => {
    if (!state.editOpen) {
      const fetchUpdatedInfo = async () => {
        try {
          const [userRes, ownerRes] = await Promise.all([
            axios.get(
              `${API_BASE_URL}/profiles/${localStorage.getItem("userId")}`,
              {
                headers: {
                  Authorization: `Token ${localStorage.getItem("token")}`,
                },
              }
            ),
            axios.get(`${API_BASE_URL}/profiles/${Number(userId)}`, {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }),
          ]);

          setState((prev) => ({ ...prev, userInfo: userRes.data }));
          setState((prev) => ({ ...prev, ownerInfo: ownerRes.data }));
        } finally {
          console.log("Pego dados atualizados");
        }
      };
      fetchUpdatedInfo();
    }
  }, [state.editOpen, userId]);

  const followUser = async () => {
    if (!state.userInfo || !state.ownerInfo) return;

    const isFollowing = state.userInfo.following_ids.includes(Number(userId));
    const updatedList = isFollowing
      ? state.userInfo.following_ids.filter((user) => user !== Number(userId))
      : [...state.userInfo.following_ids, Number(userId)];

    const updatedListOwner = isFollowing
      ? state.ownerInfo?.followers_ids.filter(
          (user) => user !== state.userInfo?.id
        )
      : [...state.ownerInfo.followers_ids, state.userInfo.id];

    try {
      await Promise.all([
        axios.patch(
          `${API_BASE_URL}/profiles/${localStorage.getItem("userId")}/`,
          {
            following_ids: updatedList,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        ),

        axios.patch(
          `${API_BASE_URL}/profiles/${Number(userId)}/`,
          {
            followers_ids: updatedListOwner,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        ),
      ]);

      const [userRes, ownerRes] = await Promise.all([
        axios.get(
          `${API_BASE_URL}/profiles/${localStorage.getItem("userId")}/`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        ),

        axios.get(`${API_BASE_URL}/profiles/${Number(userId)}`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }),
      ]);
      setState((prev) => ({ ...prev, userInfo: userRes.data }));
      setState((prev) => ({ ...prev, ownerInfo: ownerRes.data }));
    } catch (err) {
      console.error("Erro ao seguir/deixar de seguir", err);
    }
  };

  const handleClick = () => {
    if (state.userInfo?.id === Number(userId)) {
      setState((prev) => ({ ...prev, editOpen: true }));
    } else {
      followUser();
    }
  };

  const changeButtonText = () => {
    if (state.userInfo?.id === Number(userId)) {
      return "Editar perfil";
    } else if (
      state.userInfo?.id !== Number(userId) &&
      !state.userInfo?.following_ids.includes(Number(userId))
    ) {
      return "Seguir perfil";
    } else if (state.userInfo?.following_ids.includes(Number(userId))) {
      return "Seguindo perfil";
    }
  };

  const returnHome = () => {
    navigate("/home");
  };

  const postsStyle = {
    borderBottom: state.inPost ? "2px solid #1D90E0" : "2px solid #303336",
  };

  const mediaStyle = {
    borderBottom: !state.inPost ? "2px solid #1D90E0" : "2px solid #303336",
  };

  return (
    <S.Background>
      <LeftSide />
      {state.loading ? (
        <PageLoading />
      ) : (
        <>
          {" "}
          <S.Container>
            <S.ContainerDiv>
              <S.Header>
                <div>
                  <S.ReturnArrow onClick={returnHome}>
                    <img src="/arrow-left.svg" alt="Return Arrow" />
                    <S.UserInteractHover
                      toppos={60}
                      hovercolor="255, 255, 255, 0.3"
                    />
                  </S.ReturnArrow>
                  <S.UserInfos>
                    <S.Username>{state.ownerInfo?.username}</S.Username>
                    <S.PostCounter>
                      {state.ownerInfo?.posts_made} posts
                    </S.PostCounter>
                  </S.UserInfos>
                </div>
              </S.Header>
              <S.Wrapper>
                <S.ProfileBanner>
                  <div>
                    <img
                      src={
                        state.ownerInfo?.banner
                          ? state.ownerInfo?.banner
                          : "/dog.jpeg"
                      }
                      alt="Profile Banner"
                    />
                  </div>
                  <S.EditProfileButton onClick={() => handleClick()}>
                    {changeButtonText()}
                  </S.EditProfileButton>
                </S.ProfileBanner>
                <S.ProfilePicture>
                  <img
                    src={
                      state.ownerInfo?.profile
                        ? state.ownerInfo?.profile
                        : "/dog.jpeg"
                    }
                    alt="Profile Picture"
                  />
                </S.ProfilePicture>

                <S.ProfileInfos>
                  <S.Username>{state.ownerInfo?.username}</S.Username>
                  <S.ProfileAt>@{state.ownerInfo?.userat}</S.ProfileAt>
                  <S.Bio
                    style={{ display: state.ownerInfo?.bio ? "flex" : "none" }}
                  >
                    <span>{state.ownerInfo?.bio}</span>
                  </S.Bio>
                  <S.DateInfo
                    style={{ marginTop: !state.ownerInfo?.bio ? "8px" : "0" }}
                  >
                    <S.CalendarIcon src="/calendar.svg" />
                    <S.DateJoined>{state.ownerInfo?.created_at}</S.DateJoined>
                  </S.DateInfo>

                  <S.DateInfo>
                    <S.Follow>
                      <strong>{state.ownerInfo?.following_ids.length}</strong>{" "}
                      Seguindo
                    </S.Follow>
                    <S.Follow>
                      <strong>{state.ownerInfo?.followers_ids.length}</strong>{" "}
                      Seguidores
                    </S.Follow>
                  </S.DateInfo>
                </S.ProfileInfos>

                <S.SelectButtonDiv>
                  <S.SelectButton
                    onClick={() =>
                      setState((prev) => ({ ...prev, inPost: true }))
                    }
                    style={postsStyle}
                  >
                    Posts
                  </S.SelectButton>
                  <S.SelectButton
                    onClick={() =>
                      setState((prev) => ({ ...prev, inPost: false }))
                    }
                    style={mediaStyle}
                  >
                    Comentarios
                  </S.SelectButton>
                </S.SelectButtonDiv>

                {state.inPost && state.posts
                  ? state.posts.map((post) => {
                      if (post.user === Number(userId)) {
                        return (
                          <div key={post.id}>
                            <Post item={post}></Post>
                          </div>
                        );
                      }
                    })
                  : ""}

                {!state.inPost && state.userReplies
                  ? state.userReplies.map((reply) => {
                      if (reply.user === Number(userId)) {
                        return (
                          <div key={reply.id}>
                            <ReplyModel comment={reply}></ReplyModel>
                          </div>
                        );
                      }
                    })
                  : ""}
              </S.Wrapper>
            </S.ContainerDiv>

            <EditProfile
              isEditOpen={state.editOpen}
              setIsEditOpen={(value: boolean) =>
                setState((prev) => ({ ...prev, editOpen: value }))
              }
            />
          </S.Container>
        </>
      )}
    </S.Background>
  );
}

export default UserProfile;
