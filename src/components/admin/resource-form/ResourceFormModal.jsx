import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaTimes, FaFilePdf } from 'react-icons/fa';
import { createResource, updateResource } from '../../../services/resourceService';
import { uploadImage } from '../../../services/uploadService';
import Input from '../../common/input/Input';
import Textarea from '../../common/textarea/Textarea';
import Button from '../../common/button/Button';
import './ResourceFormModal.css';

const RESOURCE_CATEGORIES = ['Guide', 'Ebook', 'Template', 'Checklist', 'Other'];

const ResourceFormModal = ({ resource, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: resource || {
      title: '',
      description: '',
      category: 'Guide',
      fileUrl: '',
      thumbnail: '',
    },
  });

  const fileUrl = watch('fileUrl');
  const thumbnailUrl = watch('thumbnail');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    try {
      setUploadingFile(true);
      const result = await uploadImage(file); // generic upload endpoint, works for PDFs too
      setValue('fileUrl', result.url);
      setValue('filePublicId', result.publicId);
    } catch (error) {
      alert('Failed to upload file');
    } finally {
      setUploadingFile(false);
    }
  };

  const handleThumbUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingThumb(true);
      const result = await uploadImage(file);
      setValue('thumbnail', result.url);
    } catch (error) {
      alert('Failed to upload thumbnail');
    } finally {
      setUploadingThumb(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');

      if (!data.fileUrl) {
        setSubmitError('Please upload the PDF file');
        return;
      }

      if (resource) {
        await updateResource(resource._id, data);
      } else {
        await createResource(data);
      }

      onClose();
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Failed to save resource');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="resource-form-modal"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>{resource ? 'Edit Resource' : 'New Resource'}</h2>
            <button onClick={onClose} className="modal-close-btn">
              <FaTimes size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="resource-form">
            <Input
              label="Title"
              name="title"
              placeholder="How to Structure Your LinkedIn as a Beginner"
              register={register}
              error={errors.title}
              required
            />

            <Textarea
              label="Short Description"
              name="description"
              placeholder="What this guide actually helps someone do..."
              rows={3}
              register={register}
              error={errors.description}
              required
            />

            <div className="form-group">
              <label>Category</label>
              <select {...register('category')} className="form-select">
                {RESOURCE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>PDF File</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                disabled={uploadingFile}
              />
              {uploadingFile && <p className="uploading">Uploading...</p>}
              {fileUrl && (
                <div className="file-preview">
                  <FaFilePdf size={16} />
                  <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                    View current file
                  </a>
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Cover Thumbnail (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbUpload}
                disabled={uploadingThumb}
              />
              {uploadingThumb && <p className="uploading">Uploading...</p>}
              {thumbnailUrl && (
                <img src={thumbnailUrl} alt="Preview" className="image-preview" />
              )}
            </div>

            {submitError && <p className="error-text">{submitError}</p>}

            <div className="form-actions">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : resource ? 'Update Resource' : 'Create Resource'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResourceFormModal;