// 단순히 props로 값을 받아와서 렌더링만 해주는 컴포넌트
import React from 'react';
import './GithubProfileInfo.css';

type GithubProfileInfoProps = {
  name: string;
  thumbnail: string;
  bio: string; // 자기소개
  blog: string;
};

function GithubProfileInfo({
  name,
  thumbnail,
  bio,
  blog,
}: GithubProfileInfoProps) {
  return (
    <div className="GithubProfileInfo">
      <div className="profile-head">
        <img src={thumbnail} alt="user thumbnail" />
        <div>{name}</div>
      </div>
      <p>{bio}</p>
      <div>{blog !== '' && <a href={blog}>블로그</a>}</div>
    </div>
  );
}

export default GithubProfileInfo;
