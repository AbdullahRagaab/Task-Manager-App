import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../common/constants/routes";
import { useLogin } from "../hooks/AuthHooks";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    login.mutate(
  { username, password },
  {
    onSuccess: () => navigate(ROUTES.DASHBOARD),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => setError(err.message || "Invalid username or password"),
  }
);




  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-700">

      {/* Floating Blobs */}
      <div className="absolute top-10 -left-20 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute -top-20 right-20 w-80 h-80 bg-cyan-300/25 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-blue-200/25 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      {/* Card */}
      <div className="relative z-10 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-md border border-white/20">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-sm">Sign in to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100
              transition-all outline-none text-sm"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100
              transition-all outline-none text-sm"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-600 px-3 py-2 rounded-xl text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
              </svg>
              <span className="text-xs">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={login.isPending}
            className="w-full py-3 rounded-xl font-bold text-white text-base
              bg-gradient-to-r from-blue-600 to-cyan-600
              hover:from-blue-700 hover:to-cyan-700
              shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {login.isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-xs text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Redirect */}
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <button
              onClick={() => navigate(ROUTES.SIGNUP)}
              className="font-bold text-xs text-blue-600 hover:text-blue-700"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.05); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}
