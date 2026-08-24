'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to submit');
      }

      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      console.error('Contact form error:', err);
      setErrorMsg(err.message || 'Failed to send message');
      setStatus('error');
    }
  };

  const inputClass =
    "block w-full px-3 py-2.5 border border-border-gray rounded-[3px] text-xs bg-white placeholder-text-muted text-text-body focus:outline-none focus:ring-1 focus:ring-navy-primary focus:border-navy-primary";
  const labelClass = "block text-[10px] uppercase tracking-wider font-semibold text-text-muted mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className={labelClass}>Full Name *</label>
        <input type="text" name="name" id="name" required className={inputClass} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className={labelClass}>Email Address *</label>
          <input type="email" name="email" id="email" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone Number</label>
          <input type="tel" name="phone" id="phone" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>Query Type *</label>
        <select id="subject" name="subject" required className={`${inputClass} bg-white`}>
          <option value="">Select a subject...</option>
          <option value="audit">Auditing & Assurance</option>
          <option value="tax">Taxation Services</option>
          <option value="compliance">Company Law / ROC</option>
          <option value="general">General Inquiry</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Message *</label>
        <textarea id="message" name="message" rows={4} required className={inputClass} />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full flex justify-center py-2.5 px-4 border border-navy-primary rounded-[3px] text-xs font-semibold text-white bg-navy-primary hover:bg-navy-ink focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors btn-press"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
      </div>

      {status === 'success' && (
        <div className="p-4 bg-white border border-accent-success rounded-[3px]">
          <p className="text-xs text-accent-success text-center font-medium">Thank you for reaching out. We will get back to you shortly.</p>
        </div>
      )}

      {status === 'error' && errorMsg && (
        <div className="p-4 bg-white border border-accent-warning rounded-[3px]">
          <p className="text-xs text-accent-warning text-center font-medium">{errorMsg}</p>
        </div>
      )}
    </form>
  );
}
