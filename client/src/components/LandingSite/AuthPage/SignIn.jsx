import { Input } from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { verifysession } from "../../../utils/";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from "../../Dashboards/Common/Loader";
import Card from "../../Dashboards/StudentDashboard/Card";
export default function SignIn() {
  let navigate = useNavigate();
  if (localStorage.getItem("token")) {
    verifysession();
  }
  let login = async (event) => {
    event.preventDefault();
    setLoader(true);
    let data = {
      email: email,
      password: pass,
    };
    let response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    let result = await response.json();
    if (result.success) {
      localStorage.setItem("token", result.data.token);
      let student = await fetch(`${import.meta.env.VITE_BASE_URL}/api/student/get-student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isAdmin: result.data.user.isAdmin,
          token: result.data.token})
      });
      let studentResult = await student.json();
      console.log(studentResult);
      if (studentResult.success) {
        localStorage.setItem("student", JSON.stringify(studentResult.student));
        navigate("/student-dashboard");
      } else {
        console.log(studentResult.errors)
      }
    } else {
      // alert(result.errors[0].msg);
      toast.error(
        result.errors[0].msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
    setLoader(false);
  };
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loader, setLoader] = useState(false)
  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changePass = (event) => {
    setPass(event.target.value);
  };
  const iemail = {
    name: "email",
    type: "email",
    placeholder: "student@email.com",
    req: true,
    onChange: changeEmail,
  };
  const password = {
    name: "password",
    type: "password",
    placeholder: "••••••••",
    req: true,
    onChange: changePass,
  };
  return (
    <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-neutral-800 border-neutral-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
          Sign in to your account - Student
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={login}>
          <Input field={iemail} />
          <Input field={password} />
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border rounded focus:ring-3 bg-neutral-700 border-neutral-600 focus:ring-blue-600 ring-offset-neutral-800"
                  required=""
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-neutral-300">
                  Remember me
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            {loader ? (
              <>
                <Loader /> Verifying...
              </>
            ) : (
              <span>Sign in</span>
            )}
          </button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <p className="text-sm font-light text-neutral-400">
            Don’t have an account yet?{" "}
            <Link
              to="/auth/request"
              className="font-medium hover:underline text-blue-500"
            >
              Request an account.
            </Link>
          </p>
        </form>
      </div>
      <div className="animate-pulse hover:animate-none flex items-center justify-center w-full xl:w-0 xl:absolute right-52 top-60">
        <Card/>
      </div>
    </div>
  );
}