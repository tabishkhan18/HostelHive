import { TeamCard } from "./TeamMember";
function About() {
  const tabish = {
    name: "Tabish Khan",
    designation: "Frontend, Backend & Database",
    image: "/tabish.jpg",
    profile: "https://www.linkedin.com/in/tabish-khan-61a14124a/",
  };
  const subhan = {
    name: "Mohd Subhan Khan",
    designation: "Frontend and Backend",
    image: "/subhan.jpeg",
    profile: "https://www.linkedin.com/in/mohd-subhan-khan-678118264/",
  };
  const adnan = {
    name: "Adnan Ali",
    designation: "Backend and Database",
    image: "/AdnanAli.jpeg",
    profile: "https://www.linkedin.com/in/adnan-ali-8b130b285/",
  };
  const farhan = {
    name: "Farhan Khan",
    designation: "Frontend and Backend",
    image: "/farhan.jpeg",
    profile: "https://www.linkedin.com/in/farhan-khan-5b17b1315/",
  };



  return (
    <>
      <h1 className="font-bold text-white text-center text-5xl py-20">
        Meet Our <span className="text-yellow-500 underline underline-offset-8">FAST</span> Team!
      </h1>
      <div className="py-16 sm:py-25 flex flex-wrap justify-evenly align-center ">
        <TeamCard member={tabish} profile={tabish.profile} />
        <TeamCard member={subhan} profile={subhan.profile} />
        <TeamCard member={adnan} profile={adnan.profile} />
        <TeamCard member={farhan} profile={farhan.profile} />
      </div>
    </>
  );
}
export { About };