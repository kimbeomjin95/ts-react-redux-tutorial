import {Dispatch} from 'redux';
import {AsyncActionCreator} from 'typesafe-actions';

type AnyAsyncActionCreator = AsyncActionCreator<any, any, any>;
type AnyPromiseCreator = (...params: any[]) => Promise<any>; // 아무 파라미터를 가져와서 결과값이 promise인것을 의미

// extends를 사용하면 A타입을 받아오는데 이 타입은 어떤 타입도 될 수 있지만 AsyncActionCreator타입의 만족해야 하는 것을 의미
export default function createAsyncThunk<A extends AnyAsyncActionCreator,
  F extends AnyPromiseCreator,
  >(asyncActionCreator: A, promiseCreator: F) {
  type Params = Parameters<F>; // F라는 함수의 어떤 파라미터를 넣어야 하는지 미리 추출
  return function thunk(...params: Params) {
    return async (dispatch: Dispatch) => {
      const {request, success, failure} = asyncActionCreator;
      dispatch(request(undefined));
      try {
        const result = await promiseCreator(...params);
        dispatch(success(result));
      } catch (e) {
        dispatch(failure(e));
      }
    };
  };
}
