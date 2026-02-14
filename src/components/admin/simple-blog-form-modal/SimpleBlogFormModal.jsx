import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { createBlogPost, updateBlogPost } from '../../../services/blogService';
import { uploadImage } from '../../../services/uploadService';
import Input from '../../common/input/Input';
import Textarea from '../../common/textarea/Textarea';
import Button from '../../common/button/Button';
import SimpleBlogEditor from '../simple-block-editor/SimpleBlogEditor';
import { BLOG_CATEGORIES } from '../../../utils/constants';
import './SimpleBlogFormModal.css';

const SimpleBlogFormModal = ({ post, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [contentHtml, setContentHtml] = useState(post?.content || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      title: post?.title || '',
      excerpt: post?.excerpt || '',
      featuredImage: post?.featuredImage || '',
      featuredImageAlt: post?.featuredImageAlt || '',
      category: post?.category || 'Tech',
      tags: post?.tags?.join(', ') || '',
      published: post?.published !== false,
    },
  });

  const featuredImage = watch('featuredImage');
  const title = watch('title');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const result = await uploadImage(file);
      setValue('featuredImage', result.url);
    } catch (error) {
      setSubmitError('Failed to upload image');
      console.error('Upload error:', error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveContent = (html) => {
    setContentHtml(html);
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');

      // Validation
      if (!data.featuredImage?.trim()) {
        setSubmitError('Please upload or provide a featured image');
        return;
      }

      if (!contentHtml.trim()) {
        setSubmitError('Please write some content for your post');
        return;
      }

      if (!data.title?.trim()) {
        setSubmitError('Please add a title');
        return;
      }

      if (!data.excerpt?.trim()) {
        setSubmitError('Please add an excerpt');
        return;
      }

      // Format tags
      const tags = data.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      // Build submission data
      const formattedData = {
        title: data.title,
        excerpt: data.excerpt,
        featuredImage: data.featuredImage,
        featuredImageAlt: data.featuredImageAlt || '',
        category: data.category,
        published: data.published,
        tags: tags,
        content: contentHtml, // Store HTML content
        contentBlocks: [], // Clear old block format
      };

      console.log('Submitting data:', formattedData);

      // Create or update
      if (post && post._id) {
        const response = await updateBlogPost(post._id, formattedData);
        console.log('Update response:', response);
      } else {
        const response = await createBlogPost(formattedData);
        console.log('Create response:', response);
      }

      // Success - close modal
      onClose();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to save post';
      setSubmitError(errorMessage);
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="simple-blog-form-modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="modal-header">
            <div>
              <h2>{post ? 'Edit Post' : 'New Post'}</h2>
              <p className="modal-subtitle">Write and publish your thoughts</p>
            </div>
            <button onClick={onClose} className="modal-close-btn">
              <FaTimes size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="simple-blog-form">
            {/* Title */}
            <div className="form-section">
              <Input
                label="Title"
                name="title"
                placeholder="Your compelling title here..."
                register={register}
                error={errors.title}
                required
                large
              />
            </div>

            {/* Excerpt */}
            <div className="form-section">
              <Textarea
                label="Excerpt"
                name="excerpt"
                placeholder="Brief summary of your post (shown in lists)..."
                rows={2}
                register={register}
                error={errors.excerpt}
                required
              />
            </div>

            {/* Featured Image */}
            <div className="form-section">
              <h3 className="section-label">Featured Image</h3>
              <div className="image-upload-area">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="file-input"
                  id="featured-image"
                />
                <label htmlFor="featured-image" className="file-input-label">
                  {uploadingImage ? (
                    <span>Uploading...</span>
                  ) : (
                    <>
                      <span className="upload-icon">📸</span>
                      <span>Click to upload or drag image</span>
                    </>
                  )}
                </label>
              </div>

              <Input
                label="Or paste image URL"
                name="featuredImage"
                placeholder="https://..."
                register={register}
              />

              <Input
                label="Image alt text"
                name="featuredImageAlt"
                placeholder="Describe the image for accessibility..."
                register={register}
              />

              {featuredImage && (
                <motion.div
                  className="image-preview"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <img src={featuredImage} alt="Preview" />
                </motion.div>
              )}
            </div>

            {/* Main Content Editor */}
            <div className="form-section content-section">
              <h3 className="section-label">Content</h3>
              <p className="section-description">
                Write your post using the toolbar below. Format with bold, italic, headings, and more.
              </p>
              <SimpleBlogEditor
                initialContent={contentHtml}
                onSave={handleSaveContent}
              />
            </div>

            {/* Tags & Category */}
            <div className="form-section">
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
                  <label>Tags</label>
                  <Input
                    name="tags"
                    placeholder="React, JavaScript, Tutorial"
                    register={register}
                    noLabel
                  />
                </div>
              </div>
            </div>

            {/* Publish Option */}
            <div className="form-section">
              <label className="checkbox-label">
                <input type="checkbox" {...register('published')} defaultChecked />
                <span>Publish this post</span>
              </label>
            </div>

            {/* Error Message */}
            {submitError && (
              <motion.div
                className="error-banner"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ⚠️ {submitError}
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
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? 'Saving...'
                  : post
                    ? 'Update Post'
                    : 'Publish Post'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SimpleBlogFormModal;