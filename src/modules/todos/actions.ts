import { createStandardAction } from 'typesafe-actions';

// action 타입 정의
export const ADD_TODO = 'todos/ADD_TODO' as const; // createAction을 사용하지 않으면 as const 필요
export const TOGGLE_TODO = 'todos/TOGGLE_TODO';
export const REMOVE_TODO = 'todos/REMOVE_TODO';

// 새로운 항목 추가 시 unique id
let nextId = 1;

// 액션 생성 함수
// createStandardAction가 아닌 createAction 선언, 왜냐하면 nextId는 파라미터로 받는 값이 아니기 때문에
export const addTodo = (text: string) => ({
  type: ADD_TODO,
  payload: {
    id: nextId++,
    text,
  },
});

export const toggleTodo = createStandardAction(TOGGLE_TODO)<number>();
export const removeTodo = createStandardAction(REMOVE_TODO)<number>();
