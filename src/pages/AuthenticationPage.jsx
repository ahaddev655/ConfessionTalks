import { useRef, useState, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import InputItem from "../components/InputItem";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, RotateCw, User, Camera } from "lucide-react";
import axios from "axios";

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

  // ---- States ----
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [profilePreview, setProfilePreview] = useState(
    "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg",
  );
  const [profileFile, setProfileFile] = useState(null);

  // ---- UseRefs ----
  const profileInputRef = useRef(null);

  // ---- Input Handlers ----
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProfileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfilePreview(imageUrl);
    }
  };

  // ---- Auth Submit (Register / Login) ----
  const handleSubmit = () => {
    if (loading) return;

    if (!login) {
      // ---- Registration Validations ----
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

      setLoading(true);

      axios
        .post(`${import.meta.env.VITE_LOCAL_API_URL}/auth/register`, formData, {
          withCredentials: true,
        })
        .then((response) => {
          toast.success(response?.data.message || "Registration Successful");

          // Store the id in local storage
          localStorage.setItem("cota_id", response?.data.id);

          // Transition to Profile Setup window
          setFormSubmitted(true);
        })
        .catch((error) => {
          toast.error(error?.response?.data.error || "Internal Server Error");
        })
        .finally(() => {
          setLoading(false);
        });
      return;
    }

    // ---- Login Validations ----
    if (!formData.email || !formData.password) {
      toast.error("All Fields are required.");
      return;
    }

    setLoading(true);

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    axios
      .post(`${import.meta.env.VITE_LOCAL_API_URL}/auth/login`, payload, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response?.data.message || "Login Successful");
        localStorage.setItem("cota_id", response?.data.id);

        setTimeout(() => {
          navigate("/en");
        }, 1500);
      })
      .catch((error) => {
        toast.error(error?.response?.data.error || "Internal Server Error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // ---- Profile Picture Upload Handler ----
  const handleProfileSubmit = () => {
    if (loading) return;

    const currentId = localStorage.getItem("cota_id");

    // Skip if user didn't select an image
    if (!profileFile) {
      navigate("/en");
      return;
    }

    setLoading(true);

    const payload = new FormData();
    payload.append("profilePic", profileFile);

    axios
      .post(
        `${import.meta.env.VITE_LOCAL_API_URL}/auth/upload-profile/${currentId}`,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      )
      .then((response) => {
        toast.success(response?.data.message || "Profile updated!");
        setTimeout(() => {
          navigate("/en");
        }, 1500);
      })
      .catch((error) => {
        toast.error(error?.response?.data.error || "Failed to upload image");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // ---- Session Verification ----
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_LOCAL_API_URL}/auth/verify/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        navigate("/en");
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <ToastContainer
        autoClose={1500}
        theme="light"
        closeButton={false}
        hideProgressBar
        position="bottom-right"
        limit={5}
      />

      {/* Main Registration/Login Form */}
      {!formSubmitted && (
        <div className="flex justify-center items-center px-4 min-h-screen sm:px-6 bg-app-bg text-body-text selection:bg-brand-accent selection:text-white">
          <div className="px-8 py-8 w-full max-w-md rounded-2xl border shadow-xl transition-all duration-300 bg-card-bg border-border-color shadow-slate-200/50">
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
                    <div className="flex gap-2 justify-center items-center">
                      <InputItem
                        changeFunct={handleInputChange}
                        Icon={User}
                        identity={"firstname"}
                        label={"First Name"}
                        placeholder={"John"}
                        value={formData.firstname}
                      />
                      <InputItem
                        changeFunct={handleInputChange}
                        Icon={User}
                        identity={"lastname"}
                        label={"Last Name"}
                        placeholder={"Doe"}
                        value={formData.lastname}
                      />
                    </div>

                    <InputItem
                      changeFunct={handleInputChange}
                      identity={"username"}
                      label={"Username"}
                      placeholder={"johndoe112"}
                      value={formData.username}
                    />
                  </>
                )}

                <InputItem
                  changeFunct={handleInputChange}
                  identity={"email"}
                  Icon={Mail}
                  label={"Email Address"}
                  placeholder={"johndoe@example.com"}
                  value={formData.email}
                />

                <InputItem
                  changeFunct={handleInputChange}
                  identity={"password"}
                  Icon={Lock}
                  label={"Password"}
                  placeholder={"••••••••••••"}
                  value={formData.password}
                />

                {!login && (
                  <div className="flex flex-col gap-2.5 pt-1">
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
                          <Link to={"/policies"}>policies</Link>
                        </span>{" "}
                        of ConfessionTalks
                      </label>
                    </div>
                  </div>
                )}

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
                  {!loading && (
                    <FaArrowRightLong className="w-4 h-4 shrink-0" />
                  )}
                </button>
              </form>

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
      )}

      {/* Profile Picture Setup Window */}
      {formSubmitted && (
        <div className="flex justify-center items-center px-4 min-h-screen bg-app-bg text-body-text">
          <div className="px-8 py-8 w-full max-w-md rounded-2xl border shadow-xl transition-all duration-300 bg-card-bg border-border-color shadow-slate-200/50">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-heading-text">
                Confession<span className="text-brand-accent">Talks</span>
              </h1>
              <p className="mt-1.5 text-sm font-medium text-subtext">
                Set up your profile picture
              </p>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleProfileSubmit();
              }}
            >
              <div className="flex flex-col gap-2 items-center">
                <input
                  type="file"
                  accept="image/*"
                  ref={profileInputRef}
                  onChange={handleProfileChange}
                  className="hidden"
                />

                <div
                  onClick={() => profileInputRef.current?.click()}
                  className="relative p-1 w-24 h-24 to-blue-400 rounded-full shadow-md transition-all duration-300 cursor-pointer bg-linear-to-tr from-brand-accent group hover:shadow-lg"
                >
                  <div className="overflow-hidden relative w-full h-full bg-white rounded-full">
                    <img
                      src={profilePreview}
                      alt="User Profile"
                      className="object-cover w-full h-full rounded-full transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="flex absolute inset-0 justify-center items-center rounded-full opacity-0 transition-opacity duration-200 bg-black/40 group-hover:opacity-100">
                      <Camera className="w-6 h-6 text-white drop-shadow" />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      profileInputRef.current?.click();
                    }}
                    className="absolute bottom-0 right-0 p-1.5 bg-brand-accent text-white rounded-full shadow-md border-2 border-white hover:bg-blue-600 transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span className="text-xs font-medium text-slate-500">
                  Click to change photo
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 flex items-center justify-center gap-2 py-3 px-4 bg-brand-accent hover:bg-hover-blue active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                {loading && <RotateCw className="w-4 h-4 animate-spin" />}
                {loading ? "Saving Picture..." : "Continue"}
                {!loading && <FaArrowRightLong className="w-4 h-4 shrink-0" />}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthenticationPage;
