import React, { useEffect, useState, useRef } from "react";

// import { useNavigate } from "react-router-dom";
import { Modal } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import Table from "../Components/Table"; 
import Sidebar from "../Components/Sidebar"; 

  const API = process.env.REACT_APP_API_BASE;
  

export default function AddUserComponent() {

  const [username, setUsername] = useState("");
              const [role, setRole] = useState("");

                    useEffect(() => {
                      const storedUser = localStorage.getItem("user");
                      if (storedUser) {
                        const parsed = JSON.parse(storedUser);
                        if (parsed.username) setUsername(parsed.username);
                        if (parsed.role) setRole(parsed.role);
                      }
                    }, []);
  
                            const [users, setUsers] = useState([]);

                            const [newUser, setNewUser] = useState({ name: "", password: "", role: "Contributor" });

                            // FOR TABLE
                            const userColumns = [
                            { label: "Name", key: "Name" },
                            { label: "Role", key: "Role" },
                          ];


                          //For Comitee
                            const [committee, setCommittee] = useState({
                              name: "",
                              startDate: "",
                              endDate: "",
                              totalAmount: "",
                              drawType: "1st & 15th",
                              members: [],
                            });

                              // const navigate = useNavigate();

                              const modalRef = useRef(null);
                              const bsModal = useRef(null);
                              const committeeModalRef = useRef(null);
                              const bsCommitteeModal = useRef(null);

                              useEffect(() => {
                                if (modalRef.current) bsModal.current = new Modal(modalRef.current, { backdrop: "static" });
                                if (committeeModalRef.current) bsCommitteeModal.current = new Modal(committeeModalRef.current, { backdrop: "static" });
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

                              const openModal = () => {
                                if (bsModal.current) bsModal.current.show();
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
                                    alert("User added successfully!");
                                    setNewUser({ name: "", password: "", role: "Contributor" });
                                    if (bsModal.current) bsModal.current.hide();
                                    fetchUsers();
                                  } else {
                                    throw new Error(data.message || "Unknown error");
                                  }
                                } catch (err) {
                                  console.error("AddUser error:", err);
                                  alert("Failed to add user:\n" + err.message);
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
                  bsCommitteeModal.current.hide();
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

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
      <Sidebar username={username} role={role} />

        <main className="col-md-9 ms-sm-auto col-lg-10 px-4 py-4">

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5>All Users</h5>
            <div className="d-flex gap-2">
              <button className="btn btn-success" onClick={openModal}>+ Add New User</button>
              <button className="btn btn-primary" onClick={() => bsCommitteeModal.current.show()}>+ Create Committee</button>
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

   {/* user model */}
      <div className="modal fade" ref={modalRef} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleAddUser}>
            <div className="modal-header">
              <h5 className="modal-title">Add New User</h5>
              <button type="button" className="btn-close" onClick={() => bsModal.current.hide()} />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option>Admin</option>
                  <option>Contributor</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => bsModal.current.hide()}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add User</button>
            </div>
          </form>
        </div>
      </div>

      {/* Committee Modal */}
      <div className="modal fade" ref={committeeModalRef} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleCreateCommittee}>
            <div className="modal-header">
              <h5 className="modal-title">Create Committee</h5>
              <button type="button" className="btn-close" onClick={() => bsCommitteeModal.current.hide()} />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Committee Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={committee.name}
                  onChange={(e) => setCommittee({ ...committee, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={committee.startDate}
                  onChange={(e) => setCommittee({ ...committee, startDate: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={committee.endDate}
                  onChange={(e) => setCommittee({ ...committee, endDate: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Total Amount</label>
                <input
                  type="number"
                  className="form-control"
                  value={committee.totalAmount}
                  onChange={(e) => setCommittee({ ...committee, totalAmount: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Draw Type</label>
                <select
                  className="form-select"
                  value={committee.drawType}
                  onChange={(e) => setCommittee({ ...committee, drawType: e.target.value })}
                >
                  <option value="1st & 15th">1st & 15th of the Month</option>
                  <option value="1st only">1st Only</option>
                  <option value="15th only">15th Only</option>
                </select>
              </div>
                    <div className="mb-3">
  <label className="form-label">Members Assigned</label>

  <div className="border rounded p-2" style={{ maxHeight: "150px", overflowY: "auto" }}>
    {users
      .filter((u) => u.Role === "Contributor")
      .map((u) => (
        <div className="form-check" key={u.Sno}>
          <input
            className="form-check-input"
            type="checkbox"
            id={`member-${u.Sno}`}
            value={u.Name}
            checked={committee.members.includes(u.Name)}
            onChange={(e) => {
              const isChecked = e.target.checked;
              const memberName = e.target.value;

            
              const updatedMembers = isChecked
                ? [...committee.members, memberName]
                : committee.members.filter((name) => name !== memberName);

              setCommittee((prev) => ({
                ...prev,
                members: updatedMembers,
              }));
            }}
          />
          <label className="form-check-label" htmlFor={`member-${u.Sno}`}>
            {u.Name}
          </label>
        </div>
      ))}
  </div>

  {/* Display selected members as badges */}
  <div className="mt-2">
    {committee.members.length > 0 ? (
      <div className="d-flex flex-wrap gap-2">
        {committee.members.map((member, index) => (
          <span key={index} className="badge bg-success">
            {member}
          </span>
        ))}
      </div>
    ) : (
      <small className="text-muted">No members selected</small>
    )}
  </div>
</div>


            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => bsCommitteeModal.current.hide()}>Cancel</button>
              <button type="submit" className="btn btn-primary">Create Committee</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
