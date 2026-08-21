import React, { useState } from "react";
import { Mail, MessageSquare, Send, HelpCircle, Check } from "lucide-react";
import InputItem from "../InputItem";
const Help = () => {
  const [formData, setFormData] = useState({
    subject: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ subject: "", email: "", message: "" });
    }, 2500);
  };

  return (
    <div className="w-full max-w-2xl">
      {/* Heading */}
      <div>
        <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight text-heading-text">
          Help & Support
          <HelpCircle className="w-5 h-5 text-blue-600" />
        </h1>
        <p className="mt-1 text-xs text-subtext">
          Have a question or running into an issue? Let us know how we can help.
        </p>
      </div>

      <hr className="my-5 border-border-color" />

      {/* Help Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        {/* Email & Subject Inputs */}
        <div className="flex flex-col items-center justify-center w-full gap-4 sm:flex-row">
          <InputItem
            Icon={Mail}
            changeFunct={handleChange}
            identity={"email"}
            label={"Email Address"}
            placeholder={"john.doe@example.com"}
            value={formData.email}
          />

          <InputItem
            Icon={MessageSquare}
            changeFunct={handleChange}
            identity={"subject"}
            label={"Subject"}
            placeholder={"How can we help?"}
            value={formData.subject}
          />
        </div>

        {/* Message Textarea */}
        <div className="flex flex-col gap-1.5 w-full">
          <label
            htmlFor="message"
            className="text-xs font-semibold tracking-wider uppercase text-body-text"
          >
            Describe Your Issue
          </label>
          <div className="relative flex">
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Provide details about what you need assistance with..."
              value={formData.message}
              onChange={handleChange}
              className="w-full text-sm font-medium transition-all py-2.5 pr-3 pl-3 border rounded-xl border-border-color focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent text-body-text resize-none max-h-75"
            />
          </div>
        </div>

        {/* Submit Action */}
        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 shadow-sm text-white ${
              isSubmitted
                ? "bg-emerald-600"
                : "bg-brand-accent hover:bg-hover-blue"
            }`}
          >
            {isSubmitted ? (
              <>
                <Check size={16} />
                Message Sent!
              </>
            ) : (
              <>
                <Send size={15} />
                Send Request
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Help;
