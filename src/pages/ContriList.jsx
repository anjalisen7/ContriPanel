import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ContriListComponent() {
  const [committees, setCommittees] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const name = JSON.parse(storedUser);
        if (name.username) {
          setUsername(name.username);

          
          fetch("http://localhost/react-projects/ContriApp/Server/api/getContriList.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: name.username }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === "success") {
                setCommittees(data.data);
              }
            })
            .catch(console.error);
        }
      } catch (err) {
        console.error("Error parsing localStorage user:", err);
      }
    }
  }, []);

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <nav className="col-md-3 col-lg-2 bg-success text-white p-3 d-flex flex-column justify-content-between">
          <div>
            <h5 className="text-center mb-4">Welcome, {username}</h5>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/contributor-dashboard")}>
              Dashboard
            </button>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/contributor-dashboard/AddContri")}>
              Add Contribution
            </button>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/contributor-dashboard/ContriList")}>
              My Contributions
            </button>
          </div>
          <button className="btn btn-danger mt-4 w-100" onClick={() => navigate("/")}>
            Logout
          </button>
        </nav>

        {/* Main content */}
        <main className="col-md-9 col-lg-10 p-4">
          <h4>{username}, Your Contributions</h4>
          <table className="table table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th>Sno</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Committee Name</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {committees.length > 0 ? (
                committees.map((contri, i) => (
                  <tr key={contri.id}>
                    <td>{i + 1}</td>
                    <td>{contri.Name}</td>
                    <td>{contri.ContiAmount}</td>
                    <td>{contri.ComiteeName}</td>
                    <td>{contri.Date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Contributions Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
