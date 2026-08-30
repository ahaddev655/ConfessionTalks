import React, { useState } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";

const PrivacyCenter = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How is my personal data protected?",
      answer:
        "We use end-to-end encryption for private communications and strictly store your account credentials using hashed security protocols. Your personal data is never sold to third-party advertisers.",
    },
    {
      question: "Who can see my public profile and posts?",
      answer:
        "Depending on your Account Privacy settings, your profile and confessions can either be visible to everyone or restricted strictly to approved followers.",
    },
    {
      question: "Can I download a copy of my data?",
      answer:
        "Yes, you can request an archive file containing your post history, comments, and account information directly through your Privacy & Data settings.",
    },
    {
      question: "How do I permanently delete my account?",
      answer:
        "You can initiate account deletion from the Account Privacy tab. Once confirmed, all your confessions, messages, and profile information will be permanently purged after a 30-day grace period.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-2xl px-4 py-6 mx-auto sm:px-6">
      {/* Heading */}
      <div className="space-y-1">
        <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl text-heading-text">
          Privacy Center
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
        </h1>
        <p className="text-xs sm:text-sm text-subtext">
          Learn how we handle your data and manage your privacy rights.
        </p>
      </div>

      <hr className="my-5 border-border-color" />

      {/* Accordion Container */}
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`overflow-hidden transition-all duration-200 bg-white border rounded-xl ${
                isOpen
                  ? "border-brand-accent/40 shadow-sm ring-1 ring-brand-accent/20"
                  : "border-border-color"
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                onClick={() => toggleAccordion(index)}
                className="flex items-center justify-between w-full p-3.5 sm:p-4 text-xs sm:text-sm font-semibold text-left transition-colors gap-3 text-heading-text hover:bg-slate-50"
              >
                <span className="leading-snug">{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-slate-400 transition-transform duration-300 ease-in-out ${
                    isOpen ? "rotate-180 text-brand-accent" : ""
                  }`}
                />
              </button>

              {/* Animated Collapsible Body */}
              <div
                id={`faq-answer-${index}`}
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-3.5 sm:px-4 pt-2 pb-4 text-xs leading-relaxed border-t text-subtext border-slate-100 sm:text-xs">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrivacyCenter;
