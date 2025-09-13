const AlumniDir = ({ name, graduationYear, course, jobTitle, companyName }) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex items-start justify-between">
      <div className="flex gap-4">
        <img
          src="../../profile.jpg"
          alt="Nidhi Kumari"
          className="w-16 h-16 rounded-full object-cover shadow"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">
            {graduationYear} •{course}
          </p>
          <p className="text-sm text-gray-500 mt-1">Post: {jobTitle}</p>
          <p className="text-sm text-gray-500">Company: {companyName}</p>
        </div>
      </div>

      <button className="self-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors">
        Connect
      </button>
    </div>
  );
};

export default AlumniDir;
