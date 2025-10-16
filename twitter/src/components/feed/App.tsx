import { useEffect, useState } from "react";
import axios from "axios";

import CreateNewPost from "../createNewPost/NewPost";
import Post from "../newPost/Post";
import LeftSide from "../leftSide/LeftSide";

import API_BASE_URL from "../../config/api";

import type { PostApiType, ProfileApiType } from "../../types";

import * as S from "./styles";
import PageLoading from "../loadingPage/LoadingPage";

function App() {
  const [state, setState] = useState({
    isForYou: true,
    posts: undefined as [PostApiType] | undefined,
    userInfo: undefined as ProfileApiType | undefined,
    isLoaded: false,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [userRes, postsRes] = await Promise.all([
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
        ]);

        setState((prev) => ({ ...prev, userInfo: userRes.data }));
        setState((prev) => ({ ...prev, posts: postsRes.data }));
      } catch (err) {
        console.log("Erro ao pegar informacoes", err);
      } finally {
        setInterval(() => {
          setState((prev) => ({ ...prev, isLoaded: true }));
        }, 1000);
      }
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, 2300);
    return () => clearInterval(interval);
  }, []);

  const forYouStyle = {
    borderBottom: state.isForYou ? "2px solid #1d90e0" : "1px solid #303336",
    color: state.isForYou ? "#fff" : "rgba(255, 255, 255, 0.5)",
  };

  const followingStyle = {
    borderBottom: !state.isForYou ? "2px solid #1d90e0" : "1px solid #303336",
    color: !state.isForYou ? "#fff" : "rgba(255, 255, 255, 0.5)",
  };

  return (
    <S.Container>
      <LeftSide />
      <S.FeedPosts>
        <S.ChangeFeed>
          <S.SelectedFeed
            onClick={() => setState((prev) => ({ ...prev, isForYou: true }))}
            style={forYouStyle}
          >
            Para você
          </S.SelectedFeed>
          <S.SelectedFeed
            onClick={() => setState((prev) => ({ ...prev, isForYou: true }))}
            style={followingStyle}
          >
            Seguindo
          </S.SelectedFeed>
        </S.ChangeFeed>

        <CreateNewPost />

        {state.isLoaded ? (
          <>
            {state.isForYou && state.posts
              ? state.posts.map((item) => (
                  <li key={item.id}>
                    <Post item={item} />
                  </li>
                ))
              : state.posts?.map((item) => {
                  if (state.userInfo?.following_ids.includes(item.user))
                    return (
                      <li key={item.id}>
                        <Post item={item} />
                      </li>
                    );
                })}
          </>
        ) : (
          <PageLoading />
        )}
      </S.FeedPosts>
    </S.Container>
  );
}

export default App;
