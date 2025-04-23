import { RiGraduationCapFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <main className="flex flex-col lg:flex-row justify-center align-center bg-[url(/bg2.jpg)] bg-cover text-white text-center pt-20 pb-14 px-12">
      <div className="md:pt-[8%] mx-10">
        <h1 className="flex items-center w-full justify-center font-bold text-6xl">
          <RiGraduationCapFill size={80} color='white' />
            &nbsp;Hostel<span className="text-yellow-500">Hive</span>
        </h1>
        <p className="py-10 text-2xl">
          A lively and efficiently managed place where many people live together, like a community
        </p>
        <div className="py-20">
          <Link
            to="/auth/login"
            className="bg-blue-500 py-3 px-40 hover:bg-blue-700 transition rounded text-2xl"
          >
            Login
          </Link>
          <p className="mt-6 mb-3">OR</p>
          <Link
            to="/auth/request"
            className="text-xl hover:underline hover:underline-offset-1 transition-all ease-linear hover:text-blue-500"
          >
            Request Registration
          </Link>
        </div>
      </div>
    </main>
  );
}
export { HeroSection };
