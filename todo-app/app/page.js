'use client';

import { useState, useEffect } from 'react';
import Logo from './components/Logo';
import TodoList from './components/TodoList';
import TodoEditor from './components/TodoEditor';
import { fetchTodos, updateTodo, createTodo, deleteTodo } from './lib/api';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showEditor, setShowEditor] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Load todos from API
  const loadTodos = async () => {
    try {
      setLoading(true);
      const response = await fetchTodos(page);
      setTodos(response.todos);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError('Failed to load todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load and when page changes
  useEffect(() => {
    loadTodos();
  }, [page]);

  // Check if we're on mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // On mobile, hide editor initially if no todo is selected
      if (mobile && !selectedTodo) {
        setShowEditor(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [selectedTodo]);

  // Handle selecting a todo
  const handleSelectTodo = (todo) => {
    setSelectedTodo(todo);
    setShowEditor(true);
  };

  // Handle creating a new todo
  const handleCreateTodo = async () => {
    try {
      const newTodo = await createTodo({
        title: 'New Additions',
        description: 'To stay representative of framework & new example apps.'
      });
      
      // Update the todos array with the new todo
      setTodos([newTodo, ...todos]);
      
      // Select the new todo
      setSelectedTodo(newTodo);
      setShowEditor(true);
    } catch (err) {
      setError('Failed to create new todo');
      console.error(err);
    }
  };

  // Handle updating a todo
  const handleUpdateTodo = async (todoId, updatedData) => {
    try {
      const updatedTodo = await updateTodo(todoId, updatedData);
      
      // Update both the selected todo and the todos list
      setSelectedTodo(updatedTodo);
      
      // Update the todo in the list
      setTodos(todos.map(todo => 
        todo._id === updatedTodo._id ? updatedTodo : todo
      ));
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  // Handle deleting a todo
  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(todoId);
      
      // Remove the todo from the list
      setTodos(todos.filter(todo => todo._id !== todoId));
      
      // Clear the selected todo
      setSelectedTodo(null);
      
      if (isMobile) {
        setShowEditor(false);
      }
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleBack = () => {
    setShowEditor(false);
  };

  return (
    <main className="bg-[#f4f4f4]">
      {/* Header */}
      <header className="border-b p-6 bg-white">
        <div className="container mx-auto">
          <Logo />
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto bg-[#f4f4f4] min-h-screen">
        <div className="flex flex-col md:flex-row h-full">
          {/* Todo List (Sidebar) */}
          <div className={`sidebar w-full md:w-1/3 lg:w-1/4 p-6 ${
            isMobile && showEditor ? 'hidden' : 'block'
          }`}>
            <TodoList 
              todos={todos}
              loading={loading}
              error={error}
              page={page}
              totalPages={totalPages}
              selectedTodoId={selectedTodo?._id}
              onSelectTodo={handleSelectTodo}
              onCreateTodo={handleCreateTodo}
              onPageChange={handlePageChange}
            />
          </div>

          {/* Todo Editor (Main Area) */}
          <div className={`flex-1 p-6 ${
            isMobile && !showEditor ? 'hidden' : 'block'
          }`}>
            <TodoEditor 
              todo={selectedTodo}
              onUpdate={(updatedData) => handleUpdateTodo(selectedTodo._id, updatedData)}
              onDelete={() => handleDeleteTodo(selectedTodo._id)}
              onBack={handleBack}
            />
          </div>
        </div>
      </div>
    </main>
  );
}