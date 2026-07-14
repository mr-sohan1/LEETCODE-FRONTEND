import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const signupSchema = z.object({
  firstName: z.string().min(3, "Name should contain at least 3 characters"),
  emailID: z.string().email("Invalid Email Address"),
  password: z.string().min(8, "Password should contain at least 8 characters"),
});

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold justify-center mb-2">
            Create an Account
          </h2>

          <p className="text-center text-sm text-base-content/60 mb-4">
            Sign up to get started
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* First Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>

              <input
                {...register("firstName")}
                placeholder="Enter Your First Name"
                className={`input input-bordered w-full ${
                  errors.firstName ? "input-error" : ""
                }`}
              />

              {errors.firstName && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.firstName.message}
                  </span>
                </label>
              )}
            </div>

            {/* Email */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>

              <input
                type="email"
                {...register("emailID")}
                placeholder="Enter Your Email"
                className={`input input-bordered w-full ${
                  errors.emailID ? "input-error" : ""
                }`}
              />

              {errors.emailID && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.emailID.message}
                  </span>
                </label>
              )}
            </div>

            {/* Password */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                type="password"
                {...register("password")}
                placeholder="Enter Password"
                className={`input input-bordered w-full ${
                  errors.password ? "input-error" : ""
                }`}
              />

              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.password.message}
                  </span>
                </label>
              )}
            </div>

            {/* Backend Error */}
            {error && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full mt-2"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;