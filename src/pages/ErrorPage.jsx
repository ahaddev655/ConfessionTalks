import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Compass, ArrowLeft, Home } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-app-bg text-body-text selection:bg-brand-accent selection:text-white">
      <div className="w-full max-w-md p-8 transition-all duration-300 border shadow-xl shadow-slate-200/50 rounded-2xl bg-card-bg border-borderbg-border-color">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Visual Graphic Element */}
          <div className="flex items-center justify-center w-20 h-20 mb-5 rounded-full bg-brand-accent/10 text-brandbg-brand-accent">
            <Compass className="w-10 h-10 animate-spin-slow" />
          </div>

          {/* Error Status & Header */}
          <span className="text-xs font-bold tracking-widest uppercase text-brandbg-brand-accent">
            Error 404
          </span>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-heading-text sm:text-3xl">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="mt-3 text-sm leading-relaxed text-subtext">
            Sorry about that! The page you’re looking for is either under
            construction or has moved. Please check back soon or head back to
            our homepage.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse items-center justify-center w-full gap-3 mt-8 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-sm font-semibold transition-all duration-200 rounded-xl text-heading-text bg-border-color/50 hover:bg-border-color active:scale-[0.98] cursor-pointer focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>

            <Link to="/en" className="w-full sm:w-auto">
              <button
                type="button"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 rounded-xl bg-brand-accent hover:bg-hover-blue active:scale-[0.98] shadow-md hover:shadow-lg cursor-pointer focus:outline-none"
              >
                <Home className="w-4 h-4" />
                Go Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
