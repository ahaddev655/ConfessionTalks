import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Compass, ArrowLeft, Home } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-background-bg">
      <div className="w-full max-w-md p-6 border shadow-2xl rounded-2xl bg-card-bg border-border-color">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Visual Graphic Element */}
          <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-brand-accent/10 text-brand-accent">
            <Compass className="w-10 h-10 animate-spin-slow" />
          </div>

          {/* Error Status & Header */}
          <span className="text-sm font-semibold tracking-wider uppercase text-brand-accent">
            Error 404
          </span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-heading-text sm:text-3xl">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="mt-3 text-sm leading-relaxed text-body-text/80">
            Sorry about that! The page you’re looking for is either under
            construction or has moved. Please check back soon or head back to
            our homepage.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse items-center justify-center w-full gap-3 mt-6 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 text-sm font-medium transition-all rounded-lg text-heading-text bg-border-color/30 hover:bg-border-color/60 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>

            <Link to="/en" className="w-full sm:w-auto">
              <button
                type="button"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white transition-all rounded-lg bg-brand-accent hover:opacity-90 active:scale-[0.98] shadow-md focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
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
