import React, { useState } from "react";
import { LuUser } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import InputItem from "../components/InputItem";
import GoogleIcon from "../assets/google.png";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, RotateCw, User } from "lucide-react";
import axios from "axios";
import { useEffect } from "react";

const AuthenticationPage = () => {
  // ---- Variables ----
  const id = localStorage.getItem("cota_id");
  const navigate = useNavigate();

  // ---- User Data Object ----
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
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
    if (loading) {
      return;
    }

    if (!login) {
      // ---- Validations ----
      if (
        !formData.firstname ||
        !formData.lastname ||
        !formData.username ||
        !formData.email ||
        !formData.password
      ) {
        toast.error("All Fields are required.");
        return;
      }
      if (formData?.username?.trim().includes(" ")) {
        toast.error("UserName is invalid");
        return;
      }
      if (formData?.username?.trim().includes("@")) {
        toast.error("Please remove @ from username");
        return;
      }
      if (formData.password?.length < 8) {
        toast.error("Password must consist of 8 characters");
        return;
      }
      if (!formData.terms) {
        toast.error("You must agree to the terms and policies.");
        return;
      }

      // Configure Loading
      setLoading(true);

      // API Configuration
      axios
        .post("http://localhost:3000/api/auth/register", formData, {
          withCredentials: true, // To accept cookie
        })
        .then((response) => {
          setTimeout(() => {
            toast.success(response?.data.message || "Registeration Successful");
          }, 1500);

          // Reset all the fields
          setFormData({
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            password: "",
            rememberMe: false,
            terms: false,
          });

          // store the id in local storage
          localStorage.setItem("cota_id", response?.data.id);
          setTimeout(() => {
            navigate("/en");
          }, 2500);
        })
        .catch((error) => {
          setTimeout(() => {
            toast.error(error?.response?.data.error || "Internal Server Error");
          }, 1500);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false); // Deconfigure Loading
          }, 1500);
        });
      return;
    }

    // ---- Validations ----
    if (!formData.email || !formData.password) {
      toast.error("All Fields are required.");
      return;
    }

    // Configure Loading
    setLoading(true);

    // Configure Payload
    const payload = {
      email: formData.email,
      password: formData.password,
    };

    // API Configuration
    axios
      .post("http://localhost:3000/api/auth/login", payload, {
        withCredentials: true, // To accept cookie
      })
      .then((response) => {
        setTimeout(() => {
          toast.success(response?.data.message || "Registeration Successful");
        }, 1500);

        // id set to local
        localStorage.setItem("cota_id", response?.data.id);

        // Reset all the fields
        setFormData({
          email: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/en");
        }, 2500);
      })
      .catch((error) => {
        setTimeout(() => {
          toast.error(error?.response?.data.error || "Internal Server Error");
        }, 1500);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false); // Deconfigure Loading
        }, 1500);
      });
  };

  // ---- UseEffects ----
  useEffect(() => {
    if (!id || id === null) {
      toast.error("ID not found");
      return;
    }
    axios
      .get(`http://localhost:3000/api/auth/verify/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        navigate("/en");
      })
      .catch((error) => {});
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 bg-app-bg text-body-text selection:bg-brand-accent selection:text-white">
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
      <div className="w-full max-w-md px-8 py-8 transition-all duration-300 border shadow-xl bg-card-bg border-border-color shadow-slate-200/50 rounded-2xl">
        {/* Form Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-heading-text">
            Confession<span className="text-brand-accent">Talks</span>
          </h1>
          <p className="mt-1.5 text-sm font-medium text-subtext">
            {login
              ? "Login to continue chatting!"
              : "Create an account to join conversations"}
          </p>
        </div>

        {/* Form */}
        <div>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {!login && (
              <>
                <div className="flex items-center justify-center gap-2">
                  {/* First Name */}
                  <InputItem
                    changeFunct={handleInputChange}
                    Icon={User}
                    identity={"firstname"}
                    label={"First Name"}
                    placeholder={"John"}
                    value={formData.firstname}
                  />

                  {/* Last Name */}
                  <InputItem
                    changeFunct={handleInputChange}
                    Icon={User}
                    identity={"lastname"}
                    label={"Last Name"}
                    placeholder={"Doe"}
                    value={formData.lastname}
                  />
                </div>

                {/* Username */}
                <InputItem
                  changeFunct={handleInputChange}
                  identity={"username"}
                  label={"Username"}
                  placeholder={"johndoe112"}
                  value={formData.username}
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
              identity={"password"}
              Icon={Lock}
              label={"Password"}
              placeholder={"••••••••••••"}
              value={formData.password}
            />

            {/* CheckBoxes */}
            {!login && (
              <div className="flex flex-col gap-2.5 pt-1">
                {/* Remember Me */}
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="checkbox"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-xs font-medium transition-colors cursor-pointer select-none text-subtext hover:text-body-text"
                  >
                    Remember me for 1 week
                  </label>
                </div>

                {/* Terms and Policies */}
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    checked={formData.terms}
                    onChange={handleInputChange}
                    className="checkbox"
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs font-medium leading-normal cursor-pointer select-none text-subtext"
                  >
                    You agree to the{" "}
                    <span className="font-semibold text-brand-accent hover:underline">
                      <Link to={"/policies"}>terms</Link>
                    </span>{" "}
                    and{" "}
                    <span className="font-semibold text-brand-accent hover:underline">
                      <Link to={"/policies"}>policies</Link>{" "}
                    </span>{" "}
                    of ConfessionTalks
                  </label>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 flex items-center justify-center gap-2 py-3 px-4 bg-brand-accent hover:bg-hover-blue active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              {loading && <RotateCw className="w-4 h-4 animate-spin" />}
              {loading
                ? login
                  ? "Signing you in..."
                  : "Creating Account..."
                : login
                  ? "Sign In"
                  : "Create Account"}
              {!loading && <FaArrowRightLong className="w-4 h-4 shrink-0" />}
            </button>
          </form>

          {/* SignUp Switching */}
          <p className="mt-6 text-xs font-medium text-center text-subtext">
            {login ? "Don't have an account?" : "Already have an account?"}{" "}
            <span className="font-semibold transition-colors text-brand-accent hover:text-hoverbg-hover-blue">
              <button
                type="button"
                onClick={() => setLogin(!login)}
                className="cursor-pointer hover:underline focus:outline-hidden"
              >
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
