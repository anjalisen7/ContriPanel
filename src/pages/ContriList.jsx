import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../Components/Table";
  const API = process.env.REACT_APP_API_BASE;



export default function ContriListComponent() {

  const contributionColumns = [
  { label: "Name", key: "Name" },
  { label: "Amount", key: "ContiAmount" },
  { label: "Committee Name", key: "ComiteeName" },
  { label: "Date", key: "Date" },
];
  
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

          
          fetch(`${API}/getContriList.php`, {
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

          <Table
            columns={contributionColumns}
            data={committees}
            headerClass="table-success"
          />
          
        </main>
      </div>
    </div>
  );
}
