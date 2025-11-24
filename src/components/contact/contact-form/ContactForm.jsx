import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import { submitContactForm } from '../../../services/contactService';
import Input from '../../common/input/Input';
import Textarea from '../../common/textarea/Textarea';
import Button from '../../common/button/Button';
import './ContactForm.css';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');
      setSubmitSuccess(false);

      await submitContactForm(data);

      setSubmitSuccess(true);
      reset();

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError(
        error.response?.data?.message || 'Failed to send message. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="contact-form-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        {/* Name */}
        <Input
          label="Your Name"
          name="name"
          placeholder="John Doe"
          register={register}
          error={errors.name}
          required
        />

        {/* Email */}
        <Input
          label="Your Email"
          name="email"
          type="email"
          placeholder="john@example.com"
          register={register}
          error={errors.email}
          required
        />

        {/* Subject */}
        <Input
          label="Subject"
          name="subject"
          placeholder="Project Inquiry"
          register={register}
          error={errors.subject}
        />

        {/* Message */}
        <Textarea
          label="Message"
          name="message"
          placeholder="Tell me about your project..."
          rows={6}
          register={register}
          error={errors.message}
          required
        />

        {/* Success Message */}
        {submitSuccess && (
          <motion.div
            className="contact-form-success"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>✅ Message sent successfully! I'll get back to you soon.</p>
          </motion.div>
        )}

        {/* Error Message */}
        {submitError && (
          <motion.div
            className="contact-form-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>❌ {submitError}</p>
          </motion.div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="contact-form-submit"
        >
          {isSubmitting ? (
            'Sending...'
          ) : (
            <>
              <FaPaperPlane size={16} className="mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default ContactForm;