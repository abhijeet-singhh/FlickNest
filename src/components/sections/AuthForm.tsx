import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MdMovieFilter } from "react-icons/md";
import { Eye, EyeOff, Film, Lock, Mail, Play, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { loginWithGoogle } from "../../api/services/authService.ts"


// Styles
const inputDivClass =
  "group px-3 flex items-center justify-center gap-4 text-gray-300 rounded-xl border-2 border-gray-700 focus-within:border-[#b1d960] transition-all duration-500";

const inputIconClass =
  "text-gray-400 group-focus-within:text-[#b1d960] transition-all duration-500";

// Validation Schemas
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
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authMethod, setAuthMethod] = useState<"none" | "email">("none");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);


  // Dynamic Schema based on isLogin state
  const schema = useMemo(() => (isLogin ? loginSchema : registerSchema), [isLogin]); //useMemo just helps optimize performance — it avoids recalculating the schema unless isLogin changes.

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData | LoginFormData>({
    resolver: zodResolver(schema),
  });

  // Handle Email/Password form submit
  const onSubmit = (data: RegisterFormData | LoginFormData) => {
    console.log("Form Submitted:", data);
    // TODO: Replace this with your real API call for email/password login/register
    // For now, just simulate login success:
    dispatch(login({
      uid: "fake-uid",
      displayName: !isLogin && "name" in data ? data.name : "User",
      email: data.email,
      photoURL: null,
    }));
    navigate("/");
  };

  // Handle Google login click
  const handleGoogleLogin = async () => {
    setGoogleError(null);
    setGoogleLoading(true);
    try {
      const user = await loginWithGoogle();
      dispatch(login(user));
      navigate("/");
    } catch (error) {
      setGoogleError("Google Sign-In failed. Please try again.");
      console.error(error);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative h-dvh w-full flex items-center justify-center overflow-hidden bg-gradient-to-bl from-gray-900 to-black">
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
          <h3 onClick={() => navigate("/")} className="logofont font-bold text-4xl text-white cursor-pointer mt-2">
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
          {!authMethod || authMethod === "none" ? (
            <>
              <div className="min-h-screen flex items-center justify-center  px-4">
                <div className="bg-zinc-900 rounded-2xl shadow-xl max-w-md w-full p-8 sm:p-10">
                  <h3 className="text-center text-3xl sm:text-4xl font-extrabold text-white mb-10">
                    Sign in to <span className="text-purple-500">FlickNest</span>
                  </h3>

                  <button
                    onClick={handleGoogleLogin}
                    disabled={googleLoading}
                    className="w-full bg-white text-black py-3 sm:py-4 rounded-xl hover:bg-white/85 flex items-center justify-center gap-3 font-medium text-base sm:text-lg transition duration-200 shadow-md hover:shadow-lg mb-5"
                  >
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt="Google Icon"
                      className="w-5 h-5"
                    />
                    {googleLoading ? "Signing in..." : "Continue with Google"}
                  </button>
                  {googleError && (
                    <p className="text-red-500 mb-3 text-center">{googleError}</p>
                  )}

                  <button
                    onClick={() => setAuthMethod("email")}
                    className="w-full border border-white text-white py-3 sm:py-4 rounded-xl hover:bg-white hover:text-black transition duration-200 font-medium text-base sm:text-lg shadow-md hover:shadow-lg"
                  >
                    Continue with Email
                  </button>
                </div>
              </div>

            </>
          ) : (
            <>
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
                        <p className="text-red-400 text-sm px-1">{errors.name?.message}</p>
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
                  {errors.email && <p className="text-red-400 text-sm px-1">{errors.email.message}</p>}

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
                  {errors.password && <p className="text-red-400 text-sm px-1">{errors.password.message}</p>}

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
                <button onClick={() => setIsLogin(prev => !prev)} className="text-[#b1d960] hover:underline cursor-pointer">
                  {isLogin ? "Create Account" : "Sign In"}
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 mt-5">
                {isLogin && (
                  <button className="text-gray-500 hover:text-gray-400 text-sm hover:underline cursor-pointer">
                    Forgot your password?
                  </button>
                )}

                <button
                  onClick={() => setAuthMethod("none")}
                  className="text-sm text-gray-400 hover:text-white cursor-pointer"
                >
                  ← Go back
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;