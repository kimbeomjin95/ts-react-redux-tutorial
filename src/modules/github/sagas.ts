import {GET_USER_PROFILE, getUserProfileAsync} from './actions';
import {takeEvery} from 'redux-saga/effects';
import {getUserProfile} from '../../api/github';
import createAsyncSaga from '../../lib/createAsyncSaga';
// call: 특정함수 호출
// put: 특정액션 디스패치
// takeEvery: 특정 액션을 모니터링 하고 있다가 사전에 정의한 saga함수 호출

// function* getUserProfileSaga(
//   action: ReturnType<typeof getUserProfileAsync.request>,
// ) {
//   try {
//     const userProfile: GithubProfile = yield call(
//       getUserProfile,
//       action.payload,
//     ); // userProfile의 type을 선언해줘야 함
//     yield put(getUserProfileAsync.success(userProfile));
//   } catch (e) {
//     yield put(getUserProfileAsync.failure(e));
//   }
// }

const getUserProfileSaga = createAsyncSaga(getUserProfileAsync, getUserProfile);

export function* githubSaga() {
  yield takeEvery(GET_USER_PROFILE, getUserProfileSaga);
}

// TS환경에서 redux-saga를 사용할 때 action의 대한 타입을 가져 오기 위해 action: ReturnType<typeof getUserProfileAsync.request>
// 특정함수를 호출할 때 call을 사용하는데 결과물에 대한 타입은 직접 정해주어야 함 const userProfile: GithubProfile
