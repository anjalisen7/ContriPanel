import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import Input from '../Components/Input';
import Button from '../Components/Button';
import Sidebar from '../Components/Sidebar';


            export default function AddContri() {


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
              const [user] = useState(() => JSON.parse(localStorage.getItem("user")));
              const userName = user?.username || "Contributor";

              const API = process.env.REACT_APP_API_BASE;

              const [committees, setCommittees] = useState([]);
              const [selectedCommittee, setSelectedCommittee] = useState("");
              const [amount, setAmount] = useState("");
              const [date, setDate] = useState("");
              const [loading, setLoading] = useState(false);

              useEffect(() => {
                if (user?.username) {
                  fetch(`${API}/getContriComitees.php`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: user.username }),
                  })
                    .then(res => res.json())
                    .then(data => {
                      if (data.status === "success") {
                        setCommittees(data.committees);
                      }
                    });
                }
              }, [user?.username,API]); 

              const handleSubmit = async (e) => {
                e.preventDefault();

                if (!selectedCommittee || !amount || !date) {
                  Swal.fire("Oops!", "Please fill all fields.", "warning");
                  return;
                }

                setLoading(true);

                const payload = {
                  username: userName,
                  committee: selectedCommittee,
                  amount,
                  date,
                };

                try {
                  const res = await fetch(`${API}/addContri.php`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });

                const data = await res.json();

                if (data.status === "success") {
                  Swal.fire("Success", "Contribution added successfully!", "success");
                  setSelectedCommittee("");
                  setAmount("");
                  setDate("");
                } else {
                  Swal.fire("Error", data.message || "Failed to add contribution", "error");
                }
              } catch (err) {
                console.error(err);
                Swal.fire("Error", "Something went wrong!", "error");
              } finally {
                setLoading(false);
              }
            };

                  return (
                    <div className="container-fluid">
                      <div className="row min-vh-100">
                               <Sidebar username={username} role={role} /> 
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
                          <h2>Add Contribution</h2>
                          <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                            <Input  type="text"
                            className="form-control bg-red"
                            placeholder="Member Name"
                            label="Member Name"
                            value={userName}
                            disabled={true}
                            />
                            </div>

                            <div className="mb-3">
                              <Input
                                  label="Committee"
                                  type="select"
                                  id="committeeName"
                                  value={selectedCommittee}
                                  onChange={(e) => setSelectedCommittee(e.target.value)}
                                  options={committees}
                                />
                            </div>

                            <div className="mb-3">
                  
                              <Input
                                label="Amount"
                                type="number"
                                className="form-control"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                              />
                            </div>

                            <div className="mb-3">
                              <Input
                                type="date"
                                label="Date"
                                className="form-control"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                              />
                            </div>

                            <Button
                              type="submit"
                              className="btn btn-primary w-100"
                              disabled={loading}
                              >
                              {loading ? "Submitting..." : "Submit"}
                            </Button>
                          </form>
                        </main>
                      </div>
                    </div>
                  );
                }
