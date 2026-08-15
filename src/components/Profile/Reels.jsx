import dummyImage from "../../assets/Screenshot 2026-08-11 225421.png";
import dummyVideo from "../../assets/sample2.mp4";
import { Link } from "react-router-dom";
import { Eye, Heart } from "lucide-react";
import { useEffect, useState, useRef, Fragment } from "react";

const Reels = () => {
  const [popUpToggle, setPopUpToggle] = useState(false);
  const [videoShow, setVideoShow] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Added ref for video element
  const videoRef = useRef(null);

  useEffect(() => {
    let timer;
    let timer2;
    if (popUpToggle) {
      timer = setTimeout(() => {
        setVideoShow(true);
      }, 1000);
    } else {
      setVideoShow(false);
      setIsPlaying(false);
    }

    timer2 = setTimeout(() => {
      if (popUpToggle) {
        setIsMuted(false);
      } else {
        setIsMuted(true);
      }
    }, 1025);

    return () => clearTimeout(timer);
  }, [popUpToggle]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Modal */}
      <div
        className={`fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
          popUpToggle ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setPopUpToggle(false)}
      >
        <div
          className="flex items-center w-full h-full max-w-6xl max-h-[85vh] border rounded-lg shadow-md bg-card-bg border-border-color overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left Side */}
          <div className="h-full w-[40%] shrink-0">
            {videoShow ? (
              <video
                ref={videoRef}
                src={dummyVideo}
                className="object-cover w-full h-full cursor-pointer"
                loop
                autoPlay
                muted={isMuted}
                onClick={togglePlayPause}
              />
            ) : (
              <img
                src={dummyImage}
                alt="IMG"
                className="object-cover w-full h-full rounded-l-lg"
              />
            )}
          </div>

          {/* Right Side */}
          <div className="w-[60%] h-full pt-4 flex flex-col min-h-0">
            {/* Profile */}
            <div className="flex items-center gap-2.5 px-4 pb-3 border-b border-border-color shrink-0">
              {/* Avatar */}
              <div className="bg-black rounded-full shrink-0 w-11 h-11">
                <img
                  src="https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg"
                  alt="IMG"
                  className="object-cover w-full h-full rounded-full"
                />
              </div>

              {/* Details */}
              <div>
                <h1 className="flex items-center gap-2 text-sm font-semibold tracking-wide">
                  ahad.shk.0 <span>•</span>
                  <button
                    type="button"
                    className="transition-colors hover:underline text-brand-accent hover:text-hover-blue"
                  >
                    Follow
                  </button>
                </h1>
                <p className="text-xs tracking-wide text-subtext">
                  Original Audio — ahad.shk.0
                </p>
              </div>
            </div>

            {/* Comments Area */}
            <div className="flex-1 min-h-0 px-4 py-3 overflow-y-auto scrollbar-thin">
              {Array(30)
                .fill(null)
                .map((_, i) => (
                  <Fragment key={i}>
                    <div className="flex items-center">
                      <div className="w-full">
                        <div className="flex items-start justify-between gap-3 w-full">
                          <Link to={`/en/@ahad.shk.0`} className="shrink-0">
                            <img
                              src="https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg"
                              alt="IMG"
                              className="object-cover w-10 h-10 transition-all rounded-full ring-2 ring-transparent hover:ring-brand-accent"
                            />
                          </Link>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-baseline gap-2">
                              <Link
                                to={`/en/@ahad.shk.0`}
                                className="text-sm font-semibold truncate text-heading-text hover:underline"
                              >
                                @ahad.shk.0
                              </Link>
                            </div>

                            <p className="mt-1 text-sm leading-relaxed text-body-text wrap-break-word">
                              Hello World
                            </p>

                            <div className="flex items-center gap-4 mt-2 text-xs text-body-text/80">
                              12.1K likes
                            </div>
                          </div>

                          <div className="pt-1 text-body-text/60">
                            <button className="transition-colors hover:text-red-500">
                              <Heart className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="border-border-color my-3 rounded-full" />
                  </Fragment>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid gap-1 md:grid-cols-3 sm:grid-cols-2">
        {Array(9)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="relative w-full h-full group">
              <img
                src={dummyImage}
                alt="IMG"
                className="object-cover w-full h-full rounded-md"
              />
              <div
                onClick={() => setPopUpToggle(!popUpToggle)}
                className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full gap-3 transition-all duration-200 rounded-md opacity-0 cursor-pointer bg-black/50 group-hover:opacity-100"
              >
                <div className="flex items-center justify-center gap-2">
                  <Eye color="#fff" />
                  <span className="font-semibold text-white">1.8K</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Heart color="#fff" fill="#fff" />
                  <span className="font-semibold text-white">1.8K</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Reels;
