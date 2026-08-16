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
    if (loading) {
      return;
    }

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
      if (formData?.uname?.trim().includes("@")) {
        toast.error("Please remove @ from username");
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
            fname: "",
            uname: "",
            email: "",
            pass: "",
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
    if (!formData.email || !formData.pass) {
      toast.error("All Fields are required.");
      return;
    }

    // Configure Loading
    setLoading(true);

    // Configure Payload
    const payload = {
      email: formData.email,
      pass: formData.pass,
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
          pass: "",
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
                    Remember me for 1 week
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
                    You agree to the{" "}
                    <span className="text-brand-accent">
                      <Link to={"/policies"}>terms</Link>
                    </span>{" "}
                    and{" "}
                    <span className="text-brand-accent">
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
              className="w-full mt-4! flex items-center justify-center gap-2 py-2.5 px-4 bg-brand-accent hover:bg-hover-blue active:bg-blue-800 text-white text-base font-medium rounded-lg shadow-md shadow-indigo-200 hover:shadow-lg transition duration-200"
            >
              {loading && <RotateCw className="animate-spin" />}
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
