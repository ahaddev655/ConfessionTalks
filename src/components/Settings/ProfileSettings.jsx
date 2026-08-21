import { useRef, useState } from "react";
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

const ProfileSettings = () => {
  // ---- State ----
  const [personalData, setPersonalData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    profileAvatar: "",
    gender: "",
    description: "",
    links: [], // Array to store up to 4 link objects: { id, url }
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
    if (personalData.links.length >= 4) return;

    setPersonalData((prev) => ({
      ...prev,
      links: [...prev.links, { id: Date.now(), url: newLink.trim() }],
    }));
    setNewLink("");
  };

  const handleRemoveLink = (id) => {
    setPersonalData((prev) => ({
      ...prev,
      links: prev.links.filter((link) => link.id !== id),
    }));
  };

  return (
    <div className="w-full max-w-2xl">
      {/* Heading */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-heading-text">
          Edit Your Profile
        </h1>
        <p className="mt-1 text-xs text-subtext">
          Manage your personal details here.
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
            <div className="w-24 h-24 p-0.5 border-2 rounded-full border-blue-600 overflow-hidden transition-transform duration-200 group-hover:scale-105">
              <div
                className="w-full h-full bg-center bg-no-repeat bg-cover rounded-full"
                style={{
                  backgroundImage: `url(${
                    personalData?.profileAvatar ||
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
            <div className="absolute bottom-0 right-0 grid w-8 h-8 transition-transform duration-200 rounded-full shadow-md translate-x-1/4 translate-y-1/4 place-items-center bg-brand-accent ring-2 ring-white group-hover:scale-110">
              <Camera color="white" strokeWidth={2.25} size={15} />
            </div>
          </div>
        </div>

        {/* Inputs Container */}
        <div className="space-y-4">
          {/* Firstname / Lastname */}
          <div className="flex flex-col items-center justify-center w-full gap-4 sm:flex-row">
            <InputItem
              Icon={User}
              identity={"firstname"}
              label={"First Name"}
              placeholder={"John"}
              value={personalData.firstname}
              changeFunct={handleInputChange}
            />
            <InputItem
              Icon={User}
              identity={"lastname"}
              label={"Last Name"}
              placeholder={"Doe"}
              value={personalData.lastname}
              changeFunct={handleInputChange}
            />
          </div>

          {/* Email / Username */}
          <div className="flex flex-col items-center justify-center w-full gap-4 sm:flex-row">
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
                {personalData.links.length}/4 Links
              </span>
            </div>

            {/* Add Link Field */}
            {personalData.links.length < 4 && (
              <div className="relative flex items-center gap-2">
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
                  className="px-3.5 h-10 flex items-center gap-1 text-xs font-semibold text-white bg-brand-accent hover:bg-hover-blue rounded-lg transition-colors shrink-0"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>
            )}

            {/* Added Links List */}
            {personalData.links.length > 0 && (
              <ul className="flex flex-col gap-2 mt-2">
                {personalData.links.map((link) => (
                  <li
                    key={link.id}
                    className="flex items-center justify-between px-3 py-2 text-xs font-medium border rounded-lg bg-slate-50 border-slate-200 text-slate-700"
                  >
                    <div className="flex items-center gap-2 pr-2 truncate">
                      <Link2 size={14} className="text-slate-400 shrink-0" />
                      <span className="truncate">{link.url}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(link.id)}
                      className="p-1 transition-colors rounded-md text-slate-400 hover:text-red-500"
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
                className="w-full text-sm font-medium transition-all py-2.5 pr-3 pl-9 border rounded-lg border-border-color focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent text-body-text peer min-h-27 resize-none scrollbar-thin"
              />
              <FileText
                strokeWidth={2}
                size={18}
                className="absolute text-gray-300 transition-colors pointer-events-none top-3 left-3 peer-focus:text-brand-accent"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            className="px-5 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-xl transition-all duration-200 active:scale-95"
          >
            Reset Defaults
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-semibold text-white bg-brand-accent hover:bg-hover-blue rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
