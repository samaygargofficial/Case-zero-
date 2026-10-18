import React, { useState } from 'react';
import { Mail, MessageSquare, CheckCircle, AlertCircle, X, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'local_saved'>('idle');
  const [feedbackNote, setFeedbackNote] = useState('');

  const handleSendFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus('submitting');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || undefined,
          email: senderEmail.trim() || undefined,
          message: message.trim(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setStatus('success');
        setFeedbackNote(
          data.message || 'Feedback recorded on the local Case Zero server session.'
        );
        setMessage('');
      } else {
        throw new Error('Server error');
      }
    } catch {
      const existing = JSON.parse(localStorage.getItem('case_zero_local_feedback') || '[]');
      existing.push({
        id: `LOCAL-${Date.now()}`,
        name: name.trim() || 'Anonymous',
        email: senderEmail.trim() || '',
        message: message.trim(),
        date: new Date().toISOString(),
      });
      localStorage.setItem('case_zero_local_feedback', JSON.stringify(existing));

      setStatus('local_saved');
      setFeedbackNote(
        'Saved to browser localStorage on this device. For direct email delivery, use the mailto link.'
      );
      setMessage('');
    }
  };

  return (
    <footer className="border-t border-[#1a1f2c] bg-[#090b0e] py-8 px-4 sm:px-6 lg:px-8 text-[#9ca3af] text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <p className="text-sm font-semibold text-[#ede8df] tracking-wide">
            Made by Samay Garg
          </p>
          <p className="mt-1 text-[#a39f97]">
            Questions, feedback or collaboration? Get in touch.
          </p>

          <div className="mt-2.5 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <a
              href="mailto:SamayGarg.official@gmail.com"
              className="font-mono text-[#e2ddd5] hover:text-white underline underline-offset-4 decoration-[#881337] transition-colors flex items-center gap-1.5"
            >
              <Mail size={13} className="text-[#b91c1c]" />
              SamayGarg.official@gmail.com
            </a>

            <span className="text-[#374151]">·</span>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-1 bg-[#151a24] hover:bg-[#1f2633] text-[#ede8df] border border-[#232a38] rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare size={13} className="text-[#b91c1c]" />
              Feedback Form
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-1 text-[11px] text-[#6b7280]">
          <span className="font-cinzel tracking-widest text-[#a89580]">
            CASE ZERO · 10-CASE DETECTIVE CAMPAIGN
          </span>
          <span>Created by Samay Garg · All Progress Saved Locally</span>
        </div>
      </div>

      {/* Feedback Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#10141c] border border-[#222938] rounded-lg shadow-2xl p-6 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2635]">
              <h3 className="font-cinzel text-base font-bold text-[#ede8df] tracking-wide">
                Contact & Detective Feedback
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setStatus('idle');
                }}
                className="text-[#9ca3af] hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-3 text-xs text-[#9ca3af] leading-relaxed">
              Reach out directly via{' '}
              <a
                href="mailto:SamayGarg.official@gmail.com"
                className="text-[#ede8df] underline decoration-[#b91c1c]"
              >
                SamayGarg.official@gmail.com
              </a>{' '}
              or log a note below.
            </p>

            {status === 'success' || status === 'local_saved' ? (
              <div className="mt-5 p-4 bg-[#14231b] border border-[#166534] rounded text-center">
                {status === 'success' ? (
                  <CheckCircle className="mx-auto text-emerald-400 mb-2" size={28} />
                ) : (
                  <AlertCircle className="mx-auto text-amber-400 mb-2" size={28} />
                )}
                <p className="text-xs font-medium text-[#ede8df]">{feedbackNote}</p>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setStatus('idle');
                  }}
                  className="mt-4 px-4 py-1.5 bg-[#1e293b] text-white text-xs rounded hover:bg-[#334155] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendFeedback} className="mt-4 space-y-3.5">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9ca3af] mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Detective Name"
                    className="w-full bg-[#161b26] border border-[#252f40] rounded px-3 py-2 text-xs text-[#ede8df] placeholder-[#4b5563] focus:outline-none focus:border-[#b91c1c]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9ca3af] mb-1">
                    Your Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="detective@example.com"
                    className="w-full bg-[#161b26] border border-[#252f40] rounded px-3 py-2 text-xs text-[#ede8df] placeholder-[#4b5563] focus:outline-none focus:border-[#b91c1c]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9ca3af] mb-1">
                    Message <span className="text-[#b91c1c]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your feedback on the 10 cases..."
                    className="w-full bg-[#161b26] border border-[#252f40] rounded px-3 py-2 text-xs text-[#ede8df] placeholder-[#4b5563] focus:outline-none focus:border-[#b91c1c]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-[#6b7280]">
                  <span>Saved to session server & local log.</span>
                  <button
                    type="submit"
                    disabled={status === 'submitting' || !message.trim()}
                    className="px-4 py-2 bg-[#881337] hover:bg-[#9f1239] disabled:opacity-50 text-white rounded font-medium text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send size={12} />
                    {status === 'submitting' ? 'Saving...' : 'Submit Feedback'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
