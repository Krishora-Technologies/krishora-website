"use client";
import { useState } from "react";

export default function ContactSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', contact: '', requirement: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) throw new Error('Failed to send');
      
      setStatus('success');
      setTimeout(() => {
        setIsModalOpen(false);
        setStatus('idle');
        setFormData({ name: '', email: '', contact: '', requirement: '' });
      }, 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <footer id="contact" className="kr-contact">
      <div className="kr-contact__inner">
        <p className="kr-contact__eyebrow">Get In Touch</p>

        <h2 className="kr-contact__heading">
          Let&apos;s Build<br />
          <span>Something</span>
        </h2>

        <p className="kr-contact__sub">
          Have a tech challenge? We engineer solutions that scale.
          Let&apos;s talk about your next big idea.
        </p>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="kr-contact__cta magnetic"
          style={{ marginTop: '24px' }}
        >
          Start a Project
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        <div className="kr-footer">
          <span className="kr-footer__copy">
            &copy; 2024 Krishora Technologies. All rights reserved.
          </span>
          <div className="kr-footer__social">
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
              </svg>
            </a>
            <a href="https://twitter.com" aria-label="X / Twitter" target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Start Project Modal */}
      <div className={`kr-modal-overlay ${isModalOpen ? 'active' : ''}`}>
        <div className="kr-modal">
          <button 
            className="kr-modal__close" 
            onClick={() => setIsModalOpen(false)}
            aria-label="Close modal"
          >
            &times;
          </button>
          
          <div className="kr-modal__header">
            <h3 className="kr-modal__title">Start a Project</h3>
            <p className="kr-modal__sub">Tell us about your requirements and we&apos;ll get back to you shortly.</p>
          </div>

          <form className="kr-modal__form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              required 
              value={formData.name}
              onChange={handleChange}
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              required 
              value={formData.email}
              onChange={handleChange}
            />
            <input 
              type="text" 
              name="contact" 
              placeholder="Contact Number" 
              required 
              value={formData.contact}
              onChange={handleChange}
            />
            <textarea 
              name="requirement" 
              placeholder="Your Requirement" 
              required 
              value={formData.requirement}
              onChange={handleChange}
            />
            
            <button type="submit" className="kr-modal__submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Submit Inquiry'}
            </button>

            {status === 'success' && (
              <p className="kr-modal__message success">Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="kr-modal__message error">Failed to send message. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </footer>
  );
}
