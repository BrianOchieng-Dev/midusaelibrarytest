import React, { useState, useEffect } from 'react';
import { Book, CartItem } from '../types';
import { formatPrice } from '../utils/helpers';
import { BookCover } from './BookCover';
import { 
  X, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2, 
  Download, 
  User, 
  Copy, 
  Check, 
  ExternalLink,
  ArrowRight,
  Sparkles,
  Lock,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MpesaPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
  cartItems?: CartItem[];
  onPaymentSuccess: (data: {
    books: Book[];
    phoneNumber: string;
    mpesaReceipt: string;
    downloadToken: string;
  }) => void;
  onNavigateToProfile: () => void;
}

type PaymentStep = 'input' | 'push_sent' | 'success';

export const MpesaPaymentModal: React.FC<MpesaPaymentModalProps> = ({
  isOpen,
  onClose,
  book,
  cartItems = [],
  onPaymentSuccess,
  onNavigateToProfile,
}) => {
  // Determine items to purchase: either the single book or cart items
  const booksToBuy: Book[] = book 
    ? [book] 
    : cartItems.map((item) => item.book);

  const totalAmountKES = booksToBuy.reduce((sum, b) => sum + b.priceKES, 0) || 100;

  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [step, setStep] = useState<PaymentStep>('input');
  const [countdown, setCountdown] = useState(25);
  const [generatedReceipt, setGeneratedReceipt] = useState('');
  const [generatedToken, setGeneratedToken] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setStep('input');
      setPhoneError('');
      setCountdown(25);
      setIsProcessing(false);
      setCopiedLink(false);
    }
  }, [isOpen, book]);

  // Countdown timer for STK push
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'push_sent' && countdown > 0) {
      timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  if (!isOpen || booksToBuy.length === 0) return null;

  // Validate Kenyan phone number (07..., 01..., 254...)
  const validatePhone = (num: string) => {
    const cleaned = num.replace(/\s+/g, '').replace(/[-+]/g, '');
    if (!cleaned) {
      return 'Please enter your M-Pesa phone number';
    }
    // Accept 07XXXXXXXX, 01XXXXXXXX, 2547XXXXXXXX, 2541XXXXXXXX
    const regex = /^(?:254|\+254|0)?([17]\d{8})$/;
    if (!regex.test(cleaned)) {
      return 'Please enter a valid Kenyan Safaricom / M-Pesa number (e.g. 0712 345 678)';
    }
    return '';
  };

  const formatCleanPhone = (num: string) => {
    let cleaned = num.replace(/\s+/g, '').replace(/[-+]/g, '');
    if (cleaned.startsWith('254')) {
      cleaned = '0' + cleaned.slice(3);
    }
    return cleaned;
  };

  // Step 1: Initiate STK Push
  const handleInitiatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validatePhone(phoneNumber);
    if (error) {
      setPhoneError(error);
      return;
    }
    setPhoneError('');
    setIsProcessing(true);

    // Simulate STK push network dispatch
    setTimeout(() => {
      setIsProcessing(false);
      setStep('push_sent');
      setCountdown(25);
    }, 1200);
  };

  // Step 2: Confirm Payment (Simulated PIN Authorization)
  const handleConfirmPayment = () => {
    setIsProcessing(true);

    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const receiptCode = `QK${Math.floor(10 + Math.random() * 89)}${randomSuffix}`;
    const token = `dl_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`;

    setTimeout(() => {
      setGeneratedReceipt(receiptCode);
      setGeneratedToken(token);
      setIsProcessing(false);
      setStep('success');

      // Trigger Confetti
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00F2FE', '#1E90FF', '#10B981', '#F59E0B'],
      });

      // Notify parent app
      onPaymentSuccess({
        books: booksToBuy,
        phoneNumber: formatCleanPhone(phoneNumber),
        mpesaReceipt: receiptCode,
        downloadToken: token,
      });
    }, 1000);
  };

  const getDownloadUrl = (token: string, bookId: string) => {
    return `${window.location.origin}/download/pdf?token=${token}&book=${bookId}`;
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadNow = (bookItem: Book) => {
    // Generate sample PDF blob for direct download
    const element = document.createElement('a');
    const file = new Blob([
      `%PDF-1.4\n1 0 obj\n<< /Title (${bookItem.title}) /Author (${bookItem.author}) >>\nendobj\n`
    ], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = `${bookItem.title.replace(/\s+/g, '_')}_Midusa_eBook.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={step === 'push_sent' ? undefined : onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden z-10 animate-scaleIn my-auto">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              M
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                {step === 'success' ? 'Payment Confirmed' : 'Lipa na M-Pesa'}
              </h3>
              <p className="text-xs text-slate-500">
                {step === 'success' ? 'Unique PDF download link ready' : 'Direct STK Push Prompt'}
              </p>
            </div>
          </div>

          {step !== 'push_sent' && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* STEP 1: Phone Input */}
          {step === 'input' && (
            <form onSubmit={handleInitiatePayment} className="space-y-4">
              
              {/* Order Summary Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                <div className="shrink-0">
                  <BookCover book={booksToBuy[0]} size="xs" showBadge={false} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs uppercase font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                    {booksToBuy.length > 1 ? `${booksToBuy.length} eBooks Selected` : booksToBuy[0].category}
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 truncate mt-1">
                    {booksToBuy.length > 1 ? `${booksToBuy[0].title} + ${booksToBuy.length - 1} more` : booksToBuy[0].title}
                  </h4>
                  <p className="text-xs text-slate-500 truncate">
                    By {booksToBuy[0].author}
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
                    <span className="text-xs sm:text-sm text-slate-600 font-medium">Total to Pay:</span>
                    <span className="text-base font-extrabold text-emerald-700">
                      {formatPrice(totalAmountKES)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Phone Input Field */}
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-700">
                  Enter M-Pesa Phone Number
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-slate-600 font-semibold text-sm border-r border-slate-200 pr-2.5">
                    <Smartphone className="w-4.5 h-4.5 text-emerald-600" />
                    <span>+254</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="0712 345 678"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (phoneError) setPhoneError('');
                    }}
                    className={`w-full pl-24 pr-4 py-3 bg-slate-50 border rounded-xl text-base font-semibold text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none transition-colors ${
                      phoneError
                        ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                    }`}
                    autoFocus
                  />
                </div>
                {phoneError ? (
                  <p className="text-xs text-rose-600 font-medium">{phoneError}</p>
                ) : (
                  <p className="text-xs text-slate-500">
                    An STK push payment prompt will be sent immediately to this phone.
                  </p>
                )}
              </div>

              {/* Security Guarantee */}
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-800">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span>Instant STK push notification • Secure M-Pesa PIN prompt</span>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2.5 transition-transform active:scale-98 disabled:opacity-75 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending M-Pesa Prompt...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4.5 h-4.5" />
                    <span>Pay {formatPrice(totalAmountKES)} via M-Pesa</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: STK Push Sent - Waiting for PIN */}
          {step === 'push_sent' && (
            <div className="space-y-5 text-center py-2 animate-fadeIn">
              
              {/* Phone Prompt Simulation Graphic */}
              <div className="relative mx-auto w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                <Smartphone className="w-10 h-10 animate-bounce" />
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center ring-2 ring-white">
                  1
                </span>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-lg font-extrabold text-slate-900">
                  Prompt Sent to {phoneNumber}
                </h4>
                <p className="text-sm text-slate-600 max-w-xs mx-auto leading-relaxed">
                  Please check your phone screen right now. Enter your <strong>M-Pesa PIN</strong> to authorize the <strong>{formatPrice(totalAmountKES)}</strong> payment.
                </p>
              </div>

              {/* Step checklist */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center gap-2.5 text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    ✓
                  </div>
                  <span>STK push prompt dispatched to phone</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    2
                  </div>
                  <span>Enter your 4-digit M-Pesa PIN & press OK</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-500">
                  <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
                    3
                  </div>
                  <span>Unique download link is generated & saved to profile</span>
                </div>
              </div>

              {/* Interactive Simulation / Auto-Approval Button */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center justify-center gap-2.5 transition-all active:scale-98 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Verifying M-Pesa PIN Transaction...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>I have entered my PIN / Confirm Payment</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 px-1">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    Waiting for confirmation: {countdown}s
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep('input')}
                    className="text-blue-600 hover:underline text-xs font-medium cursor-pointer"
                  >
                    Change Phone Number
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* STEP 3: Success & Unique Download Link Sent to Account Profile */}
          {step === 'success' && (
            <div className="space-y-4 text-center animate-fadeIn">
              
              {/* Success Badge */}
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-extrabold text-slate-900">
                  Payment Successful!
                </h4>
                <p className="text-sm text-slate-600">
                  M-Pesa Receipt: <span className="font-mono font-bold text-slate-900">{generatedReceipt}</span> • {formatPrice(totalAmountKES)}
                </p>
              </div>

              {/* Unique Download Link Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    Your Unique PDF Download Link
                  </span>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    Active & Verified
                  </span>
                </div>

                {/* Unique Token Link display */}
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200">
                  <input
                    type="text"
                    readOnly
                    value={getDownloadUrl(generatedToken, booksToBuy[0].id)}
                    className="w-full text-xs sm:text-sm font-mono text-slate-700 bg-transparent outline-none truncate"
                  />
                  <button
                    onClick={() => handleCopyLink(getDownloadUrl(generatedToken, booksToBuy[0].id))}
                    className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 shrink-0 transition-colors cursor-pointer"
                    title="Copy unique download link"
                  >
                    {copiedLink ? <Check className="w-4.5 h-4.5 text-emerald-600" /> : <Copy className="w-4.5 h-4.5" />}
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  ✓ This unique download link has been <strong>automatically sent and saved to your Account Profile page</strong> for permanent lifetime access.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                {/* 1. Direct Download Button */}
                <button
                  onClick={() => handleDownloadNow(booksToBuy[0])}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  <span>Download PDF Now</span>
                </button>

                {/* 2. Go to Profile Page Button */}
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToProfile();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                >
                  <User className="w-5 h-5" />
                  <span>View in Account Profile & Library</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={onClose}
                  className="text-sm text-slate-500 hover:text-slate-800 font-semibold pt-1 cursor-pointer"
                >
                  Close & Continue Browsing
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
