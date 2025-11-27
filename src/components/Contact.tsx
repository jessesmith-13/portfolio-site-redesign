'use client'

import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import Input from './ui/Input';
import Textarea from './ui/TextArea';
import { Button } from './ui/Button';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus('idle');

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error('Failed to submit form');

    setSubmitStatus('success');
    setFormData({ name: '', email: '', message: '' });

  } catch (err) {
    console.error('Contact form error:', err);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <section id="contact" className="min-h-screen bg-[#C8E6A0] py-16 sm:py-20 lg:py-24 flex items-center snap-start snap-always">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#3d4654] mb-4 tracking-wide">
              GET IN TOUCH
            </h2>
            <div className="w-24 h-1 bg-[#7A95A8] mx-auto mb-6"></div>
            <p className="text-[#3d4654] text-lg">
              Have a project in mind? Let&apos;s work together!
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-[#3d4654] mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border-gray-300 focus:border-[#7A95A8] focus:ring-[#7A95A8]"
                  placeholder="Your name"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-[#3d4654] mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border-gray-300 focus:border-[#7A95A8] focus:ring-[#7A95A8]"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="block text-[#3d4654] mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-gray-50 border-gray-300 focus:border-[#7A95A8] focus:ring-[#7A95A8] resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#7A95A8] hover:bg-[#5A7585] text-white px-8 py-3 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </Button>
              </div>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center">
                  Thanks for reaching out! I&apos;ll get back to you soon.
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-center">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>

          {/* Direct Contact Info */}
          <div className="text-center mt-12">
            <p className="text-[#3d4654] mb-4">Or email me directly at:</p>
            <a
              href="mailto:jesselsmith713@gmail.com"
              className="inline-flex items-center space-x-2 text-[#7A95A8] hover:text-[#5A7585] transition-colors duration-200"
            >
              <Mail className="w-5 h-5" />
              <span>jesselsmith713@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
