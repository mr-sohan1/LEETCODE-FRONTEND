import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { loginUser } from "../authSlice";
import { useEffect, useState } from 'react';

const loginSchema = z.object({
  emailID: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak")
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#EDEDED] font-sans relative page-enter">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .font-mono-custom { font-family: 'JetBrains Mono', ui-monospace, monospace; }
      `}</style>

      {/* Logo pinned top-left, matches landing page navbar */}
      <NavLink
        to="/"
        className=" absolute top-6 left-6 md:top-8 md:left-10 font-display font-semibold text-3xl tracking-tight"
      >
        Erical<span className="text-[#4ADE80]">Code</span>
      </NavLink>

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-[#131519] border border-[#2A2D33] rounded-lg p-8">
          <p className="font-mono-custom text-xs text-[#8A8F98] mb-2 tracking-wide">
            $ auth --login
          </p>
          <h2 className="font-display text-2xl font-semibold text-center mb-8">
            Welcome Back
          </h2>

          {error && (
            <div className="mb-4 text-sm text-[#F87171] bg-[#F87171]/10 border border-[#F87171]/30 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs text-[#8A8F98] mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`w-full bg-[#0A0B0D] border rounded-md px-3 py-2.5 text-sm text-[#EDEDED] placeholder:text-[#5A5D63] outline-none focus:border-[#4ADE80] transition-colors ${
                  errors.emailID ? 'border-[#F87171]' : 'border-[#2A2D33]'
                }`}
                {...register('emailID')}
              />
              {errors.emailID && (
                <span className="text-[#F87171] text-xs mt-1 block">
                  {errors.emailID.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs text-[#8A8F98] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full bg-[#0A0B0D] border rounded-md px-3 py-2.5 pr-10 text-sm text-[#EDEDED] placeholder:text-[#5A5D63] outline-none focus:border-[#4ADE80] transition-colors ${
                    errors.password ? 'border-[#F87171]' : 'border-[#2A2D33]'
                  }`}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-[#8A8F98] hover:text-[#EDEDED] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-[#F87171] text-xs mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4ADE80] text-[#0A0B0D] font-medium py-2.5 rounded-md hover:bg-[#3fc76f] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#0A0B0D]/30 border-t-[#0A0B0D] rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-sm text-[#8A8F98]">
              Don't have an account?{' '}
              <NavLink to="/signup" className="text-[#4ADE80] hover:underline">
                Sign Up
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;