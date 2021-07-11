import { combineReducers } from 'redux';
import counter from './counter';

// 리덕스 적용
const rootReducer = combineReducers({
  counter,
});

export default rootReducer;
// redux 스토어에서 관리하고 있는 모든 상태에 대한 타입 생성
export type RootState = ReturnType<typeof rootReducer>;
