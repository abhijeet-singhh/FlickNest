import { useState } from "react";
import { MdMovieFilter } from "react-icons/md";
import { Eye, EyeOff, Film, Lock, Mail, Play, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const inputDivClass =
  "group px-3 flex items-center justify-center gap-4 text-gray-300 rounded-xl border-2 border-gray-700 focus-within:border-[#b1d960] transition-all duration-500";

const inputIconClass =
  "text-gray-400 group-focus-within:text-[#b1d960] transition-all duration-500";

const AuthForm = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="relative h-dvh w-full flex items-center justify-center">
      <div className="absolute top-13 left-18 pointer-events-none opacity-10">
        <Film size={140} className="text-white animate-spin" style={{ animationDuration: "20s" }} />
      </div>

      <div className="absolute bottom-13 right-18 pointer-events-none opacity-10">
        <Film size={100} className="text-white animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
      </div>

      <div className="absolute -top-8 right-160 pointer-events-none opacity-10">
        <Film size={120} className="text-white animate-spin" style={{ animationDuration: "30s", animationDirection: "reverse" }} />
      </div>

      {/* Left Side */}
      <div className="w-1/2 h-dvh pl-35">
        <div className="mt-35 flex items-center gap-3 mb-7">
          <MdMovieFilter size={40} color="#B1D960" className="mb-[7px]" />
          <h3 onClick={() => navigate("/")} className="logofont font-bold text-4xl cursor-pointer">FlickNest</h3>
        </div>

        <div>
          <h2 className="text-5xl font-bold poppins leading-15">
            Your{" "}
            <span className="text-[#B1D960] block">Backstage Pass</span> to
            Movies
          </h2>
          <p className="text-gray-300 text-[18px] mt-7 leading-relaxed mr-30">
            Discover, watch, and collect your favourite movies in one place.
            Join millions of movie lovers worldwide.
          </p>

          <div className="space-y-4 mt-5 text-gray-300 text-[14px]">
            <p>
              <span className="text-[#B1D960] mr-4">•</span>Ad-Free Experience
            </p>
            <p>
              <span className="text-[#B1D960] mr-4">•</span>Watch trailers
              before you decide
            </p>
            <p>
              <span className="text-[#B1D960] mr-4">•</span>Upcoming movie
              alerts
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-1/2 h-dvh flex justify-center items-center">
        <div className="w-[500px]">
          <div>
            <h3 className="text-center text-3xl font-bold text-white mb-2">
              {isLogin ? "Welcome Back" : "Join FlickNest"}
            </h3>
            <p className="text-center text-gray-400 mb-8">
              {isLogin
                ? "Continue your movie journey"
                : "Start your cinematic adventure"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 px-5">
            <div className="space-y-4">
              {!isLogin && (
                <div className={inputDivClass}>
                  <User size={24} className={inputIconClass} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full py-4 outline-none bg-transparent placeholder-gray-400"
                  />
                </div>
              )}

              <div className={inputDivClass}>
                <Mail size={24} className={inputIconClass} />
                <input
                  type="text"
                  placeholder="Email Address"
                  className="w-full py-4 outline-none bg-transparent placeholder-gray-400"
                />
              </div>

              <div className={inputDivClass}>
                <Lock size={24} className={inputIconClass} />
                <input
                  type={showPassword ? "password" : "text"}
                  placeholder="Password"
                  className="w-full py-4 outline-none bg-transparent placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye />}
                </button>
              </div>

              <button className="w-full text-black bg-[#B1D960] py-4 rounded-lg transition hover:bg-[#a6cc50] flex items-center justify-center gap-4">
                <span className="font-bold text-xl logofont mt-1">
                  {isLogin ? "Enter FlickNest" : "Join FlickNest"}
                </span>
                <Play size={20} />
              </button>
            </div>
          </form>

          <div className="flex items-center justify-center gap-2 mt-7 text-gray-400">
            <p>{isLogin ? "New to FlickNest?" : "Already have an account?"}</p>
            <button onClick={() => setIsLogin(!isLogin)} className="cursor-pointer">
              <p className="text-[#b1d960] hover:text-[#b1d960d2] hover:underline">{isLogin ? "Create Account" : "Sign In"}</p>
            </button>
          </div>

          {isLogin && (
            <button className="w-full cursor-pointer text-center">
              <p className="text-gray-500 hover:text-gray-400 text-[15px] mt-5 hover:underline">Forgot your password?</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;