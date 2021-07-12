import {
  createStandardAction,
  ActionType,
  createReducer,
} from 'typesafe-actions';

// Duck 패턴
// Actoin 정의
const INCREASE = 'counter/INCREASE'; // as const: increase함수의 type이 string이 아닌 실제값 counter/INCREASE를 보기 위한 설정
const DECREASE = 'counter/DECREASE';
const INCREASE_BY = 'counter/INCREASE_BY';

// typesafe-actions 생성함수
export const increase = createStandardAction(INCREASE)();
export const decrease = createStandardAction(DECREASE)();
export const increaseBy = createStandardAction(INCREASE_BY)<number>(); // payload의 특정 값을 가지고 있다면 <generic> 설정 가능

// TS에서 reducer를 작성할 땐 state에 대한 type도 생성해야 함
type CountState = {
  count: number;
};

// 초기값
const initialState: CountState = {
  count: 0,
};

const actions = { increase, decrease, increaseBy };
// typesafe-actions(EmptyAction, PayloadAction)를 적용하여 action type 정의
type CounterAction = ActionType<typeof actions>; // TS에서 reducer를 작성할 땐 action에 대한 type도 생성해야 함

// typesafe-actions를 적용한 reducer
// <generic> 안에 reducer에서 사용할 state와 action 정의
// createReducer를 사용하면 reducer를 관리하는 각 action들에 대해서 업데이트 함수를 각각 만들어주는 방식으로 리듀서를 만들 수 있음
const counter = createReducer<CountState, CounterAction>(initialState, {
  // 1.Object map 함수 작성
  [INCREASE]: state => ({ count: state.count + 1 }),
  [DECREASE]: state => ({ count: state.count - 1 }),
  [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload }),
});

export default counter;
