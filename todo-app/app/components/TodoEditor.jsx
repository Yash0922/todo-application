'use client';

import { useState, useEffect } from 'react';
import { FiTrash2, FiArrowLeft } from 'react-icons/fi';
import RichTextEditor from './RichTextEditor';
import { formatDate } from '../utils/dateFormatter';

const TodoEditor = ({ todo, onUpdate, onDelete, onBack }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're in a mobile viewport on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Update local state when todo changes
  useEffect(() => {
    if (todo) {
      setTitle(todo.title || '');
      setDescription(todo.description || '');
      setError(null);
    }
  }, [todo]);

  // Auto-save when title or description changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (todo && (title !== todo.title || description !== todo.description)) {
        handleSave();
      }
    }, 1000); // Debounce for 1 second
    
    return () => clearTimeout(timeoutId);
  }, [title, description, todo]);

  // Handle saving changes
  const handleSave = async () => {
    if (!todo) return;
    
    try {
      setLoading(true);
      
      // Pass the updated data to the parent component
      if (onUpdate) {
        onUpdate({ title, description });
      }
    } catch (err) {
      setError('Failed to save changes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting todo
  const handleDelete = async () => {
    if (!todo) return;
    
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        setLoading(true);
        
        if (onDelete) {
          onDelete();
        }
      } catch (err) {
        setError('Failed to delete todo');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!todo) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Select a todo to edit</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col border border-gray-200 p-4 bg-white rounded-lg">
      <div className="flex items-center justify-between mb-4">
        {isMobile && (
          <button 
            onClick={onBack} 
            className="mr-4 text-gray-600 hover:text-gray-900 flex gap-1"
          >
            <FiArrowLeft size={24} />   <span className='font-bold text-xl'>Back</span>
          </button>
        )}
        
       
      </div>
      
      {error && <div className="mb-4 text-red-500">{error}</div>}
      
      <div className="flex items-center mb-4 ml-2">

     
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-xl font-bold mb-4 p-2 border-b focus:outline-none focus:border-primary"
        placeholder="Todo Title"
      />
       <button
          onClick={handleDelete}
          className="ml-auto text-gray-500 hover:text-red-600 mb-5"
          title="Delete todo"
        >
          <FiTrash2 size={20} />
        </button>
        </div>
      <div className="flex space-x-2 mb-4">
        {todo.updatedAt && (
          <span className="text-sm text-gray-500">
            {formatDate(todo.updatedAt)}
          </span>
        )}
      </div>
      
      <div className="flex-1">
        <RichTextEditor 
          value={description} 
          onChange={setDescription} 
        />
      </div>
      
      {loading && (
        <div className="mt-4 text-gray-500 text-center">Saving changes...</div>
      )}
    </div>
  );
};

export default TodoEditor;