export type PostApiType = {
  id: number;
  username: string;
  user_at: string;
  text: string;
  attachment: string;
  comments: number;
  likes: number;
  views: number;
  created_at: string;
  post_edited: boolean;
  user: number;
  profile: number;
};

export type ReplyApiType = {
  id: number;
  username: string;
  userat: string;
  text: string;
  user: number;
  profile: number;
  post: number;
};

export type ProfileApiType = {
  id: number;
  userat: string;
  username: string;
  profile: string;
  banner: string;
  created_at: string;
  following_ids: number[];
  followers_ids: number[];
  posts_liked: number[];
  posts_favourited: number[];
  posts_visited: number[];
  replies_liked: number[];
  posts_made: number;
  bio: string;
  user: number;
};
