import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GithubProfileInfo from '../components/GithubProfileInfo';
import GithubUsernameForm from '../components/GithubUsernameForm';
import { RootState } from '../modules';
import { getUserProfileThunk } from '../modules/github';

function GithubProfileLoader() {
  // 상태도 조회, dispatch
  const { data, loading, error } = useSelector(
    (state: RootState) => state.github.userProfile,
  );
  const dispatch = useDispatch();

  const onSubmitUsername = (username: string) => {
    dispatch(getUserProfileThunk(username));
  };

  // 조회
  return (
    <>
      <GithubUsernameForm onSubmitUsername={onSubmitUsername} />
      {loading && <p style={{ textAlign: 'center' }}>로딩중..</p>}
      {error && <p style={{ textAlign: 'center' }}>에러 발생..</p>}
      {data && (
        <GithubProfileInfo
          bio={data.bio} // 현재 내 데이터상으로는 bio가 null
          blog={data.blog}
          name={data.name}
          thumbnail={data.avatar_url}
        />
      )}
    </>
  );
}

export default GithubProfileLoader;
