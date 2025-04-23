import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  const getComplaints = async () => {
    setLoading(true);
    const hostel = JSON.parse(localStorage.getItem("hostel"));
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/complaint/hostel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostel: hostel._id }),
    });
    const data = await response.json();
    if (data.success) {
      //Sort complaints so that pending come first
      const sorted = data.complaints.sort((a, b) => {
        if (a.status === b.status) return 0;
        return a.status === "pending" ? -1 : 1;
      });
      setComplaints(sorted);
    } else {
      toast.error("Failed to fetch complaints", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
    setLoading(false);
  };

  const resolveComplaint = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/complaint/resolve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    if (data.success) {
      toast.success("Complaint resolved successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      // Update the status of the complaint and sort the list:
      setComplaints((prevComplaints) =>
        prevComplaints
          .map((complaint) =>
            complaint._id === id ? { ...complaint, status: "solved" } : complaint
          )
          .sort((a, b) => {
            if (a.status === b.status) return 0;
            return a.status === "pending" ? -1 : 1;
          })
      );
    } else {
      toast.error("Failed to resolve complaint", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  // New deleteComplaint handler
  const deleteComplaint = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/complaint/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    if (data.success) {
      toast.success("Complaint deleted successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      setComplaints((prevComplaints) => prevComplaints.filter((complaint) => complaint._id !== id));
    } else {
      toast.error("Failed to delete complaint", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    getComplaints();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center">
      <h1 className="text-white font-bold text-5xl">Complaints</h1>
      <div className="bg-neutral-950 px-10 py-5 rounded-xl shadow-xl sm:w-[50%] sm:min-w-[450px] w-full mt-5 max-h-96 overflow-auto">
        <span className="text-white font-bold text-xl">All Complaints</span>
        <ul role="list" className="divide-y divide-neutral-700 text-white">
          {loading ? (
            <p>Loading...</p>
          ) : complaints.length === 0 ? (
            "No complaints found"
          ) : (
            complaints.map((complaint) => (
              <li
                className="py-3 px-5 rounded sm:py-4 hover:bg-neutral-800 hover:shadow-xl transition-all cursor-pointer"
                key={complaint._id}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-medium truncate text-neutral-400">
                      {complaint.title}
                    </p>
                    <p className="text-xl text-white">
                      {complaint.description}
                    </p>
                    <p className="text-sm truncate text-neutral-400">
                      Status: {complaint.status}
                    </p>
                  </div>
                  {complaint.status === "pending" ? (
                    <button
                      className="hover:underline hover:text-green-600 hover:scale-125 transition-all"
                      onClick={() => resolveComplaint(complaint._id)}
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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    </button>
                  ) : (
                    <button
                      className="hover:underline hover:text-red-500 hover:scale-125 transition-all"
                      onClick={() => deleteComplaint(complaint._id)}
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    </button>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Complaints;