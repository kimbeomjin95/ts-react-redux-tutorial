import {createReducer, createStandardAction,} from 'typesafe-actions';

// Duck 패턴

// typesafe-actions 생성함수
export const increase = createStandardAction('counter/INCREASE')();
export const decrease = createStandardAction('counter/DECREASE')();
export const increaseBy = createStandardAction('counter/INCREASE_BY')<number>(); // payload의 특정 값을 가지고 있다면 <generic> 설정 가능

// TS에서 reducer를 작성할 땐 state에 대한 type도 생성해야 함
type CountState = {
  count: number;
};

// 초기값
const initialState: CountState = {
  count: 0,
};

// typesafe-actions를 적용한 reducer
// <generic> 안에 reducer에서 사용할 state와 action 정의
// createReducer를 사용하면 reducer를 관리하는 각 action들에 대해서 업데이트 함수를 각각 만들어주는 방식으로 리듀서를 만들 수 있음
const counter = createReducer<CountState>(initialState)
  // 1. method 체이닝 방식 함수 작성
  // 장점: handleAction()에 action 생성 함수를 넣어줘도 됨
  .handleAction(increase, state => ({ count: state.count + 1 }))
  .handleAction(decrease, state => ({ count: state.count - 1 }))
  .handleAction(increaseBy, (state, action) => ({
    count: state.count + action.payload,
  }));

export default counter;
