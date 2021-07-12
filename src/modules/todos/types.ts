import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

// 해당 리덕스 모듈에 필요한 type들을 생성
export type TodosAction = ActionType<typeof actions>; // action 객체들에 대한 타입이 모아짐

// 상태에서 사용할 할일 항목 데이터
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export type TodosState = Todo[];
