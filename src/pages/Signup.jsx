import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signupSchema = z.object({
    emailID: z.string().email("Invalid EmailID"),
    password: z.string().min(8, "Password Should Contain atleast 8 character")
})

function Signup() {

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(signupSchema) });

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

                    <form onSubmit={handleSubmit((data) => console.log(data))} className="space-y-4">

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input
                                {...register('firstName')}
                                placeholder="Enter Your First Name"
                                className={`input input-bordered w-full ${errors.firstName ? 'input-error' : ''}`}
                            />
                            {errors.firstName && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.firstName.message}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                {...register('emailID')}
                                placeholder="Enter Email Id"
                                className={`input input-bordered w-full ${errors.emailID ? 'input-error' : ''}`}
                            />
                            {errors.emailID && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.emailID.message}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register('password')}
                                placeholder="Enter Password"
                                className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                            />
                            {errors.password && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.password.message}</span>
                                </label>
                            )}
                        </div>

                        <button type="submit" className="btn btn-primary w-full mt-2">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;