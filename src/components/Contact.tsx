import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, PhoneCall, Mail, MessageSquare, ArrowRight, Instagram, Linkedin, SendToBack, Check } from "lucide-react";
import { MessageForm } from "../types";

export default function Contact({ isStandalone = false }: { isStandalone?: boolean }) {
  const [form, setForm] = useState<MessageForm>({
    name: "",
    businessName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    setIsSubmitting(true);

    // Simulate elite server response
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setForm({
        name: "",
        businessName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });

      // Timeout result view
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section
      id="contact"
      className={`relative w-full px-6 sm:px-12 bg-[#080808] overflow-hidden ${isStandalone ? "py-16 sm:py-24" : "py-24 sm:py-32 border-t border-white/5"}`}
    >
      <div className="absolute bottom-[5%] left-[5%] w-[450px] h-[350px] bg-white/1 rounded-full blur-[140px] pointer-events-none select-none" />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 relative z-10" id="contact-outer-container">
        {/* LHS Contact Information & Hub */}
        <div className="flex flex-col justify-between items-start lg:w-5/12 gap-10 text-left" id="contact-lhs-meta">
          <div className="flex flex-col gap-6">
            <span className="font-mono text-[9px] tracking-[0.35em] text-neutral-500 uppercase select-none">
              Inquire Now
            </span>
            <h2 className="text-4xl sm:text-5xl font-sans font-medium text-white tracking-tight leading-[1.1]" id="contact-title">
              Let's Create <br /> Something Real.
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed font-sans max-w-sm">
              Have a hospitality spot, bespoke store, or startup ready for the next level? File a brief query. We respond within several hours.
            </p>
          </div>

          {/* Connected Hub Hooks */}
          <div className="flex flex-col gap-5 w-full" id="contact-hooks-container">
            {/* WhatsApp Integration Link */}
            <a
              href="https://wa.me/919999999999?text=Hi%20HRBY%20Solutions,%20I'd%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between p-4 bg-neutral-950/40 hover:bg-neutral-950 border border-white/5 hover:border-white/12 rounded-2xl transition-all duration-300 w-full"
              id="contact-whatsapp-link"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <span className="block text-xs font-mono text-neutral-500 uppercase tracking-widest leading-none mb-1">
                    Direct WhatsApp
                  </span>
                  <span className="block text-sm font-sans font-medium text-white">
                    +91 99999 99999
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </a>

            {/* Email Contact Link */}
            <a
              href="mailto:hello@hrby.com"
              className="group flex items-center justify-between p-4 bg-neutral-950/40 hover:bg-neutral-950 border border-white/5 hover:border-white/12 rounded-2xl transition-all duration-300 w-full"
              id="contact-email-link"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-100/10 border border-white/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-neutral-200" />
                </div>
                <div>
                  <span className="block text-xs font-mono text-neutral-500 uppercase tracking-widest leading-none mb-1">
                    Send Email
                  </span>
                  <span className="block text-sm font-sans font-medium text-white">
                    hello@hrby.com
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </a>
          </div>

          {/* Socials Block */}
          <div className="flex items-center gap-3 pt-6 border-t border-white/5 w-full text-neutral-500" id="contact-socials-block">
            <span className="font-mono text-[9px] uppercase tracking-widest mr-2 select-none">
              NETWORKS
            </span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors border border-white/5 px-3 py-1 rounded-full bg-neutral-950/20"
              id="social-instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span className="font-sans font-medium text-[10px]">INSTAGRAM</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors border border-white/5 px-3 py-1 rounded-full bg-neutral-950/20"
              id="social-linkedin"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span className="font-sans font-medium text-[10px]">LINKEDIN</span>
            </a>
          </div>
        </div>

        {/* RHS Form Layout */}
        <div className="w-full lg:w-7/12" id="contact-rhs-form">
          <form
            onSubmit={handleSubmit}
            className="relative bg-neutral-950/40 border border-white/5 rounded-3xl p-6 sm:p-10 flex flex-col gap-6"
            id="creative-contact-form"
          >
            {/* Input - Name */}
            <div className="flex flex-col text-left gap-1.5">
              <label htmlFor="name-input" className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-500 select-none">
                Full Name *
              </label>
              <input
                id="name-input"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleInputChange}
                placeholder="E.g., Alexander Wright"
                className="w-full bg-neutral-950 border border-white/5 focus:border-white/20 focus:ring-1 focus:ring-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all"
              />
            </div>

            {/* Row: Company / Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col text-left gap-1.5">
                <label htmlFor="businessName-input" className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-500 select-none">
                  Business Name
                </label>
                <input
                  id="businessName-input"
                  name="businessName"
                  type="text"
                  value={form.businessName}
                  onChange={handleInputChange}
                  placeholder="E.g., Aura Resort"
                  className="w-full bg-neutral-950 border border-white/5 focus:border-white/20 focus:ring-1 focus:ring-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col text-left gap-1.5">
                <label htmlFor="email-input" className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-500 select-none">
                  Email Address *
                </label>
                <input
                  id="email-input"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="E.g., alex@resort.com"
                  className="w-full bg-neutral-950 border border-white/5 focus:border-white/20 focus:ring-1 focus:ring-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all"
                />
              </div>
            </div>

            {/* Input - Phone */}
            <div className="flex flex-col text-left gap-1.5">
              <label htmlFor="phoneNumber-input" className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-500 select-none">
                Phone Number
              </label>
              <input
                id="phoneNumber-input"
                name="phoneNumber"
                type="tel"
                value={form.phoneNumber}
                onChange={handleInputChange}
                placeholder="E.g., +91 99999 99999"
                className="w-full bg-neutral-950 border border-white/5 focus:border-white/20 focus:ring-1 focus:ring-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all"
              />
            </div>

            {/* Input - Message */}
            <div className="flex flex-col text-left gap-1.5">
              <label htmlFor="message-input" className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-500 select-none">
                Brief Project Scope *
              </label>
              <textarea
                id="message-input"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleInputChange}
                placeholder="Describe your design, layout expectations, or timeline guidelines..."
                className="w-full bg-neutral-950 border border-white/5 focus:border-white/20 focus:ring-1 focus:ring-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none resize-none transition-all"
              />
            </div>

            {/* Action triggering simulated elite dispatch state */}
            <button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              id="submit-contact-form"
              className={`w-full py-4 rounded-xl font-sans uppercase tracking-[0.15em] text-xs font-semibold flex items-center justify-center gap-2 border select-none transition-all duration-300 ${
                isSubmitting
                  ? "bg-neutral-900 border-neutral-800 text-neutral-500 cursor-not-allowed"
                  : isSubmitted
                  ? "bg-neutral-950 border-neutral-700 text-green-400 cursor-none"
                  : "bg-white border-white text-black hover:bg-neutral-900 hover:text-white"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending Project Scope...
                </>
              ) : isSubmitted ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  Message Safely Dispatched!
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-3.5 h-3.5 ml-1" />
                </>
              )}
            </button>

            {/* Subtle disclaimer message overlay transitions */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-4 rounded-xl border border-green-500/10 bg-green-500/2 text-[11px] leading-relaxed text-green-400 text-center"
                  id="form-submission-toast"
                >
                  Thank you! Your scope has been securely channeled. Our lead architect will be in touch shortly.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}
