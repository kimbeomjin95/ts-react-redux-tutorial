// github에 관련된 리덕스 코드 작성
// Thunk 함수를 작성하는데 해당 Thunk 함수에서 dispatch할 action을 작성(요청시작, 성공, 실패)

import {AxiosError} from 'axios'; // AxiosError: axios에서 error가 발생했을 때 사용하는 error 객체 타입
// createAsyncAction: 비동기 작업에 관한 action들을 선언할 때 더 쉽게 만들수 있게 해주는 유틸 함수, createStandardAction대체
import {createAsyncAction} from 'typesafe-actions';
import {GithubProfile} from '../../api/github';

// 액션타입 선언
export const GET_USER_PROFILE = 'github/GET_USER_PROFILE';
export const GET_USER_PROFILE_SUCCESS = 'github/GET_USER_PROFILE_SUCCESS';
export const GET_USER_PROFILE_ERROR = 'github/GET_USER_PROFILE_ERROR';

// 선언한 액션타입 넣기
export const getUserProfileAsync = createAsyncAction(
  GET_USER_PROFILE, // request
  GET_USER_PROFILE_SUCCESS, // success
  GET_USER_PROFILE_ERROR, // failure
)<string, GithubProfile, AxiosError>(); // <>으로 각 액션들의 payload 타입을 순서대로 넣어주면 됨, 마지막에 호출()

// // 액션 생성 함수
// export const getUserProfile = createStandardAction(GET_USER_PROFILE)();
// export const getUserProfileSuccess = createStandardAction(
//   GET_USER_PROFILE_SUCCESS,
// )<GithubProfile>(); // payload는 GithubProfile 설정
// export const getUserProfileError = createStandardAction(
//   GET_USER_PROFILE_ERROR,
// )<AxiosError>(); // payload 타입은 AxiosError 설정
