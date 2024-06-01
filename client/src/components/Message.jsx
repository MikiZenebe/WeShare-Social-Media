import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Avatar, Loading } from "../components/index";
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft, FaImage, FaPlus, FaVideo } from "react-icons/fa";
import uploadFile from "../helpers/uploadFile";
import { IoClose, IoSend } from "react-icons/io5";

export default function Message() {
  const params = useParams();
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const user = useSelector((state) => state.user);
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: "",
  });
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [openImgVideoUpload, setOpenImgVideoUpload] = useState(false);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params.userId);

      socketConnection.on("message-user", (data) => {
        setDataUser(data);
      });

      socketConnection.on("message", (data) => {
        console.log("message", data);
      });
    }
  }, [params.userId, socketConnection, user]);

  const handleFileUploadOpen = () => {
    setOpenImgVideoUpload((prev) => !prev);
  };

  //Upload Image
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    setLoading(true);
    const uploadPhoto = await uploadFile(file);
    setLoading(false);
    setOpenImgVideoUpload(false);

    setMessage((prev) => {
      return {
        ...prev,
        imageUrl: uploadPhoto.url,
      };
    });
  };
  const handleClearUploadImage = () => {
    setMessage((preve) => {
      return {
        ...preve,
        imageUrl: "",
      };
    });
  };

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];

    setLoading(true);
    const uploadPhoto = await uploadFile(file);
    setLoading(false);
    setOpenImgVideoUpload(false);

    setMessage((preve) => {
      return {
        ...preve,
        videoUrl: uploadPhoto.url,
      };
    });
  };

  const handleClearUploadVideo = () => {
    setMessage((preve) => {
      return {
        ...preve,
        videoUrl: "",
      };
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setMessage((prev) => {
      return {
        ...prev,
        text: value,
      };
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        socketConnection.emit("new message", {
          sender: user?._id,
          receiver: params.userId,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          msgByUserId: user?._id,
        });
        setMessage({
          text: "",
          imageUrl: "",
          videoUrl: "",
        });
      }
    }
  };

  return (
    <div className="bgMessage">
      <header className="sticky top-0 h-[65px] bg-white p-3 shadow-xl shadow-black/0 backdrop-blur-md bg-white/60 flex items-center justify-between px-4">
        <div className="flex items-center gap-3 ">
          <Link to={"/"} className="lg:hidden ">
            <FaAngleLeft size={20} />
          </Link>
          <div className="mt-2">
            <Avatar
              width={40}
              height={40}
              imageUrl={dataUser.profile_pic}
              name={dataUser.name}
              userId={dataUser._id}
            />
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-lg my-0  text-ellipsis line-clamp-1">
              {dataUser?.name}
            </h3>
            <p className="-my-2 text-sm">
              {dataUser.online ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3fa1e2] to-[#108ca6]">
                  online
                </span>
              ) : (
                <span className="text-slate-400">offline</span>
              )}
            </p>
          </div>
        </div>

        <div>
          <button className="hover:text-[#3fa1e2]">
            <HiDotsVertical />
          </button>
        </div>
      </header>

      <section className="h-[calc(100vh-64px)]  overflow-x-hidden overflow-y-scroll scrollbar flex flex-col justify-between relative">
        {/* Upload Image Display */}
        <div className="flex items-center justify-center h-full">
          <div className="w-full  flex justify-center items-center">
            {loading && (
              <div>
                <Loading />
              </div>
            )}
          </div>
          <>
            {message.imageUrl && (
              <div className="w-full h-full bg-slate-700/30 flex justify-center items-center rounded overflow-hidden">
                <div
                  onClick={handleClearUploadImage}
                  className="w-fit p-2 absolute top-0 right-0 cursor-pointer text-white hover:text-blue-500"
                >
                  <IoClose size={25} />
                </div>
                <div className="bg-white p-3 rounded">
                  <img
                    src={message.imageUrl}
                    alt="uploadImg"
                    width={300}
                    height={100}
                    className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
                  />
                </div>
              </div>
            )}
          </>
          {/* Upload Video Display */}
          <>
            {message.videoUrl && (
              <div className="w-full h-full bg-slate-700/30 flex justify-center items-center rounded overflow-hidden">
                <div
                  onClick={handleClearUploadVideo}
                  className="w-fit p-2 absolute top-0 right-0 cursor-pointer text-white hover:text-blue-500"
                >
                  <IoClose size={25} />
                </div>
                <div className="bg-white p-3 rounded">
                  <video
                    src={message.videoUrl}
                    width={300}
                    height={300}
                    alt="videoUpload"
                    className="aspect-video w-full h-full max-w-sm m-2"
                  />
                </div>
              </div>
            )}
          </>
        </div>
        {/**send message */}
        <section className="h-12 bg-white flex items-center mx-8 md:mx-16 my-4 border border-opacity-40 border-[#108ca6] rounded-2xl shadow-xl shadow-black/0 backdrop-blur-md bg-white/70">
          <div className="relative flex justify-center items-center w-7 h-7 rounded-full bgHover  text-[#108ca6] transition-all duration-[300ms] ease-out mx-2">
            <button onClick={handleFileUploadOpen} className="hover:text-white">
              <FaPlus size={15} />
            </button>

            {openImgVideoUpload && (
              <div className=" shadow-xl shadow-black/0 backdrop-blur-md bg-white/60 rounded-xl absolute bottom-14 w-auto p-2">
                <form>
                  <label
                    htmlFor="uploadImage"
                    className="flex items-center p-2 px-3 gap-3 bgHover cursor-pointer rounded-xl hover:text-white"
                  >
                    <div>
                      <FaImage />
                    </div>
                  </label>

                  <label
                    htmlFor="uploadVideo"
                    className="flex items-center p-2 px-3 gap-3 bgHover cursor-pointer rounded-xl hover:text-white"
                  >
                    <div>
                      <FaVideo size={18} />
                    </div>
                  </label>

                  <input
                    type="file"
                    id="uploadImage"
                    className="hidden"
                    onChange={handleUploadImage}
                  />

                  <input
                    type="file"
                    id="uploadVideo"
                    className="hidden"
                    onChange={handleUploadVideo}
                  />
                </form>
              </div>
            )}
          </div>

          {/* Input box */}
          <form
            className="h-full w-full flex px-2"
            onSubmit={handleSendMessage}
          >
            <input
              type="text"
              placeholder="Message"
              className="py-1 outline-none w-full h-full bg-transparent"
              value={message.text}
              onChange={handleOnChange}
            />
            <button className="text-[#108ca6] hover:text-[#108ca6]/80">
              <IoSend />
            </button>
          </form>
        </section>
      </section>
    </div>
  );
}
