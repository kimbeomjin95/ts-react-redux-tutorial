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
/*
TS 환경에서 리덕스 미들웨어를 사용해서 비동기 작업을 했지만 
매번 API 요청할 때 Thunk 만들기가 번거로우므로 Promise를 기반하여 비동기 작업을 하는 유틸함수를 생성
추가적으로 리듀서에서도 비동기작업을 할 때 초기값, 로딩, 성공, 실패들의 상태를 만들어야 하는데 이를 리팩토링하여 좀 더 쉽게 리듀서를 구현 할 것
*/
