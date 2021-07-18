import axios from 'axios';

// 프로필을 가져오는 api 함수
export async function getUserProfile(username: string) {
  // getUserProfile의 반환값이 promise이며 promise가 반환하는 값은 GithubProfile
  const response = await axios.get<GithubProfile>(
    `https://api.github.com/users/${username}`,
  );
  return response.data; // response.data의 타입이 any이므로 GithubProfile 타입을 설정하고 싶은 경우 get에 <제네릭> 설정
}

// api에서의 결과 타입
export type GithubProfile = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: null;
  blog: string;
  location: null;
  email: null;
  hireable: null;
  bio: null;
  twitter_username: null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
};
