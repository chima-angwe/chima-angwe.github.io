import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { createBlogPost, updateBlogPost } from '../../../services/blogService';
import { uploadImage } from '../../../services/uploadService';
import Input from '../../common/input/Input';
import Textarea from '../../common/textarea/Textarea';
import Button from '../../common/button/Button';
import BlogBlockEditor from '../blog-block-editor/BlogBlockEditor';
import { BLOG_CATEGORIES } from '../../../utils/constants';
import './BlogFormModal.css';

const BlogFormModal = ({ post, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [contentBlocks, setContentBlocks] = useState(post?.contentBlocks || []);
  const [useRichEditor, setUseRichEditor] = useState(!!post?.contentBlocks?.length);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    content: true,
    settings: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: post || {
      title: '',
      excerpt: '',
      content: '',
      contentBlocks: [],
      featuredImage: '',
      featuredImageAlt: '',
      category: 'Tech',
      tags: '',
      published: true,
    },
  });

  const featuredImage = watch('featuredImage');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const result = await uploadImage(file);
      setValue('featuredImage', result.url);
    } catch (error) {
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveContent = (blocks) => {
    setContentBlocks(blocks);
    // Auto-expand content section when blocks are saved
    setExpandedSections(prev => ({ ...prev, content: true }));
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');

      if (!data.featuredImage) {
        setSubmitError('Please upload or provide a featured image');
        return;
      }

      if (useRichEditor && contentBlocks.length === 0) {
        setSubmitError('Please add at least one content block');
        return;
      }

      const formattedData = {
        ...data,
        contentBlocks: useRichEditor ? contentBlocks : [],
        content: !useRichEditor ? data.content : '',
        tags: data.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        featuredImageAlt: data.featuredImageAlt || '',
      };

      if (post) {
        await updateBlogPost(post._id, formattedData);
      } else {
        await createBlogPost(formattedData);
      }

      onClose();
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Failed to save post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ContentBlocksStatus = () => {
    if (!useRichEditor) return null;
    return (
      <motion.div
        className="content-blocks-status"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
      >
        <div className="status-indicator">
          {contentBlocks.length > 0 ? (
            <>
              <div className="status-dot active" />
              <span className="status-text">
                {contentBlocks.length} content block{contentBlocks.length !== 1 ? 's' : ''} added
              </span>
            </>
          ) : (
            <>
              <div className="status-dot" />
              <span className="status-text">No content blocks yet</span>
            </>
          )}
        </div>
      </motion.div>
    );
  };

  const SectionHeader = ({ title, section, icon: Icon }) => (
    <button
      type="button"
      className="section-header"
      onClick={() => toggleSection(section)}
    >
      <div className="section-title">
        {Icon && <Icon size={16} />}
        <h3>{title}</h3>
      </div>
      <motion.div
        animate={{ rotate: expandedSections[section] ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <FaChevronDown size={16} />
      </motion.div>
    </button>
  );

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="blog-form-modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div className="modal-title-section">
              <h2>{post ? 'Edit Blog Post' : 'Create New Post'}</h2>
              <span className="modal-subtitle">
                {useRichEditor ? 'Rich Content Mode' : 'Classic Mode'}
              </span>
            </div>
            <button onClick={onClose} className="modal-close-btn">
              <FaTimes size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="blog-form">
            {/* Basic Information Section */}
            <motion.section
              className={`form-section ${expandedSections.basic ? 'expanded' : 'collapsed'}`}
              initial={false}
            >
              <SectionHeader title="Basic Information" section="basic" />
              
              <AnimatePresence>
                {expandedSections.basic && (
                  <motion.div
                    className="section-content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Input
                      label="Title"
                      name="title"
                      placeholder="Getting Started with React Hooks"
                      register={register}
                      error={errors.title}
                      required
                    />

                    <Textarea
                      label="Excerpt"
                      name="excerpt"
                      placeholder="Short summary of your post..."
                      rows={2}
                      register={register}
                      error={errors.excerpt}
                      required
                    />

                    <Input
                      label="Tags (comma-separated)"
                      name="tags"
                      placeholder="React, JavaScript, Tutorial"
                      register={register}
                    />

                    <div className="form-row">
                      <div className="form-group">
                        <label>Category</label>
                        <select {...register('category')} className="form-select">
                          {BLOG_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="checkbox-label">
                          <input type="checkbox" {...register('published')} />
                          <span>Publish</span>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Featured Image Section */}
            <motion.section
              className={`form-section ${expandedSections.basic ? 'expanded' : 'collapsed'}`}
              initial={false}
            >
              <SectionHeader title="Featured Image" section="basic" />
              
              <AnimatePresence>
                {expandedSections.basic && (
                  <motion.div
                    className="section-content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="form-group">
                      <label>Upload Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="file-input"
                      />
                      {uploadingImage && <p className="uploading">Uploading...</p>}
                    </div>

                    <Input
                      label="Or Paste Image URL"
                      name="featuredImage"
                      placeholder="https://..."
                      register={register}
                      error={errors.featuredImage}
                    />

                    <Input
                      label="Image Alt Text (for accessibility)"
                      name="featuredImageAlt"
                      placeholder="Describe the image..."
                      register={register}
                    />

                    {featuredImage && (
                      <motion.div
                        className="image-preview-container"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <img src={featuredImage} alt="Preview" className="image-preview" />
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Content Editor Section */}
            <motion.section
              className={`form-section content-section ${expandedSections.content ? 'expanded' : 'collapsed'}`}
              initial={false}
            >
              <SectionHeader title="Post Content" section="content" />
              
              <AnimatePresence>
                {expandedSections.content && (
                  <motion.div
                    className="section-content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Content Mode Toggle */}
                    <div className="content-mode-toggle">
                      <label className="mode-toggle-label">
                        <input
                          type="radio"
                          value="rich"
                          checked={useRichEditor}
                          onChange={() => setUseRichEditor(true)}
                        />
                        <span className="toggle-text">Rich Blocks Editor</span>
                      </label>
                      <label className="mode-toggle-label">
                        <input
                          type="radio"
                          value="classic"
                          checked={!useRichEditor}
                          onChange={() => setUseRichEditor(false)}
                        />
                        <span className="toggle-text">Classic Text Editor</span>
                      </label>
                    </div>

                    {/* Rich Editor */}
                    {useRichEditor && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="rich-editor-wrapper"
                      >
                        <BlogBlockEditor 
                          onSave={handleSaveContent}
                          initialContent={contentBlocks}
                        />
                        <ContentBlocksStatus />
                      </motion.div>
                    )}

                    {/* Classic Editor */}
                    {!useRichEditor && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Textarea
                          label="Content"
                          name="content"
                          placeholder="Write your blog post content here... (Separate paragraphs with blank lines)"
                          rows={12}
                          register={register}
                          error={errors.content}
                          required
                        />
                        <div className="editor-hint">
                          💡 Tip: Use blank lines to separate paragraphs
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Error Message */}
            {submitError && (
              <motion.div
                className="error-banner"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {submitError}
              </motion.div>
            )}

            {/* Form Actions */}
            <div className="form-actions">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="primary" 
                disabled={isSubmitting || (useRichEditor && contentBlocks.length === 0)}
              >
                {isSubmitting ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BlogFormModal;