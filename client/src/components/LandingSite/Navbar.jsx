import { useState } from "react";
import { Link } from "react-router-dom";
import { RiGraduationCapFill } from "react-icons/ri";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuStyles = `flex-col absolute top-0 left-0 w-full h-full bg-neutral px-10 bg-black py-40 text-5xl font-bold`;
  return (
    <nav className="fixed top-0 w-full flex align-center p-2 justify-between backdrop-blur-2xl text-white px-10">
      <Link to="/" className="flex z-10 md:py-3 font-bold text-4xl">
        <RiGraduationCapFill size={40} color='white' />&nbsp;
        <h1>Hostel<span className="text-yellow-500">Hive</span></h1>
      </Link>
      <div
        className={`flex items-center ${menuOpen ? mobileMenuStyles : "hidden"
          } gap-10 md:flex`}
      >
        <Link
          to="/auth/request"
          className="md:py-3 font-bold text-md md:hover:text-blue-500 hover:underline hover:underline-offset-1 transition-all ease-linear"
        >
          Request
        </Link>
        <Link
          to="/auth/admin-login"
          className="md:py-3 font-bold text-md md:hover:text-blue-500 hover:underline hover:underline-offset-1 transition-all ease-linear"
        >
          AdminLogin
        </Link>
        <Link
          to="/auth/login"
          className={`md:bg-blue-500 md:hover:bg-blue-700 transition md:text-white font-semibold md:text-lg md:py-3 md:px-8 md:rounded ${menuOpen ? "text-blue-500" : "" }`}
        >
          Login
        </Link>
      </div>
      <div
        className="md:hidden z-10 py-1"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
    </nav>
  );
}
export { Navbar };
