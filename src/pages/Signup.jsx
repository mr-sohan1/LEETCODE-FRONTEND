import { useForm } from 'react-hook-form'

function Signup(){

     const { register, handleSubmit, formState: { errors }} = useForm();

    return(
        <form onSubmit={handleSubmit((data)=>console.log(data))} >
            <input  {...register('firstName')} placeholder='Enter Your firstName' />
             <input  {...register('emailID')} placeholder='Enter EmailId' />
              <input  {...register('password')} placeholder='Enter Password'/>
              <button type="submit" className="btn">Submit</button>
        </form>
    )
}

export default Signup;