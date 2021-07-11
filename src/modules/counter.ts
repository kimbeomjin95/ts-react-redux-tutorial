// Duck 패턴
// Actoin 정의
const INCREASE = 'counter/INCREASE' as const; // as const: increase함수의 type이 string이 아닌 실제값 counter/INCREASE를 보기 위한 설정
const DECREASE = 'counter/DECREASE' as const;
const INCREASE_BY = 'counter/INCREASE_BY' as const;

// Action 생성함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseBy = (diff: number) => ({
  type: INCREASE_BY,
  payload: diff, // FSA action -> payload(action의 모양새를 통일시킴으로써 개발의 편의성 증가)
});

// TS에서 reducer를 작성할 땐 state에 대한 type도 생성해야 함
type CountState = {
  count: number;
};

// 초기값
const initialState: CountState = {
  count: 0,
};

// TS에서 reducer를 작성할 땐 action에 대한 type도 생성해야 함
type CounterAction =
  | ReturnType<typeof increase> // ReturnType: 특정 함수의 결과물의 타입을 받아올 수 있음
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>;

function counter(
  state: CountState = initialState,
  action: CounterAction,
): CountState {
  switch (action.type) {
    case INCREASE:
      return {
        count: state.count + 1,
      };
    case DECREASE:
      return {
        count: state.count - 1,
      };
    case INCREASE_BY:
      return {
        count: state.count + action.payload,
      };
    default:
      return state;
  }
}

export default counter;
