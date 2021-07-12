import {
  ActionType,
  createAction,
  createReducer,
  createStandardAction,
} from 'typesafe-actions'; // createAction: ADD_TODO 액션 생성함수 만들 때 사용

// action 타입 정의
const ADD_TODO = 'todos/ADD_TODO' as const; // createAction을 사용하지 않으면 as const 필요
const TOGGLE_TODO = 'todos/TOGGLE_TODO';
const REMOVE_TODO = 'todos/REMOVE_TODO';

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

const actions = {
  addTodo,
  toggleTodo,
  removeTodo,
};

// action에 대한 type 생성
type TodosAction = ActionType<typeof actions>;

// 상태에서 사용할 할일 항목 데이터
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type TodosState = Todo[];

const initialState: TodosState = [];

const todos = createReducer<TodosState, TodosAction>(initialState, {
  // Object map
  [ADD_TODO]: (state, action) =>
    state.concat({
      ...action.payload,
      done: false,
    }),
  [TOGGLE_TODO]: (state, action) =>
    state.map(todo =>
      todo.id === action.payload ? { ...todo, done: !todo.done } : todo,
    ),
  [REMOVE_TODO]: (state, action) =>
    state.filter(todo => todo.id !== action.payload),
});

export default todos;
