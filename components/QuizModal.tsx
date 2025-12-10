import React, { useState, useEffect } from 'react';
import { QuizAnswers, QuizStep } from '../types';
import { XIcon, CheckIcon, ArrowRight } from './Icons';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialAnswers: QuizAnswers = {
  mrr: '',
  painLevel: 5,
  failedChannels: [],
  icpClarity: '',
  blocker: '',
  pricing: '',
  email: '',
  name: '',
  booked: false,
};

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<QuizStep>('welcome');
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const [history, setHistory] = useState<QuizStep[]>([]);

  // Reset quiz when opened
  useEffect(() => {
    if (isOpen) {
      setStep('welcome');
      setAnswers(initialAnswers);
      setHistory([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const goToNext = (nextStep: QuizStep) => {
    setHistory([...history, step]);
    setStep(nextStep);
  };

  const goBack = () => {
    const prevStep = history[history.length - 1];
    if (prevStep) {
      setHistory(history.slice(0, -1));
      setStep(prevStep);
    }
  };

  const updateAnswer = (key: keyof QuizAnswers, value: any) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleSelectionNext = (key: keyof QuizAnswers, value: any, nextStep: QuizStep) => {
    updateAnswer(key, value);
    goToNext(nextStep);
  };

  // --- RENDERING STEPS ---

  const renderWelcome = () => (
    <div className="space-y-6 text-center animate-in">
      <div className="text-[#F2C94C] uppercase tracking-wider text-sm font-bold mb-2">Hey founder</div>
      <h2 className="text-3xl font-bold text-white mb-4">2 minutes. 6 questions. Real answers.</h2>
      <p className="text-[#D2D2D2] text-lg mb-8">Tell us where you’re stuck and we’ll tell you what to fix first.</p>
      <button 
        onClick={() => goToNext('mrr')}
        className="bg-[#F2C94C] text-[#0E0E0E] font-bold py-4 px-8 rounded-md text-lg hover:-translate-y-1 transition-transform w-full sm:w-auto"
      >
        Start diagnostic
      </button>
    </div>
  );

  const renderMRR = () => (
    <div className="space-y-6 animate-in">
      <div className="text-sm text-[#D2D2D2]">Question 1 of 6</div>
      <h3 className="text-[#F2C94C] font-semibold text-lg">First one’s easy — just pick your bracket.</h3>
      <h2 className="text-2xl font-bold text-white mb-6">What’s your current MRR?</h2>
      <div className="space-y-3">
        {['Pre-revenue (building)', '$1K–$5K', '$5K–$25K', '$25K–$50K', '$50K+'].map((opt) => (
          <button
            key={opt}
            onClick={() => handleSelectionNext('mrr', opt, 'pain')}
            className="w-full text-left p-4 rounded bg-[#1A1A1A] border border-[#333] hover:border-[#F2C94C] hover:bg-[#252525] text-[#D2D2D2] transition-all"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  const renderPain = () => (
    <div className="space-y-8 animate-in">
      <div className="text-sm text-[#D2D2D2]">Question 2 of 6</div>
      <h3 className="text-[#F2C94C] font-semibold text-lg">Now be honest — this matters.</h3>
      <h2 className="text-2xl font-bold text-white">On a scale of 1–10, how unpredictable is your revenue?</h2>
      
      <div className="pt-8 pb-4">
        <input 
          type="range" 
          min="1" 
          max="10" 
          value={answers.painLevel} 
          onChange={(e) => updateAnswer('painLevel', parseInt(e.target.value))}
          className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between mt-4 text-[#D2D2D2] text-sm">
            <span>1 = Predictable</span>
            <span className="text-[#F2C94C] font-bold text-xl">{answers.painLevel}</span>
            <span>10 = I check Stripe daily</span>
        </div>
        <p className="text-xs text-[#666] mt-2 text-center">Move the slider to reflect how often revenue surprises you.</p>
      </div>

      <button 
        onClick={() => goToNext('channels')}
        className="w-full bg-[#F2C94C] text-[#0E0E0E] font-bold py-3 rounded hover:opacity-90 transition-opacity"
      >
        Next
      </button>
    </div>
  );

  const renderChannels = () => {
    const toggleChannel = (channel: string) => {
      const current = answers.failedChannels;
      if (current.includes(channel)) {
        updateAnswer('failedChannels', current.filter(c => c !== channel));
      } else {
        updateAnswer('failedChannels', [...current, channel]);
      }
    };

    return (
      <div className="space-y-6 animate-in">
        <div className="text-sm text-[#D2D2D2]">Question 3 of 6</div>
        <h3 className="text-[#F2C94C] font-semibold text-lg">If you’ve tried stuff, tell us what didn’t work.</h3>
        <h2 className="text-2xl font-bold text-white mb-6">Which of these have you tried and failed at?</h2>
        <div className="space-y-3">
          {['Cold email', 'LinkedIn outreach', 'Paid ads', 'Content marketing', 'None yet'].map((opt) => (
            <button
              key={opt}
              onClick={() => toggleChannel(opt)}
              className={`w-full text-left p-4 rounded border flex justify-between items-center transition-all ${
                answers.failedChannels.includes(opt) 
                  ? 'bg-[#252525] border-[#F2C94C] text-white' 
                  : 'bg-[#1A1A1A] border-[#333] text-[#D2D2D2]'
              }`}
            >
              <span>{opt}</span>
              {answers.failedChannels.includes(opt) && <CheckIcon className="text-[#F2C94C] w-5 h-5" />}
            </button>
          ))}
        </div>
        <button 
          onClick={() => goToNext('icp')}
          className="w-full bg-[#F2C94C] text-[#0E0E0E] font-bold py-3 rounded hover:opacity-90 transition-opacity mt-4"
        >
          Next
        </button>
      </div>
    );
  };

  const renderICP = () => (
    <div className="space-y-6 animate-in">
      <div className="text-sm text-[#D2D2D2]">Question 4 of 6</div>
      <h3 className="text-[#F2C94C] font-semibold text-lg">This separates founders who scale from those who don’t.</h3>
      <h2 className="text-2xl font-bold text-white mb-6">How clearly can you describe your ideal customer?</h2>
      <div className="space-y-3">
        {['Crystal clear (can name 10)', 'Somewhat clear', 'Fuzzy', 'No idea'].map((opt) => (
          <button
            key={opt}
            onClick={() => handleSelectionNext('icpClarity', opt, 'blocker')}
            className="w-full text-left p-4 rounded bg-[#1A1A1A] border border-[#333] hover:border-[#F2C94C] hover:bg-[#252525] text-[#D2D2D2] transition-all"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  const renderBlocker = () => (
    <div className="space-y-6 animate-in">
      <div className="text-sm text-[#D2D2D2]">Question 5 of 6</div>
      <h3 className="text-[#F2C94C] font-semibold text-lg">Tell me plainly — this is the best part.</h3>
      <h2 className="text-2xl font-bold text-white">What’s the #1 thing preventing you from growing consistently right now?</h2>
      <textarea
        className="w-full bg-[#1A1A1A] border border-[#333] rounded p-4 text-white focus:border-[#F2C94C] outline-none h-32"
        placeholder="Example: I'm a solo tech founder... I tried 500 cold emails and got 2 replies..."
        value={answers.blocker}
        onChange={(e) => updateAnswer('blocker', e.target.value)}
      />
      <button 
        onClick={() => goToNext('pricing')}
        className="w-full bg-[#F2C94C] text-[#0E0E0E] font-bold py-3 rounded hover:opacity-90 transition-opacity"
      >
        Next
      </button>
    </div>
  );

  const renderPricing = () => (
    <div className="space-y-6 animate-in">
      <div className="text-sm text-[#D2D2D2]">Question 6 of 6</div>
      <h3 className="text-[#F2C94C] font-semibold text-lg">Quick one — not a yes/no about buying.</h3>
      <h2 className="text-2xl font-bold text-white mb-6">If someone built you a complete revenue system, what should that cost monthly?</h2>
      <div className="space-y-3">
        {['Under $2K', '$2K–$5K', '$5K–$10K', '$10K+', "I'd prefer one-time project pricing"].map((opt) => (
          <button
            key={opt}
            onClick={() => handleSelectionNext('pricing', opt, answers.painLevel >= 7 ? 'interview_offer' : 'email_optin')}
            className="w-full text-left p-4 rounded bg-[#1A1A1A] border border-[#333] hover:border-[#F2C94C] hover:bg-[#252525] text-[#D2D2D2] transition-all"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  const renderInterviewOffer = () => (
    <div className="space-y-6 animate-in">
      <h3 className="text-[#EB5757] font-semibold text-lg">You’re bleeding — want a short call to map fixes?</h3>
      <h2 className="text-2xl font-bold text-white mb-6">Would you be open to a 15-minute diagnostic call where we show what’s broken and one action to fix it?</h2>
      
      <div className="space-y-3">
        <button
          onClick={() => {
            updateAnswer('booked', true);
            // In real app: open calendly logic here
            goToNext('email_optin'); 
          }}
          className="w-full text-left p-4 rounded bg-[#F2C94C] border border-[#F2C94C] text-[#0E0E0E] font-bold hover:opacity-90 transition-all flex justify-between items-center"
        >
          <span>Yes — show calendar</span>
          <ArrowRight />
        </button>
        <button
          onClick={() => {
             updateAnswer('booked', false);
             goToNext('email_optin');
          }}
          className="w-full text-left p-4 rounded bg-[#1A1A1A] border border-[#333] text-[#D2D2D2] hover:bg-[#252525] transition-all"
        >
          Maybe later (send email)
        </button>
        <button
          onClick={() => {
             updateAnswer('booked', false);
             goToNext('email_optin');
          }}
          className="w-full text-left p-4 rounded bg-[#1A1A1A] border border-[#333] text-[#D2D2D2] hover:bg-[#252525] transition-all"
        >
          No thanks
        </button>
      </div>
    </div>
  );

  const renderEmailOptIn = () => (
    <div className="space-y-6 animate-in">
      <h3 className="text-[#F2C94C] font-semibold text-lg">Get a full breakdown in your inbox.</h3>
      <h2 className="text-2xl font-bold text-white mb-4">Want the full diagnostic breakdown?</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-[#D2D2D2] mb-1">First Name (Optional)</label>
          <input 
            type="text"
            className="w-full bg-[#1A1A1A] border border-[#333] rounded p-3 text-white focus:border-[#F2C94C] outline-none"
            value={answers.name}
            onChange={(e) => updateAnswer('name', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-[#D2D2D2] mb-1">Email (Required)</label>
          <input 
            type="email"
            required
            className="w-full bg-[#1A1A1A] border border-[#333] rounded p-3 text-white focus:border-[#F2C94C] outline-none"
            value={answers.email}
            onChange={(e) => updateAnswer('email', e.target.value)}
          />
        </div>
      </div>

      <button 
        onClick={() => goToNext('success')}
        disabled={!answers.email}
        className="w-full bg-[#F2C94C] text-[#0E0E0E] font-bold py-3 rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-4"
      >
        Send me the breakdown
      </button>
      <button 
        onClick={() => goToNext('success')}
        className="w-full text-[#666] text-sm hover:text-[#D2D2D2] mt-2 underline"
      >
        Skip — show my results
      </button>
    </div>
  );

  const renderSuccess = () => {
    const isHighPainBooked = answers.painLevel >= 7 && answers.booked;

    return (
      <div className="space-y-6 text-center animate-in">
        <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border-2 border-[#F2C94C] flex items-center justify-center">
                <CheckIcon className="text-[#F2C94C] w-8 h-8" />
            </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">
          {isHighPainBooked ? 'Got it — we’ll send the breakdown and see you on the call.' : 'Check your email in ~5 minutes.'}
        </h2>
        <p className="text-[#D2D2D2] text-lg mb-8">
          {isHighPainBooked 
            ? 'Check your email for next steps. Add the call to your calendar.' 
            : 'We’ll send your diagnostic and the #1 fix to try this week.'}
        </p>
        <button 
          onClick={onClose}
          className="bg-[#1A1A1A] border border-[#333] text-white py-3 px-8 rounded hover:border-[#F2C94C] transition-colors"
        >
          Back to site
        </button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0E0E0E] border border-[#333] rounded-lg w-full max-w-lg p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#666] hover:text-white">
          <XIcon />
        </button>
        
        {/* Progress Bar (Skipped on welcome/success) */}
        {step !== 'welcome' && step !== 'success' && (
            <div className="absolute top-0 left-0 h-1 bg-[#1A1A1A] w-full">
                <div 
                    className="h-full bg-[#F2C94C] transition-all duration-300" 
                    style={{ width: `${(history.length / 8) * 100}%` }}
                />
            </div>
        )}

        {/* Back Button */}
        {history.length > 0 && step !== 'success' && (
             <button onClick={goBack} className="text-xs text-[#666] hover:text-white mb-4">
                 ← Back
             </button>
        )}

        {/* Dynamic Content */}
        {step === 'welcome' && renderWelcome()}
        {step === 'mrr' && renderMRR()}
        {step === 'pain' && renderPain()}
        {step === 'channels' && renderChannels()}
        {step === 'icp' && renderICP()}
        {step === 'blocker' && renderBlocker()}
        {step === 'pricing' && renderPricing()}
        {step === 'interview_offer' && renderInterviewOffer()}
        {step === 'email_optin' && renderEmailOptIn()}
        {step === 'success' && renderSuccess()}
      </div>
    </div>
  );
};