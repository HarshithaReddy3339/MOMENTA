import React, { useState, useEffect } from 'react';
import { NavigationPage, ContactFormData, EventPlan, Vendor } from '../../types';
import { Mail, Phone, MapPin, Send, CheckCircle2, Instagram, Facebook, Linkedin, Clock, AlertCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';

interface ContactPageProps {
  onNavigate: (page: NavigationPage) => void;
  prefillPlan?: EventPlan | null;
  prefillVendor?: Vendor | null;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  prefillPlan,
  prefillVendor
}) => {
  const { user, profile } = useAuth();

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    eventType: 'Wedding Celebration',
    eventDate: '2026-11-20',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submissionDate, setSubmissionDate] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    fullName?: string;
    email?: string;
    message?: string;
  }>({});

  // Auto-fill logged-in user credentials if available and fields are empty
  useEffect(() => {
    if (user && !formData.fullName && !formData.email) {
      setFormData((prev) => ({
        ...prev,
        fullName: profile?.name || user.displayName || prev.fullName,
        email: user.email || prev.email,
        phone: profile?.phoneNumber || prev.phone
      }));
    }
  }, [user, profile]);

  useEffect(() => {
    if (prefillPlan) {
      setFormData((prev) => ({
        ...prev,
        eventType: prefillPlan.details.eventType,
        eventDate: prefillPlan.details.date,
        message: `Inquiring about MOMENTA Plan ${prefillPlan.id} for ${prefillPlan.details.location} with ${prefillPlan.details.guestCount} guests. Target budget: ₹${(prefillPlan.totalBudget / 100000).toFixed(1)} Lakhs. Preferred venue: ${prefillPlan.preferences.venueType}.`
      }));
    } else if (prefillVendor) {
      setFormData((prev) => ({
        ...prev,
        message: `Inquiring about booking / quote for artisan: ${prefillVendor.name} (${prefillVendor.category}) in ${prefillVendor.location}.`
      }));
    }
  }, [prefillPlan, prefillVendor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submissions

    const trimmedName = formData.fullName.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    // Validation
    const errors: { fullName?: string; email?: string; message?: string } = {};

    if (!trimmedName) {
      errors.fullName = 'Full Name is required.';
    } else if (/\d/.test(trimmedName)) {
      errors.fullName = 'Full Name must not contain numbers.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      errors.email = 'Email Address is required.';
    } else if (!emailRegex.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!trimmedMessage) {
      errors.message = 'Message must not be empty.';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      // Retrieve currently authenticated Firebase user uid, or null for guests
      const currentUserId = auth.currentUser?.uid || user?.uid || null;

      // Save to Cloud Firestore in contact_submissions collection
      await addDoc(collection(db, 'contact_submissions'), {
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
        userId: currentUserId,
        phone: formData.phone.trim(),
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        submittedAt: serverTimestamp()
      });

      // Format submission date as DD/MM/YYYY for application display
      const now = new Date();
      const dd = String(now.getDate()).padStart(2, '0');
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const yyyy = now.getFullYear();
      setSubmissionDate(`${dd}/${mm}/${yyyy}`);

      // Section 7: Clear Name, Email, Message and show success
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        eventType: 'Wedding Celebration',
        eventDate: '2026-11-20',
        message: ''
      });
    } catch (error) {
      console.error('[MOMENTA Contact Submission Error]', error);
      // Section 8: Display exact failure message without clearing user entered inputs
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 lg:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D96035]">
            Concierge & Inquiries
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#261F1D] leading-[1.15] text-balance">
            Let's Plan Something Memorable.
          </h1>
          <p className="text-base sm:text-lg text-[#665751] leading-relaxed max-w-2xl">
            Have an event in mind? Tell us what you're planning and we'll help you take the next step.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Contact Details & Info (5 columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-[#EDE2D8] shadow-xs space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#261F1D]">
                MOMENTA Atelier
              </h3>
              <p className="text-sm text-[#6E615B] leading-relaxed">
                Our team of senior planning directors and culinary liaisons are based in Hyderabad, coordinating extraordinary occasions across India.
              </p>

              <div className="space-y-4 text-sm pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#FAF0E8] flex items-center justify-center text-[#D96035] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#9B8E88] block">
                      Atelier Location
                    </span>
                    <span className="font-medium text-[#261F1D]">
                      Road No. 36, Jubilee Hills, Hyderabad 500033, India
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#FAF0E8] flex items-center justify-center text-[#D96035] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#9B8E88] block">
                      Email Inquiries
                    </span>
                    <a
                      href="mailto:hello@momenta.com"
                      className="font-medium text-[#261F1D] hover:text-[#D96035] transition-colors"
                    >
                      hello@momenta.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#FAF0E8] flex items-center justify-center text-[#D96035] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#9B8E88] block">
                      Direct Telephone
                    </span>
                    <a
                      href="tel:+919849012345"
                      className="font-medium text-[#261F1D] hover:text-[#D96035] transition-colors"
                    >
                      +91 98490 12345
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#FAF0E8] flex items-center justify-center text-[#D96035] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#9B8E88] block">
                      Atelier Hours
                    </span>
                    <span className="font-medium text-[#261F1D]">
                      Monday – Saturday · 10:00 AM – 7:30 PM IST
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-[#F2EAE2] space-y-2">
                <span className="text-xs uppercase font-mono tracking-wider text-[#9B8E88] block">
                  Connect on Social
                </span>
                <div className="flex items-center space-x-3 text-[#5A4D46]">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-[#FAF0E8] flex items-center justify-center hover:bg-[#D96035] hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-[#FAF0E8] flex items-center justify-center hover:bg-[#D96035] hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-[#FAF0E8] flex items-center justify-center hover:bg-[#D96035] hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form (7 columns) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#EDE2D8] shadow-xs">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-5 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#FDEEE7] text-[#D96035] mx-auto flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-3 max-w-md mx-auto">
                    <h3 className="font-serif text-3xl font-bold text-[#261F1D]">
                      Thank you! We received your message and we'll get back to you soon.
                    </h3>
                    {submissionDate && (
                      <p className="text-xs font-mono uppercase tracking-widest text-[#7C6A61]">
                        Submitted on {submissionDate}
                      </p>
                    )}
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setErrorMessage(null);
                        setValidationErrors({});
                      }}
                      className="px-6 py-2.5 rounded-full border border-[#D5C6BA] text-xs font-semibold text-[#5A4D46] hover:bg-[#F2E8DE] transition-colors cursor-pointer"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#261F1D]">
                      Send an Enquiry
                    </h3>
                    <p className="text-xs sm:text-sm text-[#73645D] mt-1">
                      Fill out your key dates and desires below. Our team handles the rest.
                    </p>
                  </div>

                  {/* Submission Error Banner */}
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-[#FFF5F5] border border-[#FED7D7] text-xs text-[#C53030] flex items-center gap-2.5 animate-in fade-in duration-200">
                      <AlertCircle className="w-4 h-4 shrink-0 text-[#E53E3E]" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-xs uppercase font-mono tracking-wider text-[#695B54]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (validationErrors.fullName) {
                            setValidationErrors((prev) => ({ ...prev, fullName: undefined }));
                          }
                        }}
                        placeholder="e.g. Ananya Rao"
                        className={`w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border text-sm text-[#261F1D] focus:outline-hidden ${
                          validationErrors.fullName ? 'border-[#E53E3E] bg-[#FFF5F5]' : 'border-[#EDE2D8] focus:border-[#D96035]'
                        }`}
                      />
                      {validationErrors.fullName && (
                        <p className="text-[11px] text-[#C53030] flex items-center gap-1 pt-0.5">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{validationErrors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs uppercase font-mono tracking-wider text-[#695B54]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (validationErrors.email) {
                            setValidationErrors((prev) => ({ ...prev, email: undefined }));
                          }
                        }}
                        placeholder="ananya@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border text-sm text-[#261F1D] focus:outline-hidden ${
                          validationErrors.email ? 'border-[#E53E3E] bg-[#FFF5F5]' : 'border-[#EDE2D8] focus:border-[#D96035]'
                        }`}
                      />
                      {validationErrors.email && (
                        <p className="text-[11px] text-[#C53030] flex items-center gap-1 pt-0.5">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{validationErrors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-xs uppercase font-mono tracking-wider text-[#695B54]">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98490 00000"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#EDE2D8] text-sm text-[#261F1D] focus:outline-hidden focus:border-[#D96035]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs uppercase font-mono tracking-wider text-[#695B54]">
                        Event Type
                      </label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#EDE2D8] text-sm text-[#261F1D] focus:outline-hidden focus:border-[#D96035]"
                      >
                        <option value="Wedding Celebration">Wedding Celebration</option>
                        <option value="Anniversary Gala">Anniversary Gala</option>
                        <option value="Milestone Birthday">Milestone Birthday</option>
                        <option value="Corporate Soirée">Corporate Soirée</option>
                        <option value="Private Intimate Dinner">Private Intimate Dinner</option>
                        <option value="Cultural Festivity">Cultural Festivity</option>
                        <option value="Cocktail Reception">Cocktail Reception</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase font-mono tracking-wider text-[#695B54]">
                      Anticipated Event Date
                    </label>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#EDE2D8] text-sm text-[#261F1D] focus:outline-hidden focus:border-[#D96035]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase font-mono tracking-wider text-[#695B54]">
                      Your Message or Vision Notes *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (validationErrors.message) {
                          setValidationErrors((prev) => ({ ...prev, message: undefined }));
                        }
                      }}
                      placeholder="Share details on guest count, aesthetic preferences, catering desires or specific questions..."
                      className={`w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border text-sm text-[#261F1D] focus:outline-hidden ${
                        validationErrors.message ? 'border-[#E53E3E] bg-[#FFF5F5]' : 'border-[#EDE2D8] focus:border-[#D96035]'
                      }`}
                    />
                    {validationErrors.message && (
                      <p className="text-[11px] text-[#C53030] flex items-center gap-1 pt-0.5">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{validationErrors.message}</span>
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs uppercase font-semibold tracking-wider transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Send Enquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-[#8C7B73]">
                    We treat all event inquiries with strict privacy. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
