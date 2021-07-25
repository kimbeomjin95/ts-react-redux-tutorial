import { Dispatch } from 'redux';
import { getUserProfile, GithubProfile } from '../../api/github';
import { getUserProfileAsync } from './actions';

// ThunkAction<R, S, E, A>
// R: return type(thunk함수에서 리턴하는 타입)
// S: state(상태), RootState
// E: withExtraArgument
// A: 액션들의 타입
// export function getUserProfileThunk(username: string): ThunkAction<void, RootState, null, GithubProfile> { // getUserProfileThunk의 결과값이 ThunkAction

// velopert 선호(thunk 함수)
// export function getUserProfileThunk(username: string) {
//   return async (dispatch: Dispatch) => {
//     const { request, success, failure } = getUserProfileAsync;
//     dispatch(request());
//     try {
//       const userProfile = await getUserProfile(username);
//       dispatch(success(userProfile));
//     } catch (e) {
//       dispatch(failure(e));
//     }
//   };
// }
