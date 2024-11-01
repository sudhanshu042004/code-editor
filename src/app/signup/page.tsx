"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { CgNametag } from "react-icons/cg";
import { MdAlternateEmail } from "react-icons/md";
import { SiMonkeytie } from "react-icons/si";

type Inputs = {
  name: string,
  email: string,
  password: string,
}


const Signup = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password, name }) => {
    const response = await axios.post(`http://localhost:3000/api/signup`, {
      email,
      password,
      name
    });
    if (response.status === 200) {
      router.push('/dashboard')
    }
  }

  return (
    <form onSubmit={handleSubmit(data => onSubmit(data))} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 h-screen flex-col flex justify-center ">
      <div>
        <div className="px-10">
          <div className="text-3xl text-black font-extrabold">
            Signup
          </div>
        </div>
        <div className="pt-2">
          <label className="block mb-2 text-sm text-black font-semibold pt-4">Name</label>
          <div className='relative'>
            <input
              {...register("name", { required: true })}
              type='text' className="pl-10 pr-4 py-2 border rounded-lg outline-none focus:border-blue-500 bg-gray-50  border-gray-300 text-gray-900 text-sm focus:ring-blue-500  block w-full p-2.5" placeholder="jhon Doe" />
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <CgNametag className='w-5 h-5 text-gray-400 transition-colors duration-300 ease-in-out hover:text-blue-500' />
            </div>
          </div>

          <label className="block mb-2 text-sm text-black font-semibold pt-4">Email</label>
          <div className='relative'>
            <input
              {...register("email", { required: true })}
              type='text' className="pl-10 pr-4 py-2 border rounded-lg outline-none focus:border-blue-500 bg-gray-50  border-gray-300 text-gray-900 text-sm focus:ring-blue-500  block w-full p-2.5" placeholder="something@gmail.com" />
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <MdAlternateEmail className='w-5 h-5 text-gray-400 transition-colors duration-300 ease-in-out hover:text-blue-500' />
            </div>
          </div>

          <label className="block mb-2 text-sm text-black font-semibold pt-4">Password</label>
          <div className='relative'>
            <input
              {...register("password", { required: true })}
              type='password' className="pl-10 pr-4 py-2 border rounded-lg outline-none focus:border-blue-500 bg-gray-50  border-gray-300 text-gray-900 text-sm focus:ring-blue-500  block w-full p-2.5" />
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <SiMonkeytie className='w-5 h-5 text-gray-400 transition-colors duration-300 ease-in-out hover:text-blue-500' />
            </div>
          </div>
          <div className='text-red-500'>
            {errors.email && errors.password && <span>*fields are required</span>}
          </div>
          <button
            type="submit"
            className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign up</button>
        </div>
        <div onClick={() => router.push("/login")} className=" cursor-pointer block mb-2 text-sm text-black font-semibold pt-4" >
          Already have an account ? Login
        </div>
      </div>
    </form>
  )
}

export default Signup
