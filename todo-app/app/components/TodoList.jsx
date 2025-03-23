'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiFolderPlus } from 'react-icons/fi';
import TodoItem from './TodoItem';
import SearchBar from './SearchBar';
import Image from 'next/image';

const TodoList = ({ 
  todos, 
  loading, 
  error, 
  page, 
  totalPages, 
  selectedTodoId, 
  onSelectTodo, 
  onCreateTodo, 
  onPageChange 
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  // Define the maximum items per page (should match the backend limit)
  const ITEMS_PER_PAGE = 10;

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults(null);
      setShowSearch(false);
      return;
    }

    // Filter todos based on search term
    const results = todos.filter(todo => 
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      todo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSearchResults(results);
    // Keep search bar open to show results
  };

  const toggleSearchBar = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearchResults(null);
    }
  };

  // Determine which todos to display
  const displayTodos = searchResults !== null ? searchResults : todos;
  
  // Calculate if pagination should show based on total todos or current number
  const shouldShowPagination = totalPages > 1 || todos.length >= ITEMS_PER_PAGE;

  if (loading && todos.length === 0) {
    return <div className="p-4">Loading todos...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button 
          onClick={onCreateTodo}
          className="btn-primary flex items-center gap-2"
        >
          <div className="relative w-5 h-5">
            <Image 
              src="/filePlus.svg" 
              alt="New Todo" 
              fill 
              sizes="20px"
              style={{objectFit: "contain"}}
            />
          </div>
          <span>TODO</span>
        </button>
        
        {showSearch ? (
          <div className="w-full max-w-xs ml-4">
            <SearchBar onSearch={handleSearch} />
          </div>
        ) : (
          <button 
            onClick={toggleSearchBar}
            className="bg-white p-4 rounded-lg shadow-sm"
          >
            <FiSearch size={20} />
          </button>
        )}
      </div>
      
      <div className="space-y-2 mt-6">
        {displayTodos.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            {searchResults !== null 
              ? "No todos match your search" 
              : "No todos yet. Create your first one!"}
          </div>
        ) : (
          displayTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              isActive={selectedTodoId === todo._id}
              onClick={() => onSelectTodo(todo)}
            />
          ))
        )}
      </div>
      
      {!searchResults && shouldShowPagination && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className={`px-3 py-1 rounded ${
              page === 1 ? 'bg-gray-200 text-gray-500' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            Previous
          </button>
          <span>
            Page {page} of {Math.max(totalPages, Math.ceil(todos.length / ITEMS_PER_PAGE))}
          </span>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages && todos.length % ITEMS_PER_PAGE !== 0}
            className={`px-3 py-1 rounded ${
              page === totalPages && todos.length % ITEMS_PER_PAGE !== 0
                ? 'bg-gray-200 text-gray-500'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;