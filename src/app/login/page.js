"use client"
// import Input from "../components/Input";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import './page.css';


const defaultData = { email: "", password: "" };

const Login = () => {
    const [data, setData] = useState(defaultData);

    const router = useRouter();
    
    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onLogin = async (e) => {
        e.preventDefault();

        if (!data.email || !data.password) {
            alert("Please fill all mandatory paramters");
            return;
        }

        try {
            const response = await axios.post('/api/login', data);
            setData(defaultData);
            
            if (response.status === 200) {
                router.push('/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
    //   <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
    //       <div className="bg-white shadow-md rounded px-16 pt-8 pb-12 mb-4">
    //           <h1 className="text-3xl mb-4 text-center">Login</h1>
    //           <form className="space-y-4" onSubmit={onLogin}>
    //               <div className="mb-4">
    //                   <label htmlFor="email" className="block text-gray-600 font-semibold mb-2">Email</label>
    //                   <input 
    //                       type="text" 
    //                       id="email" 
    //                       name="email"
    //                       value={data.email}
    //                       onChange={onValueChange}
    //                       className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    //                       autoComplete="off"
    //                   />
    //               </div>
    //               <div className="mb-4">
    //                   <label htmlFor="password" className="block text-gray-600 font-semibold mb-2">Password</label>
    //                   <input 
    //                       type="password" 
    //                       id="password" 
    //                       name="password"
    //                       value={data.password}
    //                       onChange={onValueChange}
    //                       className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    //                       autoComplete="off"
    //                   />
    //               </div>
    //               <button
    //                   type="submit"
    //                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
    //               >
    //                   Sign In
    //               </button>
    //           </form>
    //       </div>
    //   </div>

    <div className="login-container">
  <div className="login-box">
    <h1 className="login-title">Login</h1>
    <form className="login-form" onSubmit={onLogin}>
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email</label>
        <input 
          type="text" 
          id="email" 
          name="email"
          value={data.email}
          onChange={onValueChange}
          className="form-input"
          autoComplete="off"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">Password</label>
        <input 
          type="password" 
          id="password" 
          name="password"
          value={data.password}
          onChange={onValueChange}
          className="form-input"
          autoComplete="off"
        />
      </div>
      <button
        type="submit"
        className="submit-button"
      >
        Sign In
      </button>
    </form>
  </div>
</div>

  );
  
}

export default Login;