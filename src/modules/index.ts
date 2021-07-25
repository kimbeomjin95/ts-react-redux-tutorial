import {combineReducers} from 'redux';
import counter from './counter';
import github, {githubSaga} from './github';
import todos from './todos';
import {all} from 'redux-saga/effects';

// 리덕스 적용
const rootReducer = combineReducers({
  counter,
  todos,
  github,
});

export default rootReducer;
// redux 스토어에서 관리하고 있는 모든 상태에 대한 타입 생성
// rootReducer에 어떤 reducer가 들어있는지에 따라서 자동으로 리턴타입이 나타나는 것
export type RootState = ReturnType<typeof rootReducer>;

// rootsaga 생성
export function* rootSaga() {
  yield all([githubSaga()]);
}
