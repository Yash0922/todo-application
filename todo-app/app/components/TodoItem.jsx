'use client';

import { formatShortDate } from '../utils/dateFormatter';

const TodoItem = ({ todo, isActive, onClick }) => {
  return (
    <div
      className={`todo-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold">{todo.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2 mt-1">{todo.description}</p>
      <div className="text-right mt-2">
        <span className="text-sm text-gray-500">
          {formatShortDate(todo.updatedAt || todo.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default TodoItem;