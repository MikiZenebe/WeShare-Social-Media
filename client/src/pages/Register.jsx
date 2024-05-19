import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function Register() {
  const [datas, setDatas] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });
  const [uploadPhoto, setUploadPhoto] = useState("");

  const handleChange = (e) => {
    setDatas({ ...datas, [e.target.name]: e.target.value });
  };

  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setUploadPhoto(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setUploadPhoto(null);
    }
  };

  const handleClearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
  };

  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    console.log("data", datas);
  };

  return (
    <div className="bg h-[100vh] w-[100vw] flex flex-col justify-center items-center">
      <div className="bg-white border shadow-black/5 shadow-lg w-full max-w-sm flex flex-col gap-6 rounded overflow-hidden p-6 mx-auto">
        <div className="flex items-center justify-center">
          <img className="w-[40px]" src={Logo} alt="" />
          <h2 className="text-lg font-bold text-[#00ADB5]">Chitty Chata</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="input"
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={datas.username}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={datas.name}
            onChange={handleChange}
            required
          />{" "}
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={datas.email}
            onChange={handleChange}
            required
          />{" "}
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={datas.password}
            onChange={handleChange}
            required
          />
          <div>
            <label htmlFor="profilePic">
              <div>
                <div>
                  {uploadPhoto ? (
                    <div className="flex items-center">
                      {" "}
                      <img
                        className="w-[80px] h-[80px] border rounded-full object-cover mx-auto cursor-pointer"
                        src={uploadPhoto}
                        width={50}
                      />
                      <button
                        onClick={handleClearUploadPhoto}
                        className="text-lg  bg-red-500 text-white hover:bg-red-300 h-[80px]"
                      >
                        <IoClose />
                      </button>
                    </div>
                  ) : (
                    <h3 className="text-center bg-slate-100 p-3 rounded-lg cursor-pointer">
                      Upload profile photo
                    </h3>
                  )}
                </div>
              </div>
            </label>
            <input
              type="file"
              onChange={handleUploadPhoto}
              id="profilePic"
              hidden
            />
          </div>
          <button
            type="submit"
            className="transition-all duration-[300ms] ease-out border-2 border-[#46a4ec] w-full h-[40px] rounded-lg bg-[#46a4ec] font-semibold hover:bg-[#46a4ec]/70 text-white disabled:cursor-not-allowed disabled:btn-disabled "
          >
            Sign Up
          </button>
        </form>

        <p className="text-center">
          Already have account ?{" "}
          <Link to={"/email"} className="text-[#46a4ec] font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}