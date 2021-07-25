import {ActionType, AsyncActionCreator, getType} from 'typesafe-actions';

export type AsyncState<T, E = any> = {
  loading: boolean;
  data: T | null;
  error: E | null;
};

// 유틸함수 객체 생성
export const asyncState = {
  initial: <T, E>(initialData?: T): AsyncState<T, E> => ({
    // 해당 함수의 리턴타입을 설정하기 위해서 파라미터 뒤에 : AsyncState<T, E> 리턴타입 정의
    loading: false,
    data: initialData || null,
    error: null,
  }),
  load: <T, E>(data?: T): AsyncState<T, E> => ({
    // asyncState.load(state.userProfile.data)를 사용한다면 data?: T || null 추가
    loading: true,
    data: data || null,
    error: null,
  }),
  success: <T, E>(data: T): AsyncState<T, E> => ({
    data: data,
    loading: false,
    error: null,
  }),
  error: <T, E>(error: E): AsyncState<T, E> => ({
    error,
    loading: false,
    data: null,
  }),
};

const state = {
  a: 1,
  b: 2,
  c: 3,
};

type key = keyof typeof state; // "a" | "b" | "c"
// reducer 분리
type AnyAsyncActionCreator = AsyncActionCreator<any, any, any>;

export function transformToArray<AC extends AnyAsyncActionCreator>(
  asyncActionCreator: AC,
) {
  const {request, success, failure} = asyncActionCreator;
  return [request, success, failure];
}

export function createAsyncReducer<S,
  AC extends AnyAsyncActionCreator,
  K extends keyof S,
  >(asyncActionCreator: AC, key: K) {
  // K extends keyof S: 상태가 가지고 있는 키를 상속
  return (state: S, action: ActionType<AC>) => {
    // action: AnyAction, action: any 모두 가능,
    const [request, success, failure] =
      transformToArray(asyncActionCreator).map(getType);

    switch (action.type) {
      case request:
        return {
          ...state,
          [key]: asyncState.load(), // userProfile이 key가 되는 것
        };
      case success:
        return {
          ...state,
          [key]: asyncState.success(action.payload),
        };
      case failure:
        return {
          ...state,
          [key]: asyncState.error(action.payload),
        };
      default:
        return state;
    }
  };
}
