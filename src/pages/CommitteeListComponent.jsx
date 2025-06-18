import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CommitteeListComponent() {
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

          fetch("http://localhost/react-projects/ContriApp/Server/api/getCommitees.php", {
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
        <nav className="col-md-3 col-lg-2 bg-primary text-white p-3 d-flex flex-column justify-content-between">
          <div>
            <h5 className="text-center mb-4">Welcome, {username}</h5>
           <h4 className="text-center mb-4">Admin Panel</h4>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/dashboard")}>Dashboard</button>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/dashboard/add-user")}>Add / Modify User</button>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/dashboard/committees")}>Committee List</button>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/dashboard/contributions")}>View Contributions</button>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/dashboard/winner")}>Pick Winner (30th)</button>
          </div>
          <button className="btn btn-danger mt-4" onClick={() => navigate("/")}>Logout</button>
          </nav>

        {/* Main content */}
        <main className="col-md-9 col-lg-10 p-4">
          <h4>{username}, Your Committees</h4>
          <table className="table table-bordered mt-3">
            <thead className="table-primary">
              <tr>
                <th>Sno</th>
                <th>Committee Name</th>
                <th>Start</th>
                <th>End</th>
                <th>Amount</th>
                <th>Draw Date</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {committees.length > 0 ? (
                committees.map((c, i) => (
                  <tr key={c.id}>
                    <td>{i + 1}</td>
                    <td>{c.ComitteeName}</td>
                    <td>{c.Start_date}</td>
                    <td>{c.End_date}</td>
                    <td>{c.Total_Amount}</td>
                    <td>{c.Draw_Date}</td>
                    <td>
                      {Array.isArray(c.Members)
                        ? c.Members.join(", ")
                        : c.Members || "No Members"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No Committees Found
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
