import React, { useEffect, useState, useRef } from "react";
import { Modal as BootstrapModal } from "bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import Table from "../Components/Table";
import Sidebar from "../Components/Sidebar";
import Modal from "../Components/Modal"; 

const API = process.env.REACT_APP_API_BASE;

export default function AddUserComponent() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", password: "", role: "Contributor" });
  const [showAddUser, setShowAddUser] = useState(false);
  const [showCreateCommittee, setShowCreateCommittee] = useState(false);

  const [committee, setCommittee] = useState({
    name: "",
    startDate: "",
    endDate: "",
    totalAmount: "",
    drawType: "1st & 15th",
    members: [],
  });

  const committeeModalRef = useRef(null);
  const bsCommitteeModal = useRef(null);

 useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const parsed = JSON.parse(storedUser);
    if (parsed.username) setUsername(parsed.username);
    if (parsed.role) setRole(parsed.role);
  }

  if (committeeModalRef.current) {
    bsCommitteeModal.current = new BootstrapModal(committeeModalRef.current, { backdrop: "static" }); // ✅ Corrected
  }

  fetchUsers();
}, []);


  const fetchUsers = () => {
    fetch(`${API}/getUser.php`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setUsers(data.data);
        }
      })
      .catch(console.error);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/addUser.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const text = await res.text();
      const data = JSON.parse(text);

      if (data.status === "success") {
        Swal.fire("Success", "User added successfully!", "success");
        setNewUser({ name: "", password: "", role: "Contributor" });
        setShowAddUser(false);
        fetchUsers();
      } else {
        throw new Error(data.message || "Unknown error");
      }
    } catch (err) {
      console.error("AddUser error:", err);
      Swal.fire("Error", err.message, "error");
    }
  };

 const handleCreateCommittee = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${API}/createcommittee.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(committee),
    });

    const text = await res.text();
    const data = JSON.parse(text);

    if (data.status === "success") {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Committee created successfully!",
      });
      setCommittee({
        name: "",
        startDate: "",
        endDate: "",
        totalAmount: "",
        drawType: "1st & 15th",
        members: [],
      });
      setShowCreateCommittee(false); 
    } else {
      throw new Error(data.message || "Unknown error");
    }
  } catch (err) {
    console.error("CreateCommittee error:", err);
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Failed to create committee:\n" + err.message,
    });
  }
};

  const userColumns = [
    { label: "Name", key: "Name" },
    { label: "Role", key: "Role" },
  ];

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        <Sidebar username={username} role={role} />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-4 py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5>All Users</h5>
            <div className="d-flex gap-2">
              <button className="btn btn-success" onClick={() => setShowAddUser(true)}>
                + Add New User
              </button>
               <button className="btn btn-primary" onClick={() => setShowCreateCommittee(true)}>
                + Create Committee
              </button>
            </div>
          </div>

          <Table
            columns={userColumns}
            data={users}
            actions={(row) => (
              <button className="btn btn-sm btn-secondary" onClick={() => console.log("Edit", row)}>
                Edit
              </button>
            )}
          />
        </main>
      </div>

      <Modal
        show={showAddUser}
        onClose={() => setShowAddUser(false)}
        onSubmit={handleAddUser}
        title="Add New User"
        submitText="Add"
        cancelText="Cancel"
        data={newUser}
        setData={setNewUser}
        fields={[
          { label: "Name", name: "name", type: "text", required: true },
          { label: "Password", name: "password", type: "password", required: true },
          { label: "Role", name: "role", type: "select", options: ["Admin", "Contributor"] },
        ]}
      />

     <Modal
  show={showCreateCommittee}
  onClose={() => setShowCreateCommittee(false)}
  onSubmit={handleCreateCommittee}
  title="Create Committee"
  submitText="Create"
  cancelText="Cancel"
  data={committee}
  setData={setCommittee}
  fields={[
    { label: "Committee Name", name: "name", type: "text", required: true },
    { label: "Start Date", name: "startDate", type: "date", required: true },
    { label: "End Date", name: "endDate", type: "date", required: true },
    { label: "Total Amount", name: "totalAmount", type: "number", required: true },
    {
      label: "Draw Type",
      name: "drawType",
      type: "select",
      options: ["1st & 15th", "1st only", "15th only"],
      required: true,
    },
    {
      label: "Members Assigned",
      name: "members",
      type: "checkbox-list",
      options: users
        .filter((u) => u.Role === "Contributor")
        .map((u) => ({ value: u.Name, label: u.Name })),
    },
  ]}
/>
    </div>
  );
}
