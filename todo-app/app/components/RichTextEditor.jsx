'use client';

import { useState, useEffect } from 'react';
import { 
  FiBold, 
  FiItalic, 
  FiUnderline, 
  FiAlignLeft, 
  FiAlignCenter, 
  FiAlignRight, 
  FiAlignJustify,
  FiList
} from 'react-icons/fi';

const RichTextEditor = ({ value, onChange }) => {
  const [content, setContent] = useState(value || '');

  useEffect(() => {
    setContent(value || '');
  }, [value]);

  const handleChange = (e) => {
    setContent(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  // These functions would normally apply formatting to selected text
  // in a real rich text editor. For this demo, they're placeholders.
  const handleBold = () => console.log('Bold');
  const handleItalic = () => console.log('Italic');
  const handleUnderline = () => console.log('Underline');
  const handleAlignLeft = () => console.log('Align Left');
  const handleAlignCenter = () => console.log('Align Center');
  const handleAlignRight = () => console.log('Align Right');
  const handleAlignJustify = () => console.log('Align Justify');
  const handleBulletList = () => console.log('Bullet List');
  const handleNumberedList = () => console.log('Numbered List');

  return (
    <div className="w-full">
      <div className="todo-editor-toolbar flex flex-wrap gap-1 mb-2 border-b pb-2">
        <button onClick={handleBold} title="Bold">
          <FiBold />
        </button>
        <button onClick={handleItalic} title="Italic">
          <FiItalic />
        </button>
        <button onClick={handleUnderline} title="Underline">
          <FiUnderline />
        </button>
        <span className="mx-2 border-r"></span>
        <button onClick={handleAlignLeft} title="Align Left">
          <FiAlignLeft />
        </button>
        <button onClick={handleAlignCenter} title="Align Center">
          <FiAlignCenter />
        </button>
        <button onClick={handleAlignRight} title="Align Right">
          <FiAlignRight />
        </button>
        <button onClick={handleAlignJustify} title="Justify">
          <FiAlignJustify />
        </button>
        <span className="mx-2 border-r"></span>
        <button onClick={handleBulletList} title="Bullet List">
          <FiList />
        </button>
        <button onClick={handleNumberedList} title="Numbered List">
          <FiList />
        </button>
      </div>
      <textarea
        value={content}
        onChange={handleChange}
        className="w-full min-h-[200px] p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Enter your description here..."
      ></textarea>
    </div>
  );
};

export default RichTextEditor;