// P: 파라미터, T: PromiseCreator에서 만든 promise에서 결과값의 타입
import {AsyncActionCreator, PayloadAction} from 'typesafe-actions';
import {call, put} from 'redux-saga/effects';

type PromiseCreatorFunction<P, T> =
  | ((payload: P) => Promise<T>)
  | (() => Promise<T>); // promiseCreator가 파라미터가 없는 경우도 작동할 수 있게 적용

// 타입 가드 문법
//
// action.payload가 undefined가 아니라면 파라미터로 받아온 action은 PayloadAction 타입을 의미
// PayloadAction<액션타입, payload>
function isPayloadAction(action: any): action is PayloadAction<string, any> {
  return action.payload !== undefined;
}

// P1: request action.payload - promiseCreator의 파라미터
// P2: success action.payload - promiseCreator의 결과값
// P3
export default function createAsyncSaga<T1, P1, T2, P2, T3, P3>(
  asyncActionCreator: AsyncActionCreator<[T1, P1], [T2, P2], [T3, P3]>,
  promiseCreator: PromiseCreatorFunction<P1, P2>,
) {
  return function* saga(action: ReturnType<typeof asyncActionCreator.request>) {
    try {
      const result: P2 = isPayloadAction(action) // action의 payload값에 따라 오류가 발생할 수 있으므로 타입 가드 문법 사용
        ? yield call(promiseCreator, action.payload)
        : yield call(promiseCreator);
      // 성공시
      yield put(asyncActionCreator.success(result));
    } catch (e) {
      yield put(asyncActionCreator.failure(e));
    }
  };
}
