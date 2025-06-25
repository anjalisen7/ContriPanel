import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import Table from '../Components/Table';
import Sidebar from "../Components/Sidebar";



  const API = process.env.REACT_APP_API_BASE;





export default function CommitteeListComponent() {


  //  const [username, setUsername] = useState("");
                const [role, setRole] = useState("");
  
                      useEffect(() => {
                        const storedUser = localStorage.getItem("user");
                        if (storedUser) {
                          const parsed = JSON.parse(storedUser);
                          if (parsed.username) setUsername(parsed.username);
                          if (parsed.role) setRole(parsed.role);
                        }
                      }, []);

   const committeeColumns = [
  { label: "Committee Name", key: "ComitteeName" },
  { label: "Start", key: "Start_date" },
  { label: "End", key: "End_date" },
  { label: "Amount", key: "Total_Amount" },
  { label: "Draw Date", key: "Draw_Date" },
  {
    label: "Members",
    key: "Members",
    render: (value) =>
      Array.isArray(value)
        ? value.join(", ")
        : value || "No Members",
  },
];


  const [committees, setCommittees] = useState([]);
  const [username, setUsername] = useState("");
  // const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const name = JSON.parse(storedUser);
        if (name.username) {
          setUsername(name.username);

          fetch(`${API}/getCommitees.php`, {
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
      <Sidebar  username={username} role={role}/>
        {/* <nav className="col-md-3 col-lg-2 bg-primary text-white p-3 d-flex flex-column justify-content-between">
          <div>
            <h5 className="text-center mb-4">Welcome, {username}</h5>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/dashboard")}>Dashboard</button>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/dashboard/add-user")}>Add / Modify User</button>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/dashboard/committees")}>Committee List</button>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/dashboard/contributions")}>View Collection</button>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/dashboard/winner")}>Pick Winner (30th)</button>
          </div>
          <button className="btn btn-danger mt-4" onClick={() => navigate("/")}>Logout</button>
          </nav> */}
        <main className="col-md-9 col-lg-10 p-4">
          <h4>{username}, Your Committees</h4>
              <Table
              columns={committeeColumns}
              data={committees}
            />
        </main>
      </div>
    </div>
  );
}
