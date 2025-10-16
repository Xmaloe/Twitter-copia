import { useNavigate } from "react-router-dom";
import axios from "axios";

import API_BASE_URL from "../../config/api";

import type { PostApiType, ProfileApiType } from "../../types";

import * as S from "./styles";
import { useEffect, useState } from "react";

type PostApi = {
  item: PostApiType;
};

function Post({ item }: PostApi) {
  const navigate = useNavigate();

  const [state, setState] = useState({
    publisherInfo: undefined as ProfileApiType | undefined,
    userInfo: undefined as ProfileApiType | undefined,
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const [publisherRes, userRes] = await Promise.all([
          axios.get(`${API_BASE_URL}profiles/${item.profile}/`, {
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

        setState((prev) => ({ ...prev, publisherInfo: publisherRes.data }));
        setState((prev) => ({ ...prev, userInfo: userRes.data }));
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserInfo();
  }, []);

  const addViewToPost = async () => {
    if (
      state.publisherInfo &&
      !state.publisherInfo.posts_visited.includes(item.id)
    ) {
      const updatedList = [...state.publisherInfo.posts_visited, item.id];

      try {
        await Promise.all([
          axios.patch(
            `${API_BASE_URL}posts/${item.id}/`,
            {
              views: item.views + 1,
            },
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          ),

          axios.patch(
            `${API_BASE_URL}profiles/${state.publisherInfo.id}/`,
            {
              posts_visited: updatedList,
            },
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          ),
        ]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const OpenPost = () => {
    navigate(`/${item.user_at}/status/${item.user}/${item.id}`);

    addViewToPost();
  };

  return (
    <>
      <S.Container onClick={OpenPost}>
        <S.ProfileInfo>
          <S.ProfilePicture
            src={state.publisherInfo?.profile}
            alt="Profile Picture"
          />
          <div style={{ position: "relative" }}>
            <S.UserName>{item.username}</S.UserName>
            <S.EditedPost
              style={{ display: item.post_edited ? "block" : "none" }}
            >
              <span style={{ position: "absolute" }}>(editado)</span>
            </S.EditedPost>
            <S.OpenOptions
              style={{
                display:
                  state.userInfo?.id === state.publisherInfo?.id
                    ? "block"
                    : "none",
              }}
            >
              . . .
            </S.OpenOptions>
          </div>
        </S.ProfileInfo>

        <S.PostInfo>
          <S.PostText>{item.text}</S.PostText>
          <S.PostAttachment>
            {item.attachment ? (
              <img
                style={{ marginTop: "4px" }}
                loading="lazy"
                src={item.attachment}
                alt="Post Image"
              />
            ) : (
              ""
            )}

            <S.PostInteract>
              <S.PostUserInteract hovercolor="29, 146, 227, 0.4">
                <div style={{ position: "relative" }}>
                  <img src="/message.svg" alt="Post Comments" />
                </div>
                <span>{item.comments}</span>
              </S.PostUserInteract>
              <S.PostUserInteract hovercolor="249, 54, 128, 0.4">
                <div style={{ position: "relative" }}>
                  <img
                    src={
                      state.userInfo?.posts_liked.includes(item.id)
                        ? "/fullHeart.png"
                        : "/heart.svg"
                    }
                    alt="Like Post"
                  />
                </div>
                <span>{item.likes}</span>
              </S.PostUserInteract>
              <S.PostUserInteract hovercolor="0, 186, 124, 0.4">
                <div style={{ position: "relative" }}>
                  <img src="/eye.svg" alt="Post Views" />
                </div>
                <span>{item.views}</span>
              </S.PostUserInteract>
              <S.PostUserInteract>
                <div style={{ position: "relative" }}>
                  <img src="/bookmark.svg" alt="Save post" />
                </div>
              </S.PostUserInteract>
            </S.PostInteract>
          </S.PostAttachment>
        </S.PostInfo>
      </S.Container>
    </>
  );
}

export default Post;
