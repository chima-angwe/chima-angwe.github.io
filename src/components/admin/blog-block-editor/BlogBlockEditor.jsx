import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHeading,
  FaImage,
  FaQuoteLeft,
  FaCode,
  FaList,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
  FaEdit,
} from 'react-icons/fa';
import './BlogBlockEditor.css';

const BlogBlockEditor = ({ onSave, initialContent = [] }) => {
  const [blocks, setBlocks] = useState(initialContent || []);
  const [selectedBlockIndex, setSelectedBlockIndex] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

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

  const handleSave = () => {
    onSave(blocks);
  };

  const getBlockPreview = (block) => {
    switch (block.type) {
      case 'paragraph':
        return block.content.substring(0, 50) + (block.content.length > 50 ? '...' : '');
      case 'heading1':
      case 'heading2':
      case 'heading3':
        return `${block.type}: ${block.content.substring(0, 40)}`;
      case 'image':
        return `Image: ${block.imageCaption || block.imageAlt || 'No caption'}`;
      case 'quote':
        return `"${block.content.substring(0, 40)}..."`;
      case 'code':
        return `Code (${block.language}): ${block.content.substring(0, 30)}...`;
      case 'list':
        return `List: ${block.listItems.length} items`;
      default:
        return 'Unknown block';
    }
  };

  const BlockEditor = ({ block, index }) => {
    return (
      <div
        className={`editor-block ${selectedBlockIndex === index ? 'selected' : ''}`}
        onClick={() => setSelectedBlockIndex(index)}
      >
        <div className="editor-block-header">
          <div className="block-info">
            <span className="block-type-badge">{block.type}</span>
            <span className="block-preview">{getBlockPreview(block)}</span>
          </div>
          <div className="block-actions">
            <button
              className="block-btn"
              onClick={(e) => {
                e.stopPropagation();
                moveBlock(index, 'up');
              }}
              disabled={index === 0}
              title="Move up"
            >
              <FaArrowUp size={12} />
            </button>
            <button
              className="block-btn"
              onClick={(e) => {
                e.stopPropagation();
                moveBlock(index, 'down');
              }}
              disabled={index === blocks.length - 1}
              title="Move down"
            >
              <FaArrowDown size={12} />
            </button>
            <button
              className="block-btn danger"
              onClick={(e) => {
                e.stopPropagation();
                deleteBlock(index);
              }}
              title="Delete"
            >
              <FaTrash size={12} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {selectedBlockIndex === index && (
            <motion.div
              className="editor-block-content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderBlockEditor(block, index)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderBlockEditor = (block, index) => {
    return (
      <div className="block-editor-form">
        {(block.type === 'paragraph' ||
          block.type === 'heading1' ||
          block.type === 'heading2' ||
          block.type === 'heading3' ||
          block.type === 'quote') && (
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(index, { content: e.target.value })}
            placeholder={`Enter ${block.type} text...`}
            className="editor-input"
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
              placeholder="Alt text..."
              className="editor-input"
            />
            <textarea
              value={block.imageCaption}
              onChange={(e) => updateBlock(index, { imageCaption: e.target.value })}
              placeholder="Caption (optional)..."
              className="editor-input"
              rows={2}
            />
            <div className="alignment-options">
              {['left', 'center', 'right'].map(align => (
                <label key={align} className="align-option">
                  <input
                    type="radio"
                    name={`align-${index}`}
                    value={align}
                    checked={block.alignment === align}
                    onChange={() => updateBlock(index, { alignment: align })}
                  />
                  {align.charAt(0).toUpperCase() + align.slice(1)}
                </label>
              ))}
            </div>
            {block.imageUrl && (
              <div className="image-thumb">
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
              <option value="jsx">JSX</option>
              <option value="bash">Bash</option>
            </select>
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(index, { content: e.target.value })}
              placeholder="Paste code here..."
              className="editor-input code"
              rows={5}
              spellCheck="false"
            />
          </>
        )}

        {block.type === 'list' && (
          <div className="list-editor">
            {block.listItems.map((item, itemIndex) => (
              <div key={itemIndex} className="list-item">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newItems = [...block.listItems];
                    newItems[itemIndex] = e.target.value;
                    updateBlock(index, { listItems: newItems });
                  }}
                  placeholder={`Item ${itemIndex + 1}`}
                  className="editor-input"
                />
                <button
                  className="item-delete"
                  onClick={() => {
                    const newItems = block.listItems.filter((_, i) => i !== itemIndex);
                    updateBlock(index, { listItems: newItems });
                  }}
                  type="button"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              className="add-item-btn"
              onClick={() => updateBlock(index, { listItems: [...block.listItems, ''] })}
              type="button"
            >
              + Add Item
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="blog-block-editor">
      {/* Toolbar */}
      <div className="editor-toolbar">
        <div className="toolbar-buttons">
          <button
            className="add-block-btn"
            onClick={() => addBlock('paragraph')}
            title="Add paragraph"
          >
            P
          </button>
          <button
            className="add-block-btn"
            onClick={() => addBlock('heading2')}
            title="Add heading"
          >
            <FaHeading size={12} />
          </button>
          <button
            className="add-block-btn"
            onClick={() => addBlock('image')}
            title="Add image"
          >
            <FaImage size={12} />
          </button>
          <button
            className="add-block-btn"
            onClick={() => addBlock('quote')}
            title="Add quote"
          >
            <FaQuoteLeft size={12} />
          </button>
          <button
            className="add-block-btn"
            onClick={() => addBlock('code')}
            title="Add code"
          >
            <FaCode size={12} />
          </button>
          <button
            className="add-block-btn"
            onClick={() => addBlock('list')}
            title="Add list"
          >
            <FaList size={12} />
          </button>
        </div>
      </div>

      {/* Blocks List */}
      <div className="editor-blocks">
        {blocks.length === 0 ? (
          <div className="empty-state">
            <FaEdit size={24} />
            <p>No content blocks yet. Click the buttons above to start building your post.</p>
          </div>
        ) : (
          <motion.div layout className="blocks-list">
            {blocks.map((block, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <BlockEditor block={block} index={index} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Actions */}
      {blocks.length > 0 && (
        <div className="editor-footer">
          <button
            className="preview-toggle"
            onClick={() => setShowPreview(!showPreview)}
            type="button"
          >
            {showPreview ? '✎ Edit' : '👁 Preview'}
          </button>
          <button
            className="save-btn"
            onClick={handleSave}
            type="button"
          >
            ✓ Save Blocks
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogBlockEditor;