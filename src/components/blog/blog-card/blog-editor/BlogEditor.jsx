import React, { useState } from 'react';
import {
  FaHeading,
  FaImage,
  FaQuoteLeft,
  FaCode,
  FaList,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa';
import './BlogEditor.css';

const BlogEditor = ({ onSave, initialContent = [] }) => {
  const [blocks, setBlocks] = useState(initialContent || []);
  const [selectedBlockIndex, setSelectedBlockIndex] = useState(null);

  const addBlock = (type) => {
    const newBlock = {
      type,
      content: '',
      imageUrl: '',
      imageCaption: '',
      imageAlt: '',
      language: 'javascript',
      listItems: [],
      alignment: 'left',
      order: blocks.length,
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlockIndex(blocks.length);
  };

  const updateBlock = (index, updates) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = { ...updatedBlocks[index], ...updates };
    setBlocks(updatedBlocks);
  };

  const deleteBlock = (index) => {
    setBlocks(blocks.filter((_, i) => i !== index));
    if (selectedBlockIndex === index) {
      setSelectedBlockIndex(null);
    }
  };

  const moveBlock = (index, direction) => {
    const newBlocks = [...blocks];
    if (direction === 'up' && index > 0) {
      [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
      setSelectedBlockIndex(index - 1);
    } else if (direction === 'down' && index < blocks.length - 1) {
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
      setSelectedBlockIndex(index + 1);
    }
    setBlocks(newBlocks);
  };

  const handleListItemsChange = (index, items) => {
    updateBlock(index, { listItems: items });
  };

  const renderBlockEditor = (block, index) => {
    return (
      <div
        key={index}
        className={`editor-block ${selectedBlockIndex === index ? 'selected' : ''}`}
        onClick={() => setSelectedBlockIndex(index)}
      >
        <div className="editor-block-header">
          <span className="editor-block-type">{block.type}</span>
          <div className="editor-block-controls">
            <button
              className="editor-block-btn"
              onClick={() => moveBlock(index, 'up')}
              disabled={index === 0}
              title="Move up"
            >
              <FaArrowUp size={14} />
            </button>
            <button
              className="editor-block-btn"
              onClick={() => moveBlock(index, 'down')}
              disabled={index === blocks.length - 1}
              title="Move down"
            >
              <FaArrowDown size={14} />
            </button>
            <button
              className="editor-block-btn danger"
              onClick={() => deleteBlock(index)}
              title="Delete block"
            >
              <FaTrash size={14} />
            </button>
          </div>
        </div>

        <div className="editor-block-content">
          {(block.type === 'paragraph' ||
            block.type === 'heading1' ||
            block.type === 'heading2' ||
            block.type === 'heading3' ||
            block.type === 'quote') && (
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(index, { content: e.target.value })}
              placeholder={`Enter ${block.type} text...`}
              className="editor-textarea"
              rows={block.type === 'paragraph' ? 4 : 2}
            />
          )}

          {block.type === 'image' && (
            <>
              <input
                type="text"
                value={block.imageUrl}
                onChange={(e) => updateBlock(index, { imageUrl: e.target.value })}
                placeholder="Image URL..."
                className="editor-input"
              />
              <input
                type="text"
                value={block.imageAlt}
                onChange={(e) => updateBlock(index, { imageAlt: e.target.value })}
                placeholder="Alt text (for accessibility)..."
                className="editor-input"
              />
              <textarea
                value={block.imageCaption}
                onChange={(e) => updateBlock(index, { imageCaption: e.target.value })}
                placeholder="Image caption (optional)..."
                className="editor-textarea"
                rows={2}
              />
              <div className="editor-alignment">
                <label>
                  <input
                    type="radio"
                    name={`alignment-${index}`}
                    value="left"
                    checked={block.alignment === 'left'}
                    onChange={() => updateBlock(index, { alignment: 'left' })}
                  />
                  Left
                </label>
                <label>
                  <input
                    type="radio"
                    name={`alignment-${index}`}
                    value="center"
                    checked={block.alignment === 'center'}
                    onChange={() => updateBlock(index, { alignment: 'center' })}
                  />
                  Center
                </label>
                <label>
                  <input
                    type="radio"
                    name={`alignment-${index}`}
                    value="right"
                    checked={block.alignment === 'right'}
                    onChange={() => updateBlock(index, { alignment: 'right' })}
                  />
                  Right
                </label>
              </div>
              {block.imageUrl && (
                <div className="editor-image-preview">
                  <img src={block.imageUrl} alt="Preview" />
                </div>
              )}
            </>
          )}

          {block.type === 'code' && (
            <>
              <select
                value={block.language}
                onChange={(e) => updateBlock(index, { language: e.target.value })}
                className="editor-select"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="json">JSON</option>
                <option value="jsx">JSX</option>
                <option value="sql">SQL</option>
                <option value="bash">Bash</option>
              </select>
              <textarea
                value={block.content}
                onChange={(e) => updateBlock(index, { content: e.target.value })}
                placeholder="Enter code..."
                className="editor-textarea code"
                rows={6}
                spellCheck="false"
              />
            </>
          )}

          {block.type === 'list' && (
            <ListItemsEditor
              items={block.listItems}
              onChange={(items) => handleListItemsChange(index, items)}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="blog-editor">
      <div className="editor-toolbar">
        <h3 className="editor-toolbar-title">Add Content Blocks</h3>
        <div className="editor-toolbar-buttons">
          <button
            className="editor-toolbar-btn"
            onClick={() => addBlock('paragraph')}
            title="Add paragraph"
          >
            P
          </button>
          <button
            className="editor-toolbar-btn"
            onClick={() => addBlock('heading2')}
            title="Add heading"
          >
            <FaHeading size={14} />
          </button>
          <button
            className="editor-toolbar-btn"
            onClick={() => addBlock('image')}
            title="Add image"
          >
            <FaImage size={14} />
          </button>
          <button
            className="editor-toolbar-btn"
            onClick={() => addBlock('quote')}
            title="Add quote"
          >
            <FaQuoteLeft size={14} />
          </button>
          <button
            className="editor-toolbar-btn"
            onClick={() => addBlock('code')}
            title="Add code block"
          >
            <FaCode size={14} />
          </button>
          <button
            className="editor-toolbar-btn"
            onClick={() => addBlock('list')}
            title="Add list"
          >
            <FaList size={14} />
          </button>
        </div>
      </div>

      <div className="editor-blocks">
        {blocks.length === 0 ? (
          <div className="editor-empty">
            <p>No content blocks yet. Click the buttons above to add content.</p>
          </div>
        ) : (
          blocks.map((block, index) => renderBlockEditor(block, index))
        )}
      </div>

      <button
        className="editor-save-btn"
        onClick={() => onSave(blocks)}
        disabled={blocks.length === 0}
      >
        Save Content
      </button>
    </div>
  );
};

const ListItemsEditor = ({ items, onChange }) => {
  const handleItemChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index] = value;
    onChange(updatedItems);
  };

  const addItem = () => {
    onChange([...items, '']);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="list-items-editor">
      {items.map((item, index) => (
        <div key={index} className="list-item-input-group">
          <input
            type="text"
            value={item}
            onChange={(e) => handleItemChange(index, e.target.value)}
            placeholder={`List item ${index + 1}...`}
            className="editor-input"
          />
          <button
            className="editor-block-btn danger"
            onClick={() => removeItem(index)}
            title="Remove item"
          >
            <FaTrash size={12} />
          </button>
        </div>
      ))}
      <button className="editor-add-item-btn" onClick={addItem}>
        + Add Item
      </button>
    </div>
  );
};

export default BlogEditor;