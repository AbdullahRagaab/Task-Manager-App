import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../common/constants/routes";
import { useLogin } from "../hooks/AuthHooks";
import Input from "../../../common/ui/Input";
import { useForm } from "react-hook-form";
import { LoginFormSchema, type LoginFormData } from "../schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Galaxy from '../../../common/ui/Galaxy';


export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  });
  const login = useLogin();

  const onSubmit = (data: LoginFormData) => {
    login.mutate(data, {
      onSuccess: () => {
        navigate(ROUTES.DASHBOARD);
      },
    });
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center z-0">


            {/* React Bits */}
            <div className="w-full h-full absolute z-0 ">
              <Galaxy 
                mouseRepulsion={true}
                mouseInteraction={true}
                density={1.5}
                glowIntensity={0.5}
                saturation={0.8}
                hueShift={240}
              />
            </div>
            
      
      {/* Card */}
      <div className="relative bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl px-5 py-2 w-full max-w-lg border border-white/30">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-md">
            Welcome Back
          </h1>
          <p className="text-gray-200">Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-white">
          <Input
            label="Username"
            name="username"
            register={register}
            error={errors.username?.message}
            className="w-full p-3 rounded-lg border border-white/30 bg-gray text-white placeholder-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your username"
            
          />
          <Input
            type="password"
            label="Password"
            name="password"
            register={register}
            error={errors.password?.message}
            className="w-full p-3 rounded-lg border border-white/30 bg-gray text-white placeholder-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your username"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-lg text-white 
            bg-gradient-to-r from-blue-800 via-blue-900 to-black shadow-lg 
            transition-all duration-100 transform 
            hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-700/40 
            hover:bg-gradient-to-r hover:from-black hover:via-blue-900 hover:to-blue-800
            focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        

        <div className="mt-6 text-center">
          <p className="text-gray-200">
            Don't have an account?{" "}
            <button
              onClick={() => navigate(ROUTES.SIGNUP)}
              className="text-blue-400 hover:text-blue-600 font-semibold text-lg underline underline-offset-2 cursor-pointer" >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
