import { useRef, useState, useEffect } from "react";
import InputItem from "../InputItem";
import {
  Camera,
  FileText,
  Mail,
  Mars,
  User,
  Link2,
  Plus,
  X,
} from "lucide-react";
import axios from "axios";

const ProfileSettings = () => {
  // ---- Variables ----
  const id = localStorage.getItem("cota_id");

  // ---- UseStates ----
  const [personalData, setPersonalData] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    profilePic: "",
    gender: "",
    description: "",
    links: [],
  });

  const [newLink, setNewLink] = useState("");

  // ---- Refs ----
  const avatarRef = useRef();

  // ---- Handlers ----
  const handleInputChange = (e) => {
    setPersonalData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPersonalData((prev) => ({
        ...prev,
        profileAvatar: imageUrl,
      }));
    }
  };

  const handleAddLink = () => {
    if (!newLink.trim()) return;
    if (personalData?.links?.length >= 4) return;

    setPersonalData((prev) => ({
      ...prev,
      links: [...(prev.links || []), { id: Date.now(), url: newLink.trim() }],
    }));
    setNewLink("");
  };

  const handleRemoveLink = (id) => {
    setPersonalData((prev) => ({
      ...prev,
      links: prev.links.filter((link) => link.id !== id),
    }));
  };

  // ---- Functions ----
  const getDetails = () => {
    axios
      .get(`http://localhost:3000/api/user/${id}`)
      .then((response) => {
        const data = response?.data?.user_details;

        setPersonalData({
          fname: data?.fname || "",
          lname: data?.lname || "",
          username: data?.username || "",
          email: data?.email || "",
          profilePic: data?.profilePic || "",
          gender: data?.gender || "",
          description: data?.description || "",
          links: data?.links || [],
        });
      })
      .catch(() => {});
  };

  // ---- UseEffects ----
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="w-full max-w-2xl px-4 py-6 mx-auto sm:px-6">
      {/* Heading */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-heading-text">
          Edit Your Profile
        </h1>
        <p className="text-xs sm:text-sm text-subtext">
          Manage your personal details and public profile here.
        </p>
      </div>

      <hr className="my-5 border-border-color" />

      {/* Form */}
      <form className="w-full space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Profile Picture */}
        <div className="relative flex flex-col items-center justify-center">
          <div
            className="relative cursor-pointer group"
            onClick={() => avatarRef.current?.click()}
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 p-0.5 border-2 rounded-full border-blue-600 overflow-hidden transition-transform duration-200 group-hover:scale-105">
              <div
                className="w-full h-full bg-center bg-no-repeat bg-cover rounded-full"
                style={{
                  backgroundImage: `url(${
                    personalData?.profileAvatar ||
                    personalData?.profilePic ||
                    "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg"
                  })`,
                }}
              />
              <input
                type="file"
                name="profileAvatar"
                id="profileAvatar"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                ref={avatarRef}
              />
            </div>

            {/* Camera Overlay Icon */}
            <div className="absolute bottom-0 right-0 grid transition-transform duration-200 rounded-full shadow-md w-7 h-7 sm:w-8 sm:h-8 translate-x-1/4 translate-y-1/4 place-items-center bg-brand-accent ring-2 ring-white group-hover:scale-110">
              <Camera color="white" strokeWidth={2.25} size={15} />
            </div>
          </div>
        </div>

        {/* Inputs Container */}
        <div className="space-y-4">
          {/* Firstname / Lastname */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InputItem
              Icon={User}
              identity={"fname"}
              label={"First Name"}
              placeholder={"John"}
              value={personalData.fname}
              changeFunct={handleInputChange}
            />
            <InputItem
              Icon={User}
              identity={"lname"}
              label={"Last Name"}
              placeholder={"Doe"}
              value={personalData.lname}
              changeFunct={handleInputChange}
            />
          </div>

          {/* Username / Email */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InputItem
              identity={"username"}
              label={"User Name"}
              placeholder={"johndoe112"}
              value={personalData.username}
              changeFunct={handleInputChange}
            />
            <InputItem
              Icon={Mail}
              identity={"email"}
              label={"Email Address"}
              placeholder={"john.doe@example.com"}
              value={personalData.email}
              changeFunct={handleInputChange}
            />
          </div>

          {/* Gender */}
          <InputItem
            Icon={Mars}
            identity={"gender"}
            label={"Gender"}
            placeholder={"Male"}
            value={personalData.gender}
            changeFunct={handleInputChange}
          />

          {/* Custom Link Manager */}
          <div className="flex flex-col gap-1.5 w-full">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold tracking-wider uppercase text-body-text">
                Website / Social Links
              </label>
              <span className="text-xs font-medium text-slate-400">
                {personalData?.links?.length || 0}/4 Links
              </span>
            </div>

            {/* Add Link Field */}
            {(personalData?.links?.length || 0) < 4 && (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative w-full">
                  <input
                    type="url"
                    placeholder="https://yourlink.com"
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddLink();
                      }
                    }}
                    className="w-full h-10 pr-3 text-sm font-medium transition-all border rounded-lg pl-9 border-border-color focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent text-body-text"
                  />
                  <Link2
                    size={18}
                    className="absolute text-gray-300 pointer-events-none top-2.5 left-3"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="flex items-center justify-center w-full h-10 gap-1 px-4 text-xs font-semibold text-white transition-colors rounded-lg sm:w-auto bg-brand-accent hover:bg-hover-blue shrink-0"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>
            )}

            {/* Added Links List */}
            {personalData?.links?.length > 0 && (
              <ul className="flex flex-col gap-2 mt-2">
                {personalData?.links.map((link) => (
                  <li
                    key={link.id}
                    className="flex items-center justify-between px-3 py-2 text-xs font-medium border rounded-lg bg-slate-50 border-slate-200 text-slate-700"
                  >
                    <div className="flex items-center min-w-0 gap-2 pr-2">
                      <Link2 size={14} className="text-slate-400 shrink-0" />
                      <span className="truncate">{link.url}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(link.id)}
                      className="p-1 transition-colors rounded-md text-slate-400 hover:text-red-500 shrink-0"
                    >
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5 w-full">
            <label
              htmlFor="description"
              className="text-xs font-semibold tracking-wider uppercase text-body-text"
            >
              Description
            </label>
            <div className="relative flex">
              <textarea
                maxLength={250}
                name="description"
                id="description"
                value={personalData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Write a brief description..."
                className="w-full text-sm font-medium transition-all py-2.5 pr-3 pl-9 border rounded-lg border-border-color focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent text-body-text peer min-h-25 resize-none scrollbar-thin"
              />
              <FileText
                strokeWidth={2}
                size={18}
                className="absolute text-gray-300 transition-colors pointer-events-none top-3 left-3 peer-focus:text-brand-accent"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-xl transition-all duration-200 active:scale-95"
          >
            Reset Defaults
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-brand-accent hover:bg-hover-blue rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
