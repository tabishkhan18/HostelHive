import { Outlet } from "react-router-dom";
import { RiGraduationCapFill } from "react-icons/ri";
export default function AuthPage() {
  return (
    <>
      <section className="py-20">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-white"
          >
            <RiGraduationCapFill size={40} color='white' />
            &nbsp;
            Hostel<span className="text-yellow-500">Hive</span>
          </a>
          <Outlet />
        </div>
      </section>
    </>
  );
}