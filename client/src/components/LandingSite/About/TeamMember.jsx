import PropTypes from "prop-types";
TeamCard.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
  }).isRequired,
};
function TeamCard({ member, profile }) {
  return (
    <div className="rounded-lg shadow-lg p-5 bg-neutral-800 w-[20%] md:h-96">
      <div className="relative overflow-hidden rounded-full w-40 h-40 mx-auto my-4 hover:scale-150 transition-all cursor-pointer">
        <img
          className="absolute inset-0 w-full h-full object-cover object-center rounded-full "
          src={member.image}
          alt={member.name}
        />
      </div>
      <div className="text-center my-12">
        <h3 className="text-xl font-medium text-white">{member.name}</h3>
        <div className="text-neutral-400 text-sm mb-4">{member.designation}</div>
        <a className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer" href={`${profile}`}>
          View Profile
        </a>
      </div>
    </div>
  );
}
export { TeamCard };