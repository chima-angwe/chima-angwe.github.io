import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBold,
  FaItalic,
  FaQuoteLeft,
  FaLink,
  FaImage,
  FaTimes,
  FaUndo,
  FaRedo,
} from 'react-icons/fa';
import './SimpleBlogEditor.css';

import { LuHeading1, LuHeading2 } from 'react-icons/lu';

const SimpleBlogEditor = ({ initialContent = '', onSave }) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState(initialContent);
  const [history, setHistory] = useState([initialContent]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isUpdatingFromHistory, setIsUpdatingFromHistory] = useState(false);
  const fileInputRef = useRef(null);

  // Initialize editor content on mount
  useEffect(() => {
    if (editorRef.current && initialContent) {
      editorRef.current.innerHTML = initialContent;
    }
  }, []);

  // Save to history - prevents infinite loops
  const saveToHistory = (newContent) => {
    if (newContent === content) return; // Don't save if nothing changed

    setContent(newContent);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newContent);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Handle undo
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setIsUpdatingFromHistory(true);
      setHistoryIndex(newIndex);
      setContent(history[newIndex]);

      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = history[newIndex];
        }
        setIsUpdatingFromHistory(false);
      }, 0);
    }
  };

  // Handle redo
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setIsUpdatingFromHistory(true);
      setHistoryIndex(newIndex);
      setContent(history[newIndex]);

      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = history[newIndex];
        }
        setIsUpdatingFromHistory(false);
      }, 0);
    }
  };

  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    // Delay to allow command to complete
    setTimeout(updateContent, 10);
  };

  const insertElement = (tag) => {
    const selection = window.getSelection();
    const selectedText = selection.toString() || 'Click to edit...';

    // Create the element with proper HTML
    let element = '';
    switch (tag) {
      case 'h1':
        element = `<h1>${selectedText}</h1>`;
        break;
      case 'h2':
        element = `<h2>${selectedText}</h2>`;
        break;
      case 'blockquote':
        element = `<blockquote>${selectedText}</blockquote>`;
        break;
      default:
        element = `<p>${selectedText}</p>`;
    }

    applyFormat('insertHTML', element);
  };

  const insertLink = () => {
    const url = prompt('Enter the URL:');
    if (url) {
      const selection = window.getSelection();
      const selectedText = selection.toString() || 'Link';
      applyFormat('createLink', url);
    }
  };

  const insertImageFromUrl = () => {
    const url = prompt('Enter the image URL:');
    if (url) {
      applyFormat('insertImage', url);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Create a FileReader to convert image to base64
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64Image = event.target.result;
        // Insert the image using base64
        applyFormat('insertImage', base64Image);
      };

      reader.onerror = () => {
        alert('Failed to read image file');
      };

      reader.readAsDataURL(file);
    } catch (error) {
      alert('Failed to upload image');
      console.error('Image upload error:', error);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const updateContent = () => {
    if (isUpdatingFromHistory) return; // Don't save while updating from history

    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      saveToHistory(newContent);
    }
  };

  const handleInput = () => {
    updateContent();
  };

  const handleKeyDown = (e) => {
    // Handle Tab key
    if (e.key === 'Tab') {
      e.preventDefault();
      applyFormat('insertHTML', '&nbsp;&nbsp;&nbsp;&nbsp;');
      return;
    }

    // Auto-save on Enter or Space - use setTimeout to let the character be inserted first
    if (e.key === 'Enter' || e.key === ' ') {
      setTimeout(updateContent, 10);
    }

    // Handle Ctrl+Z and Ctrl+Y for undo/redo
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'z') {
        e.preventDefault();
        handleUndo();
      } else if (e.key === 'y') {
        e.preventDefault();
        handleRedo();
      }
    }
  };

  const handleSave = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onSave(html);
    }
  };

  return (
    <div className="simple-blog-editor">
      {/* Toolbar */}
      <div className="editor-toolbar">
        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-btn"
            onClick={handleUndo}
            disabled={historyIndex === 0}
            title="Undo (Ctrl+Z)"
          >
            <FaUndo size={14} />
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={handleRedo}
            disabled={historyIndex === history.length - 1}
            title="Redo (Ctrl+Y)"
          >
            <FaRedo size={14} />
          </button>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => applyFormat('bold')}
            title="Bold (Ctrl+B)"
          >
            <FaBold size={14} />
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => applyFormat('italic')}
            title="Italic (Ctrl+I)"
          >
            <FaItalic size={14} />
          </button>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => insertElement('h1')}
            title="Heading 1 (Large)"
          >
            <LuHeading1 size={16} />
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => insertElement('h2')}
            title="Heading 2 (Small)"
          >
            <LuHeading2 size={14} />
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => insertElement('blockquote')}
            title="Quote"
          >
            <FaQuoteLeft size={14} />
          </button>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-btn"
            onClick={insertLink}
            title="Insert Link"
          >
            <FaLink size={14} />
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => fileInputRef.current?.click()}
            title="Upload Image from Computer"
          >
            <FaImage size={14} />
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={insertImageFromUrl}
            title="Insert Image from URL"
          >
            🔗📸
          </button>
        </div>

        {/* Hidden file input for image upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </div>

      {/* Editor Content Area */}
      <div
        ref={editorRef}
        className="editor-content"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
      />

      {/* Save Button */}
      <div className="editor-footer">
        <button type="button" className="save-btn" onClick={handleSave}>
          Save Content
        </button>
      </div>
    </div>
  );
};

export default SimpleBlogEditor;
