import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../common/constants/routes";
import { useLogin, useSignup } from "../hooks/AuthHooks";
import Galaxy from '../../../common/ui/Galaxy';



export default function SignupPage() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", name: "" });
  const navigate = useNavigate();

  const { mutate: signup } = useSignup();
  const { mutate: login } = useLogin();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    signup(formData, {
      onSuccess: () => {
        login({ username: formData.username, password: formData.password }, {
          onSuccess: () => {
            navigate(ROUTES.DASHBOARD);
          }
        });
      },
    });
  };

  return (
    <div className="relative min-h-screen flex items-center bg-black justify-center overflow-hidden">

      {/* React Bits */}
      <div className="w-full h-full absolute">
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
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-md">
            Create Account
          </h1>
          <p className="text-gray-200 mt-2">Join our community</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: "Full Name", name: "name", type: "text", placeholder: "Enter your full name" },
            { label: "UserName", name: "username", type: "text", placeholder: "Choose a userName" },
            { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
            { label: "Password", name: "password", type: "password", placeholder: "Create a password" },
          ].map((field) => (
            <div key={field.name} className="text-left">
              <label className="block text-sm font-semibold text-white mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                value={(formData as any)[field.name]}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                placeholder={field.placeholder}
                required
              />
            </div>
          ))}

          <button
            type="submit"

className="w-full py-3 rounded-lg font-semibold text-lg text-white 
bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg 
transition-all duration-100 transform 
hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-700/40 
hover:bg-gradient-to-r hover:from-black hover:via-gray-900 hover:to-gray-800
focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 cursor-pointer"
>

           Create Account
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-200">
            Already have an account?{" "}
            <button
              onClick={() => navigate(ROUTES.LOGIN)}
              className="text-red-400 hover:text-red-600 font-semibold text-lg underline underline-offset-2 cursor-pointer" >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
