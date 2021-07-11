// TodoItem컴포넌트: 각 할일 항목에 대한 정보를 보여주고 함수도 가져와서 할일을 토글하거나 지울 수 있음

import React, { CSSProperties } from 'react';
import { Todo } from '../modules/todos';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
};

function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  const handleToggle = () => onToggle(todo.id);
  const handleRemove = () => onRemove(todo.id);

  // CSSProperties: element 아닌 곳에서 style 자동완성을 사용할 경우
  const textStyle: CSSProperties = {
    textDecoration: todo.done ? 'line-through' : 'none',
  };

  const removeStyle: CSSProperties = {
    color: 'red',
    marginLeft: 8,
  };

  return (
    <li>
      <span onClick={handleToggle} style={textStyle}>
        {todo.text}
      </span>
      <span onClick={handleRemove} style={removeStyle}>
        (X)
      </span>
    </li>
  );
}

export default TodoItem;
