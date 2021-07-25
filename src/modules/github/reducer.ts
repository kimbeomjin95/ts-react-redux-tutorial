import {createReducer} from 'typesafe-actions';
import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_ERROR,
  GET_USER_PROFILE_SUCCESS, getUserProfileAsync,
} from './actions';
import {GithubAction, GithubState} from './types';
import {asyncState, createAsyncReducer, transformToArray} from "../../lib/reducerUtils";

const initialState: GithubState = {
  userProfile: asyncState.initial()
};

const github = createReducer<GithubState, GithubAction>(
  initialState)
  // @ts-ignore
  .handleAction(transformToArray(getUserProfileAsync), createAsyncReducer(getUserProfileAsync, 'userProfile'));
// 상태 업데이트
//   [GET_USER_PROFILE]: state => ({
//     ...state,
//     userProfile: asyncState.load() // 만약 로딩을 할 때 기존 데이터를 유지하고 싶다면 asyncState.load(state.userProfile.data)
//   }),
//   [GET_USER_PROFILE_SUCCESS]: (state, action) => ({f
//     ...state,
//     userProfile: asyncState.success(action.payload)
//   }),l
// //   [GET_USER_PROFILE_ERROR]: (state, action) => ({
// //     ...state,
// //     userProfile: asyncState.error(action.payoad)
//   }),
// });


export default github;
