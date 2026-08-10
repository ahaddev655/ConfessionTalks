import React, { useState } from "react";
import { LuUser } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import InputItem from "../components/InputItem";
import GoogleIcon from "../assets/google.png";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, User } from "lucide-react";

const AuthenticationPage = () => {
  // ---- Variables ----
  const navigate = useNavigate();

  // ---- User Data Object ----
  const [formData, setFormData] = useState({
    fname: "",
    uname: "",
    email: "",
    pass: "",
    rememberMe: false,
    terms: false,
  });

  // ---- UseStates ----
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---- Input Handlers ----
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ---- Form Submit ----
  const handleSubmit = () => {
    if (!login) {
      // ---- Validations ----
      if (
        !formData.uname ||
        !formData.fname ||
        !formData.email ||
        !formData.pass
      ) {
        toast.error("All Fields are required.");
        return;
      }
      if (formData?.uname?.trim().includes(" ")) {
        toast.error("UserName is invalid");
        return;
      }
      if (formData.pass?.length < 8) {
        toast.error("Password must consist of 8 characters");
        return;
      }
      if (!formData.terms) {
        toast.error("You must agree to the terms and policies.");
        return;
      }
    }
    const payload = {
      fname: "",
      uname: "",
      email: "",
      pass: "",
      rememberMe: false,
    };

    toast.success("Form Submitted Successfully");
    localStorage.setItem("ct_id", "1234567890");
    navigate("/home");

    setFormData({
      fname: "",
      uname: "",
      email: "",
      pass: "",
      rememberMe: false,
      terms: false,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      {/* Toaster */}
      <ToastContainer
        autoClose={1500}
        theme="light"
        closeButton={false}
        hideProgressBar
        position="bottom-right"
        limit={5}
      />

      {/* Form Card */}
      <div className="w-full max-w-md px-6 py-6 bg-white shadow-xl rounded-xl">
        {/* Form Heading */}
        <div className="mb-5 text-center">
          <h1 className="text-3xl font-black tracking-tight text-heading-text">
            Confession<span className="text-brand-accent">Talks</span>
          </h1>
          <p className="mt-1 text-sm text-subtext">
            {login
              ? "Login to continue chatting!"
              : "Create an account to join conversations"}
          </p>
        </div>

        {/* Form */}
        <div>
          <form
            className="space-y-2.5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {!login && (
              <>
                {/* Full Name */}
                <InputItem
                  changeFunct={handleInputChange}
                  Icon={User}
                  identity={"fname"}
                  label={"Full Name"}
                  placeholder={"John Doe"}
                  value={formData.fname}
                />

                {/* Username */}
                <InputItem
                  changeFunct={handleInputChange}
                  identity={"uname"}
                  label={"Username"}
                  placeholder={"johndoe112"}
                  value={formData.uname}
                />
              </>
            )}

            {/* Email */}
            <InputItem
              changeFunct={handleInputChange}
              identity={"email"}
              Icon={Mail}
              label={"Email Address"}
              placeholder={"johndoe@example.com"}
              value={formData.email}
            />

            {/* Password */}
            <InputItem
              changeFunct={handleInputChange}
              identity={"pass"}
              Icon={Lock}
              label={"Password"}
              placeholder={"••••••••••••"}
              value={formData.pass}
            />

            {/* CheckBoxes */}
            {!login && (
              <div className="flex flex-col gap-2 pt-1">
                {/* Remember Me */}
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="checkbox shrink-0 mt-0.5"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-xs font-normal leading-tight cursor-pointer select-none text-subtext"
                  >
                    Remember Me
                  </label>
                </div>

                {/* Terms and Policies */}
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    checked={formData.terms}
                    onChange={handleInputChange}
                    className="checkbox shrink-0 mt-0.5"
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs font-normal leading-tight cursor-pointer select-none text-subtext"
                  >
                    You agree to the terms and policies of ConfessionTalks
                  </label>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4! flex items-center justify-center gap-2 py-2.5 px-4 bg-brand-accent hover:bg-hover-blue active:bg-blue-800 text-white text-base font-medium rounded-lg shadow-md shadow-indigo-200 hover:shadow-lg transition duration-200"
            >
              {loading
                ? login
                  ? "Signing you in..."
                  : "Creating Account..."
                : login
                  ? "Sign In"
                  : "Create Account"}
              <FaArrowRightLong className="w-4 h-4 shrink-0" />
            </button>
          </form>

          {/* Google Login */}
          <div className="mt-4">
            {/* Divider */}
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="w-full h-px bg-gray-200" />
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                OR
              </span>
              <div className="w-full h-px bg-gray-200" />
            </div>

            {/* Button */}
            <button
              type="button"
              className="bg-white shadow-sm w-full flex items-center justify-center border border-border-color py-2.5 rounded-lg gap-2.5 text-base font-semibold text-body-text hover:shadow-md transition-shadow"
            >
              <img
                src={GoogleIcon}
                alt="Google Icon"
                className="object-contain w-5 h-5 shrink-0"
              />
              Continue With Google
            </button>
          </div>

          {/* SignUp Switching */}
          <p className="mt-4 text-xs font-medium text-center text-subtext">
            {login ? "Don't have an account?" : "Already have an account?"}{" "}
            <span className="transition-colors text-brand-accent hover:text-hover-blue">
              <button type="button" onClick={() => setLogin(!login)}>
                {login ? "Sign Up" : "Sign In"}
              </button>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
