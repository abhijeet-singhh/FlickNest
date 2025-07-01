import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MdMovieFilter } from "react-icons/md";
import { Eye, EyeOff, Film, Lock, Mail, Play, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ✅ Styles
const inputDivClass =
  "group px-3 flex items-center justify-center gap-4 text-gray-300 rounded-xl border-2 border-gray-700 focus-within:border-[#b1d960] transition-all duration-500";

const inputIconClass =
  "text-gray-400 group-focus-within:text-[#b1d960] transition-all duration-500";

// ✅ Validation Schemas
const baseSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = baseSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

const loginSchema = baseSchema;

type RegisterFormData = z.infer<typeof registerSchema>;
type LoginFormData = z.infer<typeof loginSchema>;

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Dynamic Schema based on isLogin state
  const schema = useMemo(() => (isLogin ? loginSchema : registerSchema), [isLogin]); //useMemo just helps optimize performance — it avoids recalculating the schema unless isLogin changes.

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData | LoginFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: RegisterFormData | LoginFormData) => {
    console.log("Form Submitted:", data);
    // Add your auth logic here (e.g., API call)
  };

  return (
    <div className="relative h-dvh w-full flex items-center justify-center overflow-hidden">
      {/* Spinning Icons */}
      <Film
        size={140}
        className="absolute top-14 left-20 text-white opacity-10 animate-spin"
        style={{ animationDuration: "20s" }}
      />
      <Film
        size={100}
        className="absolute bottom-14 right-20 text-white opacity-10 animate-spin"
        style={{ animationDuration: "15s", animationDirection: "reverse" }}
      />
      <Film
        size={120}
        className="absolute -top-8 right-40 text-white opacity-10 animate-spin"
        style={{ animationDuration: "30s", animationDirection: "reverse" }}
      />

      {/* Left Panel */}
      <div className="w-1/2 h-full pl-32 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-7">
          <MdMovieFilter size={40} color="#B1D960" />
          <h3 onClick={() => navigate("/")} className="logofont font-bold text-4xl text-white cursor-pointer">
            FlickNest
          </h3>
        </div>

        <h2 className="text-5xl font-bold text-white leading-tight">
          Your <span className="text-[#B1D960] block">Backstage Pass</span> to Movies
        </h2>

        <p className="text-gray-300 text-lg mt-7 mr-24">
          Discover, watch, and collect your favourite movies in one place. Join millions of movie lovers worldwide.
        </p>

        <div className="space-y-4 mt-6 text-gray-300 text-sm">
          <p><span className="text-[#B1D960] mr-2">•</span>Ad-Free Experience</p>
          <p><span className="text-[#B1D960] mr-2">•</span>Watch trailers before you decide</p>
          <p><span className="text-[#B1D960] mr-2">•</span>Upcoming movie alerts</p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-1/2 h-full flex justify-center items-center bg-black/20">
        <div className="w-[500px] bg-transparent">
          <h3 className="text-center text-3xl font-bold text-white mb-2">
            {isLogin ? "Welcome Back" : "Join FlickNest"}
          </h3>
          <p className="text-center text-gray-400 mb-8">
            {isLogin ? "Continue your movie journey" : "Start your cinematic adventure"}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-5">
            <div className="space-y-4">
              {!isLogin && (
                <>
                  <div className={inputDivClass}>
                    <User size={24} className={inputIconClass} />
                    <input
                      type="text"
                      placeholder="Full Name"
                      {...register("name")}
                      className="w-full py-4 outline-none bg-transparent placeholder-gray-400"
                    />
                  </div>
                  {"name" in errors && (  //returns true only if name exists in the error object.
                    <p className="text-red-500 text-sm px-1">{errors.name?.message}</p>
                  )}
                </>
              )}

              <div className={inputDivClass}>
                <Mail size={24} className={inputIconClass} />
                <input
                  type="text"
                  placeholder="Email Address"
                  {...register("email")}
                  className="w-full py-4 outline-none bg-transparent placeholder-gray-400"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm px-1">{errors.email.message}</p>}

              <div className={inputDivClass}>
                <Lock size={24} className={inputIconClass} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className="w-full py-4 outline-none bg-transparent placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="text-gray-400 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm px-1">{errors.password.message}</p>}

              <button
                type="submit"
                className="w-full text-black bg-[#B1D960] py-4 rounded-lg hover:bg-[#a6cc50] flex items-center justify-center gap-3 transition font-bold text-xl logofont"
              >
                {isLogin ? "Enter FlickNest" : "Join FlickNest"} <Play size={20} />
              </button>
            </div>
          </form>

          <div className="flex justify-center gap-2 mt-7 text-gray-400 text-sm">
            <p>{isLogin ? "New to FlickNest?" : "Already have an account?"}</p>
            <button onClick={() => setIsLogin(prev => !prev)} className="text-[#b1d960] hover:underline">
              {isLogin ? "Create Account" : "Sign In"}
            </button>
          </div>

          {isLogin && (
            <button className="w-full mt-5 text-center text-gray-500 hover:text-gray-400 text-sm hover:underline">
              Forgot your password?
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;